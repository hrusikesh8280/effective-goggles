import React from "react";

import { Routes, Route } from "react-router-dom";
import BookingApp from "./BookingApp";
import AllBookingsPage from "./AllBoookingPages";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BookingApp />} />
      <Route path="/all-bookings" element={<AllBookingsPage />} />
      
    </Routes>
  );
};

export default AllRoutes;
