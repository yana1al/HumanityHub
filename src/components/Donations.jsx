import React, { useState, useEffect } from "react";
import axios from "axios";
// import { loadStripe } from "@stripe/stripe-js";
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div>{text}</div>;

const stripePromise = loadStripe(process.env.STRIPE_SECRET_KEY);

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
  }, [formData.zipCode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.donationType === "money") {
      await handleMonetaryDonation();
    } else {
      await handleItemDonation();
    }
  };

  const handleMonetaryDonation = async () => {
    try {
      const stripe = await stripePromise;
      const response = await axios.post("https://humanity-hub1-3599a88da879.herokuapp.com/api/donations", {
        amount: formData.amount * 100, // Stripe expects the amount in cents
      });
      const { clientSecret } = response.data;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: stripe.elements().create('card'),
          billing_details: {
            name: formData.name,
          },
        },
      });

      if (result.error) {
        console.error("Payment failed:", result.error.message);
      } else {
        console.log("Payment successful!");
        setDonationSuccess(true);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const handleItemDonation = async () => {
    try {
      const response = await axios.post("https://humanity-hub-back-0e67c67407b5.herokuapp.com/api/donations", formData);
      console.log("Donation successful:", response.data);
      setDonationSuccess(true);
    } catch (error) {
      console.error("Error donating:", error);
    }
  };

  const fetchDonationLocations = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.get(`https://humanity-hub-back-0e67c67407b5.herokuapp.com/api/donations/donation-locations?zipCode=${formData.zipCode}`);
      setDonationLocations(response.data);
    } catch (error) {
      console.error("Error searching for donation locations:", error);
    }
  };

  const handleItemTypeChange = (e) => {
    setSelectedItemType(e.target.value);
  };

  return (
    <div>
      <h1>Want to Donate?</h1>
      {donationSuccess && <p>Donation successfully submitted!</p>}
      <div>
        <h3>Monetary Donation</h3>
        <form onSubmit={handleSubmit}>
          {/* <label>
            Amount:
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label>
            Name on Card:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label> */}
          <button type="submit">Donate for Campaign</button>
          <p>Securely redirected to Payment Page</p>
        </form>
      </div>
      <div>
        <h3>Find Other donations in your local Area</h3>
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
          defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
          defaultZoom={10}
        >
          {donationLocations.map((location, index) => (
            <Marker
              key={index}
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
