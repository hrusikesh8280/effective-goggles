require('dotenv').config();
const express = require('express');
const cors = require("cors")
const connectDB = require('./connection/db');
const bookingRoutes= require('./routes/BookingRoutes')


connectDB()

const app = express();
app.use(cors())
app.use(express.json());


// app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/bookings',bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
