import React, { useState } from "react";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import CityForm from "./cityForm";

const City = () => {
  const [showForm, setShowForm] = useState(false); // State to manage whether to show the form or not

  const [bookingsData, setBookingsData] = useState([
        { bookingId: 1, cityName: "New York", customerName: "John Doe" },
    { bookingId: 2, cityName: "London", customerName: "Jane Smith" },
    { bookingId: 3, cityName: "Paris", customerName: "Michael Johnson" },
    { bookingId: 4, cityName: "Tokyo", customerName: "Emily Brown" },
    { bookingId: 5, cityName: "Sydney", customerName: "David Wilson" },
    { bookingId: 6, cityName: "Berlin", customerName: "Sarah Davis" },
    { bookingId: 7, cityName: "Rome", customerName: "Alex Harris" },
    { bookingId: 8, cityName: "Moscow", customerName: "Sophia Martinez" },
    { bookingId: 9, cityName: "Dubai", customerName: "Matthew Anderson" },
    { bookingId: 10, cityName: "Beijing", customerName: "Olivia Taylor" },
  ]);

  // Mapping function to render booking cards
  const renderBookingCards = () => {
    return bookingsData.map((booking) => (
      <div key={booking.bookingId} className="booking-card">
        <h3>Booking ID: {booking.bookingId}</h3>
        <p>City: {booking.cityName}</p>
        <p>Customer: {booking.customerName}</p>
      </div>
    ));
  };

  // Function to toggle the visibility of the form
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };
  
 

  return (
    <div>
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <div className="container">
          <FirstNavbar />
          <button className="Add_city" onClick={toggleFormVisibility}>
            Add City
          </button>
          {/* Conditional rendering of the form */}
          {showForm && <CityForm />}
          <div className="booking-cards-container">{renderBookingCards()}</div>
        </div>
      </div>
    </div>
  );
};

export default City;
