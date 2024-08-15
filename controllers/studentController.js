const pool = require('../config/db');

async function getStudents(req, res) {
    // console.log('student get requested\n');
    try {
        const [students] = await pool.execute('SELECT * FROM students');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve students', error });
    }
}

async function createStudent(req, res) {
    const { name, email, area_of_interest } = req.body;
    try {
        await pool.execute('INSERT INTO students (name, email, area_of_interest) VALUES (?, ?, ?)', [name, email, area_of_interest]);
        res.status(201).json({ message: 'Student created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create student', error });
    }
}

module.exports = { getStudents, createStudent };
