import React, { useState } from "react";

const UniversityForm = () => {
  const initialFormData = {
    images: null, // Store file paths instead of files
    name: "",
    country: "",
    city:"",
  };
  const [univerSityformData, setUniverSityFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUniverSityFormData({
      ...univerSityformData,
      [name]: value,
    });
  };

  const handleSingleImageUpload = (e) => {
    const file = e.target.files[0];
    const path = URL.createObjectURL(file); // Get file path
    setUniverSityFormData({
      ...univerSityformData,
      images: path, // Store single file path
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, you can send formData to backend or perform any other actions here
    console.log(univerSityformData);
  };
  
  const handleClear = () => {
    setUniverSityFormData(initialFormData); // Reset the form data to initial values
  };

  return (
    <form onSubmit={handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="images">Logo:</label>
            </td>
            <td>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                onChange={handleSingleImageUpload}
                required
              />
            </td>
       
          {univerSityformData.images && (
            <tr>
              <td></td>
              <td>
                <img
                  src={univerSityformData.images}
                  alt="Selected Image"
                  style={{
                    maxWidth: "140px",
                    maxHeight: "140px",
                    margin: "5px",
                  }}
                />
              </td>
            </tr>
          )}
          
            <td>
              <label htmlFor="name">Name:</label>
            </td>
            <td>
              <input
                type="text"
                id="name"
                name="name"
                value={univerSityformData.name}
                onChange={handleChange}
                required
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
                value={univerSityformData.city}
                onChange={handleChange}
                required
              />
            </td>
          
         
            <td>
              <label htmlFor="country">Country:</label>
            </td>
            <td>
              <input
                type="text"
                id="country"
                name="country"
                value={univerSityformData.country}
                onChange={handleChange}
                required
              />
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

export default UniversityForm;
