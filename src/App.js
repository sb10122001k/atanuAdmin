import { useState } from "react";
import "./custom.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/dashboard/Main";
import Contactlist from "./pages/contact/Contactlist";
import TeamList from "./pages/about/TeamList";
import AddTeam from "./pages/about/AddTeam";
import Login from "./pages/auth/Login";
import ProductBlogs from "./pages/Blogs/ProductBlogs";
import AddBlog from "./pages/Blogs/AddBlog";
import BlogList from "./pages/Blogs/BlogList";
import ProductCareer from "./pages/Career/ProductCareer";
import AddCareer from "./pages/Career/AddCaree";
import CareerList from "./pages/Career/CareerList";

import JobApplyList from "./pages/Career/JobApplyList";
import SubscribeList from "./pages/subscribe/SubscribeList";
import Booking from "./pages/Booking/booking";
import City from "./pages/City/city";
import University from "./pages/University/university";
import Property from "./pages/Property/property";
import BookingDetails from "./pages/Booking/bookingDetails";
import OngoingBookingList from "./pages/Booking/ongoingBookingList";
import CurrentBookingList from "./pages/Booking/currentBooking";
import PastBookingList from "./pages/Booking/pastBookingDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>      
      <Route path="/" element={<Login />} />  
        <Route path="/dashboard" element={<Main />} />
        <Route path="/contact-list" element={<Contactlist />} />
        <Route path="/product-blogs" element={<ProductBlogs />} />
        <Route path="/blog-add" element={<AddBlog />} />
        <Route path="/blog-list" element={<BlogList />} />
        <Route path="/product-career" element={<ProductCareer />} />
        <Route path="/career-add" element={<AddCareer />} />
        <Route path="/career-list" element={<CareerList />} />
        <Route path="/JobApplyList" element={<JobApplyList />} />        
        <Route path="/about-team" element={<TeamList />} />
        <Route path="/about-add-team" element={<AddTeam />} />        
        <Route path="/SubscribeList" element={<SubscribeList />} />

        <Route path="/booking" element={<Booking />} />
        <Route path="/bookingDetails" element={<BookingDetails />} />
        <Route path="/city" element={<City />} />
        <Route path="/university" element={<University />} />
        <Route path="/property" element={<Property />} />
        <Route path="/ongoingBookings" element={<OngoingBookingList />} />
        <Route path="/currentBookings" element={<CurrentBookingList />} />
        <Route path="/pastBookings" element={<PastBookingList />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
