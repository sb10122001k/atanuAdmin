import React, { useState } from "react";
import Minus from "./../../assets/images/minus.jpg";
import Plus from "./../../assets/images/plus.png";
import { base_url } from "../../constant";
import axios from "axios";
import { Images } from "react-bootstrap-icons";

const CityForm = () => {
  const initialFormData = {
    name: "",
    country: "",
    about: "",
    images: [], // Store file paths instead of files
    documents: [{ name: "", description: "" }], // Store an array of documents
  };


  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});


  console.log(formData , "aaaaa")
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!formData.country.trim()) {
      errors.country = "Country is required";
      isValid = false;
    }

    if (!formData.about.trim()) {
      errors.about = "About is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
      if (index!==0 && !index &&  name === "name" || name === "country" || name === "about") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } 
    else {
      const updatedDocuments = [...formData.documents];
      updatedDocuments[index][name] = value;
      setFormData({
        ...formData,
        documents: updatedDocuments,
      });
    }
  };

  const handleAddDocument = () => {
    setFormData({
      ...formData,
      documents: [...formData.documents, { name: "", description: "" }],
    });
  };
  const handleDeleteDocument = (index) => {
    const updatedDocuments = [...formData.documents];
    updatedDocuments.splice(index, 1);
    setFormData({
      ...formData,
      documents: updatedDocuments,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const paths = files.map((file) => URL.createObjectURL(file)); // Get file paths
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files], // Append new files to existing ones
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
        console.log(formData);
    }

    const accessToken = localStorage.getItem('x-access-token');
    const refreshToken = localStorage.getItem('x-refresh-token');

    const formDataToSend = new FormData();

    // Append form data fields
    formDataToSend.append('name', formData.name);
    formDataToSend.append('country', formData.country);
    formDataToSend.append('about', formData.about);

    // const images =[]
    // Append images
    formData.images.map((image, index) => {
      formDataToSend.append('images', image);
    });
    // formDataToSend.append('images',formData.images)

    // Append documents
    const documentsJson = JSON.stringify(formData.documents);
    formDataToSend.append('documents', documentsJson);
    console.log(formDataToSend)
    try {
        const response = await axios.post(`${base_url}/city`, formDataToSend, {
            headers: {
                'x-access-token': accessToken,
                'x-refresh-token': refreshToken,
                'Content-Type': 'multipart/form-data' 
            }
        });
        

        console.log('Form data sent successfully:', response.data);
            setFormData(initialFormData);

    } catch (error) {
        console.error('Error sending form data:', error);
    }

};

  

  const handleClear = () => {
    setFormData(initialFormData); // Reset the form data to initial values
    setFormErrors({});
  };

    return (
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
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
            
            
              
                <label htmlFor="country" style={{marginLeft:"40px"}}>Country:</label>
              
            
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="India"
                  value={formData.country}
                  onChange={(e) => handleChange(e)}
                  required
                />
                {formErrors.country && <span style={{ color: "red" }}>{formErrors.country}</span>}
            </td>
            </tr>
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

            {formData.documents.map((doc, index) => (
              <tr key={index}>
                <td>
                  <label htmlFor={`document_name_${index}`}>Document Name:</label>
                </td>
                <td>
                  <input
                    type="text"
                    id={`document_name_${index}`}
                    name="name"
                    placeholder="Name"
                    value={doc.name}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
              
              
                  <label htmlFor={`document_des_${index}`} style={{marginLeft:"40px"}}> Description:</label>
              
                
                  <input
                    type="text"
                    id={`document_des_${index}`}
                    name="description"
                    placeholder="Description"
                    value={doc.description}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                  {index === formData.documents.length - 1 && (
                    <>
                      <img
                        src={Plus}
                        alt="plus sign"
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={handleAddDocument}

                      />
                      {index !== 0 && (
                        <img
                          src={Minus}
                          alt="minus sign"
                          style={{
                            width: "30px",
                            height: "30px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteDocument(index)}
                        />
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}

            <tr>
            <td>
          <label htmlFor="about">About:</label>
          </td>
          <td>
          <textarea
          style={{height:"150px", width:"600px"}}
            id="about"
            name="about"
            value={formData.about}
            onChange={handleChange}
            required
          />
          {formErrors.about && <span style={{ color: "red" }}>{formErrors.about}</span>}

            </td>
            </tr>

            <tr>
              <td>
                <button className="submit_city" type="submit">
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

  export default CityForm;
