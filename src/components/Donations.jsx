import React, { useState } from "react";
import axios from "axios";

const DonationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    types: "",
    description: "",
    date: "",
  });

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
      await axios.post("/api/donations", formData);
      alert("Donation added successfully!");
      
      setFormData({
        title: "",
        location: "",
        types: "",
        description: "",
        date: "",
      });
    } catch (error) {
      console.error("Error adding donation:", error);
      alert("Failed to add donation. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add New Donation</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        {/* Add other input fields for location, types, description, and date */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Donations;
