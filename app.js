require('dotenv').config();

const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const getPaymentDetails = require('./routes/paymentRoutes');

const app = express();
app.use(express.json());

app.use('/students', studentRoutes);
app.use('/mentors', mentorRoutes);
app.use('/bookings', bookingRoutes);
app.use('/payments', getPaymentDetails);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
