const express = require("express");
const router = express.Router();
const {
  addBooking,
  getAllBookings,
  getCarOptions,
} = require("../controller/bookingController");

router.post("/car", getCarOptions);

router.post("/book", addBooking);

router.get("/", getAllBookings);

module.exports = router;
