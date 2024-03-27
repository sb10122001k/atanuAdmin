import axios from "axios";
import React, { useEffect, useState } from "react";
import { base_url } from "../../constant";

const UniversityForm = ({ university = null }) => {
  const initialFormData = {
    images: null,
    name: "",
    country: "",
    city: "",
  };
  const [univerSityformData, setUniverSityFormData] = useState(
    university || initialFormData
  );
  const [cityData, setCityData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "city") {
      const selectedCity = cityData.find((city) => city.name === value);
      setUniverSityFormData({
        ...univerSityformData,
        [name]: value,
        country: selectedCity?.country || "", // Update country based on selected city
      });
    } else {
      setUniverSityFormData({
        ...univerSityformData,
        [name]: value,
      });
    }
  };

  const handleSingleImageUpload = (e) => {
    const file = e.target.files[0];
    setUniverSityFormData({
      ...univerSityformData,
      images: file,
    });
  };

  const handleGetCityList = async () => {
    try {
      const res = await axios.get(`${base_url}/city`);
      const cityData = res?.data?.data?.map((item) => ({
        id: item.name,
        name: item.name,
        country: item.country,
      }));
      setCityData(cityData);
    } catch (error) {
      console.log(error?.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("x-access-token");
    const refreshToken = localStorage.getItem("x-refresh-token");

    const formDataToSend = new FormData();

    const changedFields = Object.keys(univerSityformData).filter(
      (key) =>
        univerSityformData[key] !== (university ? university[key] : initialFormData[key])
    );
  
    changedFields.forEach((field) => {
      if (field === "images") {
        formDataToSend.append("logo", univerSityformData[field]);
      } else {
        formDataToSend.append(field, univerSityformData[field]);
      }
    });

    try {
      const response = university
        ? await axios.patch(
            `${base_url}/university?id=${university.id}`,
            formDataToSend,
            {
              headers: {
                "x-access-token": accessToken,
                "x-refresh-token": refreshToken,
                "Content-Type": "multipart/form-data",
              },
            }
          )
        : await axios.post(`${base_url}/university`, formDataToSend, {
            headers: {
              "x-access-token": accessToken,
              "x-refresh-token": refreshToken,
              "Content-Type": "multipart/form-data",
            },
          });

      console.log("Form data sent successfully:", response.data);
      setUniverSityFormData(initialFormData);
    } catch (error) {
      console.log(error);
    }
    console.log(univerSityformData);
  };

  const handleClear = () => {
    setUniverSityFormData(initialFormData);
  };

  useEffect(() => {
    handleGetCityList();
    if (university) {
      setUniverSityFormData({
        ...university,
        images: null, // Reset the images field
      });
    }
  }, [university]);

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
                    src={
                      typeof univerSityformData.images === "string"
                        ? univerSityformData.images
                        : URL.createObjectURL(univerSityformData.images)
                    }
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
              <select
                id="city"
                name="city"
                value={univerSityformData.city}
                onChange={handleChange}
                required
              >
                <option value="">Select a city</option>
                {cityData.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
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
                {university ? "Update" : "Submit"}
              </button>
            </td>
            <td>
              <button
                className="cancel_city"
                type="button"
                onClick={handleClear}
              >
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