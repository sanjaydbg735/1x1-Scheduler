const pool = require('../config/db');

async function getPaymentDetails(req, res) {
    // console.log('payment get requested\n');
    try {
        const [students] = await pool.execute('SELECT * FROM payments');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve payments', error });
    }
}

module.exports = { getPaymentDetails};