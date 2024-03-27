import React, { useEffect, useState } from 'react'
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import UniversityForm from './universityForm';
import { base_url } from '../../constant';
import axios from 'axios';

const University = () => {
  const [showForm, setShowForm] = useState(false);
  const [universityData, setUniversityData] = useState([]);
  const [editingUniversity, setEditingUniversity] = useState(null);

  // Mapping function to render booking cards
  const renderBookingCards = () => {
    return universityData.map((university) => (
      <div key={university.id} className="booking-card">
        <h3>Name: {university.name}</h3>
        <p>City: {university.city}</p>
        <p>Country: {university.country}</p>
        <button onClick={() => handleEditUniversity(university)}>Edit</button>
      </div>
    ));
  };

  // Function to toggle the visibility of the form
  const toggleFormVisibility = () => {
    setShowForm(!showForm);
    setEditingUniversity(null);
  };

  const getUniversityData = async () => {
    try {
      const res = await axios.get(`${base_url}/university`)
      setUniversityData(res?.data?.data)
    } catch (error) {
      console.log(error?.response)
    }
  }

  const handleEditUniversity = (university) => {
    setEditingUniversity(university);
    setShowForm(true);
  };

  useEffect(() => {
    getUniversityData();
  }, [])

  return (
    <div>
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <div className="container">
          <FirstNavbar />
          <button className="Add_University" onClick={toggleFormVisibility}>
            {editingUniversity ? 'Cancel' : 'Add University'}
          </button>
          {/* Conditional rendering of the form */}
          {showForm && (
            <UniversityForm
              university={editingUniversity}
              onSubmitSuccess={getUniversityData}
            />
          )}
          <div className="booking-cards-container">
            {renderBookingCards()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default University