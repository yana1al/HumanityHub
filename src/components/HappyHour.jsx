// HappyHourForm.jsx
import React, { useState } from "react";
import axios from "axios";

const HappyHourForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "virtual", // Default to virtual
    zoomLink: "", // Only for virtual happy hours
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
      await axios.post("/api/happy-hours", formData); // Adjust endpoint as per your API
      onSubmit(); // Trigger callback to update happy hours list
      // Clear form data after submission
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        type: "virtual",
        zoomLink: "",
      });
    } catch (error) {
      console.error("Error submitting happy hour:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} />
      </label>
      <label>
        Description:
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </label>
      <label>
        Time:
        <input type="time" name="time" value={formData.time} onChange={handleChange} />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} />
      </label>
      <label>
        Type:
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="virtual">Virtual</option>
          <option value="in-person">In-person</option>
        </select>
      </label>
      {formData.type === "virtual" && (
        <label>
          Zoom Link:
          <input type="text" name="zoomLink" value={formData.zoomLink} onChange={handleChange} />
        </label>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default HappyHourForm;
