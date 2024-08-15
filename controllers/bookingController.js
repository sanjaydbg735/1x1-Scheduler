const pool = require('../config/db');

// Dummy payment method
function processPayment(success) {
    return success;
}
async function bookMentor(req, res) {
    const { studentId, date, duration, preferredMentor } = req.body;
    const connection = await pool.getConnection();
    // console.log(studentId+" "+date+" "+duration+" "+preferredMentor);
    // Base cost for booking
    const baseCost = duration === 30 ? 2000 : duration === 45 ? 3000 : 4000;
    const additionalCharge = preferredMentor ? 1500 : 0;
    const totalCost = baseCost + additionalCharge;

    // Convert date to MySQL-compatible format
    const bookingDate = new Date(date);
    const formattedDate = bookingDate.toISOString().slice(0, 19).replace('T', ' ');

    try {
        await connection.beginTransaction();

        let mentorIdToUse = preferredMentor;
        if (!preferredMentor) {
            // Find student's area of interest
            const [student] = await connection.execute(`
                SELECT area_of_interest FROM students WHERE id = ?
            `, [studentId]);

            if (student.length === 0) {
                await connection.rollback();
                return res.status(400).json({ message: 'Student not found' });
            }

            const studentAreaOfInterest = student[0].area_of_interest;

            console.log("area = "+studentAreaOfInterest);

            // Find available mentors with the same area of interest
            const [availableMentors] = await connection.execute(`
                SELECT ma.mentor_id FROM mentor_availability ma
                JOIN mentors m ON ma.mentor_id = m.id
                WHERE m.area_of_expertise = ?
                AND ma.available_from <= ?
                AND ma.available_to >= DATE_ADD(?, INTERVAL ? MINUTE)
                ORDER BY ma.available_from
                LIMIT 1
            `, [studentAreaOfInterest, date, date, duration]);

            if (availableMentors.length === 0) {
                await connection.rollback();
                return res.status(400).json({ message: 'No available mentors with the same area of interest' });
            }

            mentorIdToUse = availableMentors[0].mentor_id;
        }

        // Select mentor availability with a lock for the chosen mentor
        const [availability] = await connection.execute(`
            SELECT * FROM mentor_availability 
            WHERE mentor_id = ? 
            AND available_from <= ?
            AND available_to >= DATE_ADD(?, INTERVAL ? MINUTE) 
            FOR UPDATE
        `, [mentorIdToUse, formattedDate, formattedDate, duration]);

        if (availability.length === 0) {
            await connection.rollback();
            return res.status(400).json({ message: 'Mentor not available' });
        }

        // Process the payment (dummy method)
        const paymentSuccess = processPayment(true);

        const bookingStart = new Date(formattedDate);
        const bookingEnd = new Date(bookingStart.getTime() + duration * 60000);

        // Insert the booking details
        const [bookingResult] = await connection.execute(`
            INSERT INTO bookings (student_id, mentor_id, booking_start, booking_end, status) 
            VALUES (?, ?, ?, ?, 'confirmed')
        `, [studentId, mentorIdToUse, bookingStart, bookingEnd]);

        const bookingId = bookingResult.insertId;

        // Store payment details
        await connection.execute(`
            INSERT INTO payments (booking_id, student_id, mentor_id, amount, status) 
            VALUES (?, ?, ?, ?, ?)
        `, [bookingId, studentId, mentorIdToUse, totalCost, paymentSuccess ? 'success' : 'failed']);

        if (!paymentSuccess) {
            await connection.rollback();
            return res.status(400).json({ message: 'Payment failed' });
        }

        // Update mentor's availability
        await connection.execute(`
            UPDATE mentor_availability 
            SET available_from = DATE_ADD(available_from, INTERVAL ? MINUTE)
            WHERE mentor_id = ? AND available_from <= ?
            AND available_to >= DATE_ADD(?, INTERVAL ? MINUTE)
        `, [duration, mentorIdToUse, formattedDate, formattedDate, duration]);

        await connection.commit();
        res.status(200).json({ message: 'Booking confirmed', totalCost });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: 'Booking failed', error });
    } finally {
        connection.release();
    }
}

module.exports = { bookMentor };
