import React, { useState } from "react";
import Minus from "./../../assets/images/minus.jpg";
import Plus from "./../../assets/images/plus.png";

const PropertyForm = () => {
  const initialFormData = {
    images: [], // Store file paths instead of files
    name: "",
    type:"",
    buildingType:"",
    bedroom:"",
    bath:"",
    resident:"",
    size:"",
    minStay:"",
    price:"",
    ameinties:"",
    city:"",
    country: "",
    area: "",
    locationDescription:"",
    areaMapLink:"",
    exactMapLink:"",
    threeTour:"",
    floorPlan:"",
    ttkVideo:"",
    ttkMessage:"",
    universityAssociated:"",
    serviceFree:"",
    mapCordinates:"",
    longitude:"",
    latitude:""
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;
  
    if (!formData.name) {
      errors.name = "Name is required";
      isValid = false;
    }
  
    if (!formData.type) {
      errors.type = "Type is required";
      isValid = false;
    }
  
    if (!formData.buildingType) {
      errors.buildingType = "Building Type is required";
      isValid = false;
    }
  
    if (!formData.bedroom) {
      errors.bedroom = "Bedroom is required";
      isValid = false;
    }
  
    if (!formData.bath) {
      errors.bath = "Bath is required";
      isValid = false;
    }
  
    if (!formData.resident) {
      errors.resident = "Resident is required";
      isValid = false;
    }
  
    if (!formData.size) {
      errors.size = "Size is required";
      isValid = false;
    }
  
    if (!formData.minStay) {
      errors.minStay = "Min Stay is required";
      isValid = false;
    }
  
    if (!formData.price) {
      errors.price = "Price is required";
      isValid = false;
    }
  
    if (!formData.ameinties) {
      errors.ameinties = "Amenities are required";
      isValid = false;
    }
  
    if (!formData.city) {
      errors.city = "City is required";
      isValid = false;
    }
  
    if (!formData.country) {
      errors.country = "Country is required";
      isValid = false;
    }
  
    if (!formData.area) {
      errors.area = "Area is required";
      isValid = false;
    }
  
    if (!formData.locationDescription) {
      errors.locationDescription = "Location Description is required";
      isValid = false;
    }
  
    if (!formData.areaMapLink) {
      errors.areaMapLink = "Area Map Link is required";
      isValid = false;
    }
  
    if (!formData.exactMapLink) {
      errors.exactMapLink = "Exact Map Link is required";
      isValid = false;
    }
  
    if (!formData.threeTour) {
      errors.threeTour = "Three Tour is required";
      isValid = false;
    }
  
    if (!formData.floorPlan) {
      errors.floorPlan = "Floor Plan is required";
      isValid = false;
    }
  
    if (!formData.ttkVideo) {
      errors.ttkVideo = "TTK Video is required";
      isValid = false;
    }
  
    if (!formData.ttkMessage) {
      errors.ttkMessage = "TTK Message is required";
      isValid = false;
    }
  
    if (!formData.universityAssociated) {
      errors.universityAssociated = "University Associated is required";
      isValid = false;
    }
  
    if (!formData.serviceFree) {
      errors.serviceFree = "Service Free is required";
      isValid = false;
    }
  
    if (!formData.mapCordinates) {
      errors.mapCordinates = "Map Coordinates is required";
      isValid = false;
    }
  
    if (!formData.longitude) {
      errors.longitude = "Longitude is required";
      isValid = false;
    }
  
    if (!formData.latitude) {
      errors.latitude = "Latitude is required";
      isValid = false;
    }
  
    setFormErrors(errors);
    return isValid;
  };
  
  const handleChange = (e) => {
    const { name } = e.target;
    let value = e.target.value;
  
    // For file inputs, use e.target.files to access the selected file(s)
    if (e.target.type === 'file') {
      value = e.target.files[0]; // Assuming you only allow selecting one file
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const paths = files.map((file) => URL.createObjectURL(file)); // Get file paths
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...paths], // Append new paths to existing ones
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( formErrors, "this is working");
    if (validateForm()) {
      // Handle form submission, you can send formData to backend or perform any other actions here
      console.log(formData);
      // Reset form after successful submission
      setFormData(initialFormData);
      console.log(formData);
    }
  };


  const handleClear = () => {
    setFormData(initialFormData); // Reset the form data to initial values
    setFormErrors({});
  };

    return (
      <form >
        <table>
          <tbody>
          <tr>
          <td>
            <label htmlFor="images">Images:</label>
          </td>
          <td>
            <input
              type="file"
              multiple
              id="images"
              name="images"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
            <div>
              {formData.images.map((path, index) => (
                <img
                  key={index}
                  src={path}
                  alt={`Image ${index}`}
                  style={{
                    maxWidth: "140px",
                    maxHeight: "140px",
                    margin: "5px",
                  }}
                />
              ))}
            </div>
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="name">Name:</label>
          </td>
          <td>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              required
            />
            {formErrors.name && <span style={{ color: "red" }}>{formErrors.name}</span>}
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="type">Type:</label>
          </td>
          <td>
            <input
              type="text"
              id="type"
              name="type"
              placeholder="Type"
              value={formData.type}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="buildingType">Building Type:</label>
          </td>
          <td>
            <input
              type="text"
              id="buildingType"
              name="buildingType"
              placeholder="Building Type"
              value={formData.buildingType}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="bedroom">Bedroom:</label>
          </td>
          <td>
            <input
              type="text"
              id="bedroom"
              name="bedroom"
              placeholder="Bedroom"
              value={formData.bedroom}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="bath">Bath:</label>
          </td>
          <td>
            <input
              type="text"
              id="bath"
              name="bath"
              placeholder="Bath"
              value={formData.bath}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="resident">Resident:</label>
          </td>
          <td>
            <input
              type="text"
              id="resident"
              name="resident"
              placeholder="Resident"
              value={formData.resident}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="size">Size:</label>
          </td>
          <td>
            <input
              type="text"
              id="size"
              name="size"
              placeholder="Size"
              value={formData.size}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="minStay">Min Stay:</label>
          </td>
          <td>
            <input
              type="text"
              id="minStay"
              name="minStay"
              placeholder="Min Stay"
              value={formData.minStay}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="price">Price:</label>
          </td>
          <td>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="ameinties">Amenities:</label>
          </td>
          <td>
            <input
              type="text"
              id="ameinties"
              name="ameinties"
              placeholder="Amenities"
              value={formData.ameinties}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="city">City:</label>
          </td>
          <td>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="country">Country:</label>
          </td>
          <td>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => handleChange(e)}
              required
            />
            {formErrors.country && <span style={{ color: "red" }}>{formErrors.country}</span>}
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="area">Area:</label>
          </td>
          <td>
            <input
              type="text"
              id="area"
              name="area"
              placeholder="Area"
              value={formData.area}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="locationDescription">Location Description:</label>
          </td>
          <td>
            <input
              type="text"
              id="locationDescription"
              name="locationDescription"
              placeholder="Location Description"
              value={formData.locationDescription}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="areaMapLink">Area Map Link:</label>
          </td>
          <td>
            <input
              type="text"
              id="areaMapLink"
              name="areaMapLink"
              placeholder="Area Map Link"
              value={formData.areaMapLink}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="exactMapLink">Exact Map Link:</label>
          </td>
          <td>
            <input
              type="text"
              id="exactMapLink"
              name="exactMapLink"
              placeholder="Exact Map Link"
              value={formData.exactMapLink}
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
          <td>
            <label htmlFor="threeTour">Three Tour:</label>
          </td>
          <td>
            <input
              type="file"
              id="threeTour"
              name="threeTour"
              placeholder="Three Tour"
              onChange={(e) => handleChange(e)}
            />
          </td>
        </tr>
        
        <tr>
        <td>
          <label htmlFor="floorPlan">Floor Plan:</label>
        </td>
        <td>
          <input
            type="file"
            id="floorPlan"
            name="floorPlan"
            placeholder="Floor Plan"
            onChange={(e) => handleChange(e)}
          />
        </td>
      </tr>
      
      <tr>
        <td>
          <label htmlFor="ttkVideo">Ttk Video:</label>
        </td>
        <td>
          <input
            type="file"
            id="ttkVideo"
            name="ttkVideo"
            placeholder="Ttk Video"
            onChange={(e) => handleChange(e)}
          />
        </td>
      </tr>
      
      <tr>
        <td>
          <label htmlFor="ttkMessage">Ttk Message:</label>
        </td>
        <td>
          <input
            type="text"
            id="ttkMessage"
            name="ttkMessage"
            placeholder="Ttk Message"
            value={formData.ttkMessage}
            onChange={(e) => handleChange(e)}
          />
        </td>
      </tr>
      
      <tr>
        <td>
          <label htmlFor="universityAssociated">University Associated:</label>
        </td>
        <td>
          <input
            type="text"
            id="universityAssociated"
            name="universityAssociated"
            placeholder="University Associated"
            value={formData.universityAssociated}
            onChange={(e) => handleChange(e)}
          />
        </td>
      </tr>
      
      <tr>
        <td>
          <label htmlFor="serviceFree">Service Free:</label>
        </td>
        <td>
          <input
            type="text"
            id="serviceFree"
            name="serviceFree"
            placeholder="Service Free"
            value={formData.serviceFree}
            onChange={(e) => handleChange(e)}
          />
        </td>
      </tr>
      
      <tr>
        <td>
          <label htmlFor="mapCordinates">Map Coordinates:</label>
        </td>
        <td>
          <input
            type="text"
            id="mapCordinates"
            name="mapCordinates"
            placeholder="Map Coordinates"
            value={formData.mapCordinates}
            onChange={(e) => handleChange(e)}
          />
        </td>
      </tr>
      
      <tr>
        <td>
          <label htmlFor="longitude">Longitude:</label>
        </td>
        <td>
          <input
            type="text"
            id="longitude"
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={(e) => handleChange(e)}
          />
        </td>
      </tr>
      
      <tr>
        <td>
          <label htmlFor="latitude">Latitude:</label>
        </td>
        <td>
          <input
            type="text"
            id="latitude"
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={(e) => handleChange(e)}
          />
        </td>
      </tr>
      
        

            <tr>
              <td>
                <button className="submit_city" onClick={handleSubmit}>
                  Submit
                </button>
              </td>
              <td>
                <button className="cancel_city" type="button" onClick={handleClear}>
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  };

  export default PropertyForm;
