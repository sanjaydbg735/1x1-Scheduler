const pool = require('../config/db');

async function getMentors(req, res) {
    try {
        const [mentors] = await pool.execute('SELECT * FROM mentors');
        res.status(200).json(mentors);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve mentors', error });
    }
}

async function createMentor(req, res) {
    const { name, email, area_of_expertise } = req.body;
    try {
        await pool.execute('INSERT INTO mentors (name, email, area_of_expertise) VALUES (?, ?, ?)', [name, email, area_of_expertise]);
        res.status(201).json({ message: 'Mentor created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create mentor', error });
    }
}

async function setAvailability(req, res) {
    const { mentorId, available_from, available_to } = req.body;

    // Check if all required parameters are provided
    // console.log(mentorId+" "+available_from+" "+available_to);

    if (mentorId === undefined || available_from === undefined || available_to === undefined) {
        return res.status(400).json({ message: 'Missing required parameters' });
    }

    try {
        // Optional: Validate and format the date inputs if necessary
        const formattedAvailableFrom = new Date(Date.parse(available_from));
        const formattedAvailableTo = new Date(Date.parse(available_to));

        if (isNaN(formattedAvailableFrom.getTime()) || isNaN(formattedAvailableTo.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        // Execute SQL query with validated parameters
        await pool.execute(
            'INSERT INTO mentor_availability (mentor_id, available_from, available_to) VALUES (?, ?, ?)',
            [mentorId, formattedAvailableFrom, formattedAvailableTo]
        );
        res.status(201).json({ message: 'Mentor availability set successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to set mentor availability', error });
    }
}

module.exports = { getMentors, createMentor, setAvailability };
