import React, { useEffect, useState } from "react";
import FirstNavbar from "../dashboard/FirstNavbar";
import SideBar from "../dashboard/SideBar";
import PropertyForm from "./propertyForm";
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

const Property = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyData, setPropertyData] = useState([]);

  const getPropertyData = async () => {
    try {
      const res = await axios.get(`${base_url}/property`);
      setPropertyData(res?.data?.data);
    } catch (error) {
      console.log(error, "Error");
    }
  };

  useEffect(() => {
    getPropertyData();
  }, []);

  const toggleFormVisibility = (property = null) => {
    setSelectedProperty(property);
    setShowForm(!showForm);
  };

  const renderPropertyCards = () => {
    return propertyData.map((property) => (
      <Card key={property.id}>
        <h3>{property.name}</h3>
        <p>Type: {property.type}</p>
        <p>Building Type: {property.buildingType}</p>
        <Button onClick={() => toggleFormVisibility(property)}>Edit</Button>
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
        <Button onClick={() => toggleFormVisibility()}>Add Property</Button>
        {showForm && (
          <PropertyForm
            initialData={selectedProperty}
          />
        )}
        <CardContainer>{renderPropertyCards()}</CardContainer>
      </Content>
    </Container>
  );
};

export default Property;