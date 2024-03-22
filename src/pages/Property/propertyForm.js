import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { base_url } from '../../constant';

const PropertyForm = () => {
  const [selectedUniversityIds, setSelectedUniversityIds] = useState([]);
  const [formData, setFormData] = useState({
    photos: [],
    name: '',
    type: '',
    buildingType: '',
    bedroom: 0,
    bath: 0,
    resident: 0,
    size: 0,
    minStay: 0,
    price: 0,
    amenities: [],
    city: '',
    country: '',
    area: '',
    locationDescription: '',
    threeTour: '',
    floorPlan: '',
    ttkMessage: '',
    ttkVideo: '',
    universityAssociated: [],
    serviceFee: '',
    longitude: 0,
    latitude: 0,
  });

  const [cities, setCities] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [cityId, setCityId] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files : value,
    }));
  };

  const handleCityChange = (item, key) => {
    setCityId(cities[key - 1].id)
    console.log(cities[key - 1].id, "Key")
    console.log(key)
    setFormData((prevData) => ({
      ...prevData,
      ['city']: item,
      ['country']: cities[key - 1].country
    }))
  }

  const handleAmenitiesChange = (e) => {
    const amenities = e.target.value.split(',').map((amenity) => amenity.trim());
    setFormData((prevData) => ({
      ...prevData,
      amenities,
    }));
  };

  const handleUniversityAssociatedChange = (e) => {
    const { value, checked } = e.target;
    const universityId = universities.find(uni => uni.name === value)?.id;

    if (checked) {
      setFormData(prevData => ({
        ...prevData,
        universityAssociated: [...prevData.universityAssociated, value]
      }));
      setSelectedUniversityIds(prevIds => [...prevIds, universityId]);
    } else {
      setFormData(prevData => ({
        ...prevData,
        universityAssociated: prevData.universityAssociated.filter(uni => uni !== value)
      }));
      setSelectedUniversityIds(prevIds => prevIds.filter(id => id !== universityId));
    }
    console.log(selectedUniversityIds,"Uni")
  };

  const handleGetCityList = async () => {
    try {
      const res = await axios.get(`${base_url}/city`);
      const cityData = res?.data?.data?.map((item) => ({
        id: item.id,
        name: item.name,
        country: item.country,
      }));
      setCities(cityData);

    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleGetUniversityList = async () => {
    try {
      const res = await axios.get(`${base_url}/university`);
      const uniData = res?.data?.data?.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setUniversities(uniData)
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const paths = files.map((file) => URL.createObjectURL(file)); // Get file paths
    setFormData((prevState) => ({
      ...prevState,
      photos: [...prevState.photos, ...files], // Append new files to existing ones
    }));
  };

  useEffect(() => {
    handleGetCityList();
    handleGetUniversityList();
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here, you can send the formData to the server or perform any other desired actions
    const formDataToSend = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          formDataToSend.append(key, item);
        }
      } else {
        formDataToSend.append(key, value);
      }
    }

    
    Array.from(formData.photos).forEach((image, index) => {
      formDataToSend.append('photos', image);
      console.log(formDataToSend.photos)
    });

    formDataToSend.set('city', cityId)
    formDataToSend.set('universityAssociated',JSON.stringify(selectedUniversityIds))
    formDataToSend.set('ameinties',JSON.stringify(formData.amenities))
    console.log(formData.floorPlan[0],"Three tour")
    formDataToSend.set('threeTour',formData?.threeTour[0])
    formDataToSend.set('floorPlan',formData?.floorPlan[0])
    formDataToSend.set('ttkVideo',formData?.ttkVideo[0])

    const accessToken = localStorage.getItem('x-access-token');
    const refreshToken = localStorage.getItem('x-refresh-token');

    try {
      const res = await axios.post(`${base_url}/property`, formDataToSend, {
        headers: {
          'x-access-token': accessToken,
          'x-refresh-token': refreshToken,
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(res.data, "Data")
    } catch (error) {
      console.log(error)
    }
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', gap: '10px' }}>


      <label htmlFor="photos">Photos:</label>
      <input type="file" name="photos" id="photos" multiple onChange={handleImageUpload} />

      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} />

      <label htmlFor="type">Type:</label>
      <input type="text" name="type" id="type" value={formData.type} onChange={handleChange} />

      <label htmlFor="buildingType">Building Type:</label>
      <input type="text" name="buildingType" id="buildingType" value={formData.buildingType} onChange={handleChange} />

      <label htmlFor="bedroom">Bedrooms:</label>
      <input type="number" name="bedroom" id="bedroom" value={formData.bedroom} onChange={handleChange} />

      <label htmlFor="bath">Bathrooms:</label>
      <input type="number" name="bath" id="bath" value={formData.bath} onChange={handleChange} />

      <label htmlFor="resident">Residents:</label>
      <input type="number" name="resident" id="resident" value={formData.resident} onChange={handleChange} />

      <label htmlFor="size">Size:</label>
      <input type="number" name="size" id="size" value={formData.size} onChange={handleChange} />

      <label htmlFor="minStay">Minimum Stay (In Days):</label>
      <input type="number" name="minStay" id="minStay" value={formData.minStay} onChange={handleChange} />

      <label htmlFor="price">Price:</label>
      <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} />

      <label htmlFor="amenities">Amenities (comma-separated):</label>
      <input
        type="text"
        name="amenities"
        id="amenities"
        value={formData.amenities.join(',')}
        onChange={handleAmenitiesChange}
      />

      <label htmlFor="city">City:</label>
      <select name="city" id="city" value={formData.city} onChange={(e) => handleCityChange(e.target.value, e.target.selectedIndex)}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>


      <label htmlFor="country">Country:</label>
      <input type="text" name="country" id="country" value={formData.country} onChange={handleChange} />

      <label htmlFor="area">Area:</label>
      <input type="text" name="area" id="area" value={formData.area} onChange={handleChange} />

      <label htmlFor="locationDescription">Location Description:</label>
      <textarea
        name="locationDescription"
        id="locationDescription"
        value={formData.locationDescription}
        onChange={handleChange}
      />

      <label htmlFor="threeTour">3D Tour:</label>
      <input type="file" name="threeTour" id="threeTour" onChange={handleChange} />

      <label htmlFor="floorPlan">Floor Plan:</label>
      <input type="file" name="floorPlan" id="floorPlan" onChange={handleChange} />

      <label htmlFor="ttkVideo">TTK Video:</label>
      <input type="file" name="ttkVideo" id="ttkVideo" onChange={handleChange} />


      <label htmlFor="ttkMessage">TTK Message:</label>
      <input type="text" name="ttkMessage" id="ttkMessage" value={formData.ttkMessage} onChange={handleChange} />

      <label htmlFor="universityAssociated">Associated Universities:</label>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {universities.map((university) => (
          <div key={university.id} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              id={`university-${university.id}`}
              name="universityAssociated"
              value={university.name}
              checked={formData.universityAssociated.includes(university.name)}
              onChange={handleUniversityAssociatedChange}
              style={{ marginRight: '8px' }}
            />
            <label htmlFor={`university-${university.id}`}>{university.name}</label>
          </div>
        ))}
      </div>

      <label htmlFor="serviceFee">Service Fee:</label>
      <input type="text" name="serviceFee" id="serviceFee" value={formData.serviceFee} onChange={handleChange} />

      <label htmlFor="longitude">Longitude:</label>
      <input type="number" name="longitude" id="longitude" value={formData.longitude} onChange={handleChange} />

      <label htmlFor="latitude">Latitude:</label>
      <input type="number" name="latitude" id="latitude" value={formData.latitude} onChange={handleChange} />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PropertyForm;