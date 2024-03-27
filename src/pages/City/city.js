import React, { useEffect, useState } from "react";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import CityForm from "./cityForm";
import axios from "axios";
import { base_url } from "../../constant";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #f0f0f0;
  padding: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const City = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityData, setCityData] = useState([]);

  const getCityData = async () => {
    try {
      const res = await axios.get(`${base_url}/city`);
      console.log(res?.data?.data, "Data");
      setCityData(res?.data?.data);
    } catch (error) {
      console.log(error, "Error");
    }
  };

  useEffect(() => {
    getCityData();
  }, []);

  const toggleFormVisibility = (city = null) => {
    setSelectedCity(city);
    setShowForm(!showForm);
  };

  const renderCityCards = () => {
    return cityData.map((city) => (
      <Card key={city.id}>
        <h3>{city.name}</h3>
        <p>Country: {city.country}</p>
        <p>About: {city.about}</p>
        <Button onClick={() => toggleFormVisibility(city)}>Edit</Button>
      </Card>
    ));
  };

  return (
    <Container>
      <SidebarContainer>
        <SideBar />
      </SidebarContainer>
      <Content>
        <FirstNavbar />
        <Button onClick={() => toggleFormVisibility()}>Add City</Button>
        {showForm && (
          <CityForm
            initialData={
              selectedCity
                ? {
                    ...selectedCity,
                    documents: selectedCity.documentNeeded,
                  }
                : null
            }
          />
        )}
        <CardContainer>{renderCityCards()}</CardContainer>
      </Content>
    </Container>
  );
};

export default City;