import React, { useEffect, useState } from 'react';
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import axios from 'axios';
import { base_url } from '../../constant';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PastBookingList = () => {


    // Mapping function to render booking cards
    const [data, setData] = useState([])
    const navigate = useNavigate();

    const getBookingList = async () => {
        try {
            const accessToken = localStorage.getItem('x-access-token');
            const refreshToken = localStorage.getItem('x-refresh-token');
            const res = await axios.get(`${base_url}/booking/adminPastBookingList`, {
                headers: {
                    'x-access-token': accessToken,
                    'x-refresh-token': refreshToken,
                }
            });
            await res?.data?.data.sort((a, b) => (a.createdAt < b.createdAt))
            setData(res?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSingleBookClick = (id) => {
        console.log(id, "Idd")
        navigate(`/bookingDetails?id=${id}`)
    }

    useEffect(() => {
        getBookingList();
    }, [])


    return (
        <div>
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="content">
                <div className="container">
                    <FirstNavbar />
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Name</th>
                                <th>Area</th>
                                <th>Monthly Rent</th>
                                <th>Service Fee</th>
                                <th>Move-in Date</th>
                                <th>Move-out Date</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.id} onClick={() => handleSingleBookClick(item.id)}>
                                    <td>{item.id}</td>
                                    <td>{item.status}</td>
                                    <td>{item.name}</td>
                                    <td>{item.area}</td>
                                    <td>{item.monthlyRent}</td>
                                    <td>{item.serviceFee}</td>
                                    <td>{item.moveinDate}</td>
                                    <td>{item.moveOutData}</td>
                                    <td>{item.city_name}</td>
                                    <td>{item.country}</td>
                                    <td>{item.createdAt.slice(0, 10).split('-').reverse().join('/')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PastBookingList;
