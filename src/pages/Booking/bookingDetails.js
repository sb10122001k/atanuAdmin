import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Carousel, Button, Form, Table } from 'react-bootstrap';
import { base_url } from '../../constant';
import { useLocation } from 'react-router-dom';

const BookingDetails = () => {
  const [bookingData, setBookingData] = useState({});
  const [tenants, setTenants] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [refundAmount, setRefundAmount] = useState([]);

  const [confirmBookingData, setConfirmBookingData] = useState({
    moveinDate: '',
    moveOutData: '',
    price: 0,
  });

  const getTenantDocuments = (tenantId) => {
    return documents.filter((doc) => doc.tentantsId === tenantId);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const singleBookingData = async () => {
    try {
      const accessToken = localStorage.getItem('x-access-token');
      const refreshToken = localStorage.getItem('x-refresh-token');
      const res = await axios.get(`${base_url}/booking/getBookingSingle?id=${id}`, {
        headers: {
          'x-access-token': accessToken,
          'x-refresh-token': refreshToken,
        }
      });
      setBookingData(res?.data?.booking[0]);
      setTenants(res?.data?.tentants);
      setDocuments(res?.data?.document);
      setPaymentData(res?.data?.payment);
      const rd = []
      res?.data?.payment?.map((item) => {
        rd.push(0)
      })
      setRefundAmount(rd)
      setConfirmBookingData({
        moveinDate: res?.data?.booking[0].moveinDate,
        moveOutData: res?.data?.booking[0].moveOutData,
        price: res?.data?.booking[0].monthlyRent,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      const accessToken = localStorage.getItem('x-access-token');
      const refreshToken = localStorage.getItem('x-refresh-token');
      const response = await axios.get(`${base_url}/booking/cancelBookingAdmin?id=${id}`, {
        headers: {
          'x-access-token': accessToken,
          'x-refresh-token': refreshToken,
        }
      });
      console.log(response?.status, "Status")
      console.log(response?.data)
      alert("Successfully Cancelled Booking");
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      const accessToken = localStorage.getItem('x-access-token');
      const refreshToken = localStorage.getItem('x-refresh-token');
      console.log(confirmBookingData)
      confirmBookingData.booking = id
      const response = await axios.post(`${base_url}/booking/confirmBooking`, confirmBookingData, {
        headers: {
          'x-access-token': accessToken,
          'x-refresh-token': refreshToken,
        },
      });
      alert('Successfully Confirmed Booking');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBooking = async()=>{
    try {
      const accessToken = localStorage.getItem('x-access-token');
      const refreshToken = localStorage.getItem('x-refresh-token');
      console.log(confirmBookingData)
      confirmBookingData.booking = id
      console.log(confirmBookingData,"Data")
      const response = await axios.post(`${base_url}/booking/updateCurrentBooking`, confirmBookingData, {
        headers: {
          'x-access-token': accessToken,
          'x-refresh-token': refreshToken,
        },
      });
      alert('Successfully Updated Booking');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOfflinePaymentRefund = async (payment, index) => {
    try {
      console.log(refundAmount[index], "Refund Amount")
      if (payment?.amount < refundAmount[index]) {
        alert("Amount cant be greater than actual amount")
      }
      else {
        const accessToken = localStorage.getItem('x-access-token');
        const refreshToken = localStorage.getItem('x-refresh-token');
        const res = await axios.post(`${base_url}/payment/refundOfflineAmount`, {
          id: payment?.id,
          refundAmount: refundAmount[index]
        },
          {
            headers: {
              'x-access-token': accessToken,
              'x-refresh-token': refreshToken,
            }
          })
        window.location.reload();
        console.log(res?.status, res?.data)
      }


    } catch (error) {
      console.log(error)
    }
  }
  const handleOnlinePaymentRefund = async (payment, index) => {
  }

  const handleRefundAmountFieldChange = (e, index) => {
    const newRefundAmount = [...refundAmount];
    newRefundAmount[index] = parseInt(e.target.value, 10) || 0; // Convert to integer or set to 0 if NaN
    setRefundAmount(newRefundAmount);
  };

  useEffect(() => {
    singleBookingData();
  }, [id]);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>Booking Details</Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>{bookingData.name}</Card.Title>
                </Col>
                {bookingData.booking_status == 'service_fee_paid' && (
                  <Col onClick={handleCancelBooking}>
                    <Button className="btn btn-danger">Cancel Booking</Button>
                  </Col>
                )}
                {bookingData.booking_status == 'service_fee_paid' && (
                  <Col>
                    <Button onClick={handleConfirmBooking}>Confirm Booking</Button>
                  </Col>
                )}
                {bookingData.booking_status == 'booked' && (
                  <Col>
                    <Button onClick={handleUpdateBooking}>Update Booking</Button>
                  </Col>
                )}
              </Row>
              <Card.Title>
                Current Status : <span>{bookingData.booking_status} </span>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {bookingData.buildingType} - {bookingData.bedroom} Bedrooms -{bookingData.bath} Bathrooms
              </Card.Subtitle>
              <Card.Text>{bookingData.locationDescription}</Card.Text>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Area:</strong> {bookingData.area}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>City:</strong> {bookingData.city}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Country:</strong> {bookingData.country}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Monthly Rent:</strong> {bookingData.monthlyRent}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Service Fee:</strong> {bookingData.serviceFee}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Move-in Date:</strong> {bookingData.moveinDate}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Move-out Date:</strong> {bookingData.moveOutData}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>Property Images</Card.Header>
            <Card.Body>
              <Carousel>
                {bookingData.photos?.map((photo, index) => (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100" src={photo} alt={`Slide ${index}`} width={100} height={300} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={9}>
          <Card>
            <Card.Header>Payment</Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Proof</th>
                    <th>Refund</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentData.map((payment, index) => (
                    <tr key={index}>
                      <td>{payment?.type}</td>
                      <td>{payment?.createdAt.slice(0, 10).split('-').reverse().join('/')}</td>
                      <td>{payment?.meathod}</td>
                      <td>{payment?.amount}</td>
                      <td>{payment?.status}</td>
                      <td>
                        <a href={payment?.paymentProof} target="_blank" rel="noopener noreferrer">
                          View Document
                        </a>
                      </td>
                      {payment?.status == 'refunded' ?
                        <td>
                              <p><strong>Amount :</strong> {payment?.refundAmount}</p>
                          <p><strong>Refund Date :</strong> {payment?.refundedDate?.slice(0,10).split('-').reverse().join('/')}</p>
                        </td> :
                        <td>
                          <Form>
                            <Form.Control
                              type="number"
                              placeholder="Enter refund amount"
                              min="0"
                              value={refundAmount[index]}
                              onChange={(e) => handleRefundAmountFieldChange(e, index)}
                              max={payment?.amount}
                            />
                            <Button
                              variant="danger"
                              className="mt-2"
                              onClick={() => {
                                payment?.meathod === 'offline'
                                  ? handleOfflinePaymentRefund(payment, index)
                                  : handleOnlinePaymentRefund(payment, index);
                              }}
                            >
                              Refund
                            </Button>
                          </Form>
                        </td>


                      }
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {(bookingData.booking_status == "service_fee_paid" || (bookingData.booking_status == "booked" && new Date(bookingData.moveOutData) >= new Date())) &&
          <Col md={3}>
            <Card>
              <Card.Header>Confirm Booking</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="moveinDate">
                    <Form.Label>Move-in Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="moveinDate"
                      value={confirmBookingData.moveinDate}
                      onChange={(e) =>
                        setConfirmBookingData({
                          ...confirmBookingData,
                          moveinDate: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="moveOutData">
                    <Form.Label>Move-out Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="moveOutData"
                      value={confirmBookingData.moveOutData}
                      onChange={(e) =>
                        setConfirmBookingData({
                          ...confirmBookingData,
                          moveOutData: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={confirmBookingData.price}
                      onChange={(e) =>
                        setConfirmBookingData({
                          ...confirmBookingData,
                          price: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>}
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>Tenants</Card.Header>
            <ListGroup>
              {tenants.map((tenant) => (
                <ListGroup.Item key={tenant.id}>
                  <h5>{tenant.name}</h5>
                  <p>
                    <strong>Reason:</strong> {tenant.reason}
                  </p>
                  <p>
                    <strong>Email:</strong> {tenant.email}
                  </p>
                  <p>
                    <strong>Passport:</strong> {tenant.passport}
                  </p>
                  <p>
                    <strong>LOI Signed:</strong> {tenant.loiUploaded ? "Signed" : "Not Signed"}
                  </p>
                  <p>
                    <strong>Document Status:</strong> {tenant.documentStatus}
                  </p>
                  <p>
                    <strong>Documents:</strong>
                  </p>
                  <ListGroup>
                    {getTenantDocuments(tenant.id).map((doc) => (
                      <ListGroup.Item key={doc.id}>
                        <strong>{doc.documentName}:</strong>{' '}
                        <a href={doc.document} target="_blank" rel="noopener noreferrer" className='text-primary'>
                          View Document
                        </a>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingDetails;