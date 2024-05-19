import React, { useState, useEffect } from "react";
import axios from "axios";
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div>{text}</div>;

const Donations = () => {
  const [formData, setFormData] = useState({
    amount: 1,
    name: "",
    location: "",
    donationType: "money",
    description: "",
    zipCode: "",
  });
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donationLocations, setDonationLocations] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState("");

  useEffect(() => {
    fetchDonationLocations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://humanity-hub1-3599a88da879.herokuapp.com/", formData);
      console.log("Donation successful:", response.data);
      setDonationSuccess(true);
      window.location.href = "https://buy.stripe.com/test_9AQeX39JE34G4kU5kk"; 
    } catch (error) {
      console.error("Error donating:", error);
    }
  };

  const fetchDonationLocations = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.get(`https://humanity-hub1-3599a88da879.herokuapp.com/donations?zipCode=${formData.zipCode}`);
      if (Array.isArray(response.data)) {
        setDonationLocations(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setDonationLocations([]);
      }
    } catch (error) {
      console.error("Error searching for donation locations:", error);
      setDonationLocations([]);
    }
  };

  const handleItemTypeChange = (e) => {
    setSelectedItemType(e.target.value);
  };

  return (
    <div>
      <h1>Want to Donate?</h1>
      <u><h2>Your Gift Transforms Lives</h2></u>
        
      {donationSuccess && <p>Donation successfully submitted!</p>}
      <div>
        <h3>Monetary Donation:</h3>
        <p>
          Only 0.9% of donations make it to organizations dedicated to all humans or living beings. We're changing that.
        </p>
        <p>
          All lives are creating revolutionary change in their communities.
        </p>
        <p>
          They are overcoming incredible challenges to their safety, success, and human rights to ensure equal opportunity for everyone. Your gift supports that transformational work.
        </p>
        <p>
          We fuel movements to end civil wars, get leaders elected, and secure laws giving new protection to millions of marginalized people. Imagine what else we can do together—are you in?
        </p>
        <form onSubmit={handleSubmit}>
          <button type="submit">Donation for Campaign</button>
          <h6>Securely, redirect to Payment Page</h6>
        </form>
      </div>
      <div>
        <h3>Find Other donations on your local Area</h3>
        <form onSubmit={fetchDonationLocations}>
          <label>
            Find by Zip Code:
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Search</button>
        </form>
        <label>
          Filter by Item Type:
          <select value={selectedItemType} onChange={handleItemTypeChange}>
            <option value="">All</option>
            <option value="clothes">Clothes</option>
            <option value="toys">Toys</option>
            <option value="books">Books</option>
            <option value="food">Food</option>
            <option value="refurbishedLaptops">Refurbished Laptops</option>
            <option value="plants">Plants</option>
            <option value="shoes">Shoes</option>
          </select>
        </label>
      </div>
      <div style={{ height: '400px', width: '100%' }}>
        <h3>Donation Locations</h3>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={{ lat: 37.7749, lng: -122.4194 }} // Default center for the map (San Francisco)
          defaultZoom={10} // Default zoom level
        >
          {donationLocations.map((location) => (
            <Marker
              key={location.id}
              lat={location.latitude}
              lng={location.longitude}
              text={location.name}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Donations;
