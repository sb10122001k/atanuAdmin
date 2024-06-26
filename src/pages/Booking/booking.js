import React, { useEffect, useState } from 'react';
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import axios from 'axios';
import { base_url } from '../../constant';
import { Button, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
 
  const navigate=useNavigate();
  const [pastBookingCount,setPastBookingCount]=useState(0);
  const [currentBookingCount,setCurrentBookingCount]=useState(0);
  const [ongoingBookingCount,setOngoingBookingCount]=useState(0);
  const getDashboardData = async() =>{
    try {
        const accessToken = localStorage.getItem('x-access-token');
        const refreshToken = localStorage.getItem('x-refresh-token');
        const res = await axios.get(`${base_url}/booking/getBookingDashboardData`,{
            headers: {
              'x-access-token': accessToken,
              'x-refresh-token': refreshToken,
            }
        });
        console.log(res?.data,"DAta");
        setPastBookingCount(res?.data?.dataPast[0]?.count)
        setCurrentBookingCount(res?.data?.dataCurrent[0]?.count)
        setOngoingBookingCount(res?.data?.dataOngoing[0]?.count)

    } catch (error) {
        console.log(error?.response)
    }
  }
  useEffect(()=>{
    getDashboardData()
  },[])


  return (
    <div>
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="content">
        <div className="container">
          <FirstNavbar /> 
          <div class="container text-center">
                <div class="row justify-content-start">
                    <div className="d-flex justify-content-around">

                        <Button bg='dark' variant="light" onClick={()=>{navigate('/currentBookings')}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://play-lh.googleusercontent.com/vtF2gcADW6O7qnzipftCyGOyaB4pb12bjl4sMBcZp3KOOdf8DdHUJDVx0JeNeuT7nh3A" />
                                <Card.Body>
                                    <Card.Title>Current Bookings {currentBookingCount}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Button>

                        <Button bg='dark' variant="light" onClick={()=>{navigate('/ongoingBookings')}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://play-lh.googleusercontent.com/vtF2gcADW6O7qnzipftCyGOyaB4pb12bjl4sMBcZp3KOOdf8DdHUJDVx0JeNeuT7nh3A" />
                                <Card.Body>
                                    <Card.Title>Ongoing Bookings {ongoingBookingCount}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Button>

                        <Button bg='dark' variant="light" onClick={()=>{navigate('/pastBookings')}}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="https://play-lh.googleusercontent.com/vtF2gcADW6O7qnzipftCyGOyaB4pb12bjl4sMBcZp3KOOdf8DdHUJDVx0JeNeuT7nh3A" />
                                <Card.Body>
                                    <Card.Title>Past Bookings {pastBookingCount}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Button>

                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
