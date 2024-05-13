import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests

const Donations = () => {
  const [formData, setFormData] = useState({
    donationType: "",
    amount: "", 
    date: "", 
    location: "", 
    donationArea: "", 
    description: "",
  });
  const [donationSuccess, setDonationSuccess] = useState(false); // State to track donation success

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
      
      if (formData.donationType === "money") {
        // Perform API call or other logic for submitting monetary donation
        // For demonstration purposes, simulate API call with axios
        await axios.post("/api/donations", formData); 
        setDonationSuccess(true);
      } else {
       
        alert("Please find a donation box in your local area for food and clothes donations.");
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  return (
    <div>
      <h2>Donate</h2>
      {donationSuccess && <p>Donation successfully submitted!</p>} {/* Display success message */}
      <form onSubmit={handleSubmit}>
        <label>
          Amount ($$):
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </label>
        <label>
          Location (City, State, Country):
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label>
          Donation Area (Zip Code or City):
          <input
            type="text"
            name="donationArea"
            value={formData.donationArea}
            onChange={handleChange}
          />
        </label>
        <label>
          Donation Type:
          <select
            name="donationType"
            value={formData.donationType}
            onChange={handleChange}
          >
            <option value="">Select Donation Type</option>
            <option value="money">Money (Virtual)</option>
          </select>
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Donations;
