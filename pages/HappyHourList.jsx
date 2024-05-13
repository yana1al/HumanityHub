
import React, { useState, useEffect } from "react";
import axios from "axios";

const HappyHourList = () => {
  const [happyHours, setHappyHours] = useState([]);

  useEffect(() => {
    fetchHappyHours();
  }, []);

  const fetchHappyHours = async () => {
    try {
      const response = await axios.get("/api/happy-hours"); // Adjust endpoint as per your API
      setHappyHours(response.data);
    } catch (error) {
      console.error("Error fetching happy hours:", error);
    }
  };

  const deleteHappyHour = async (id) => {
    try {
      await axios.delete(`/api/happy-hours/${id}`); // Adjust endpoint as per your API
      setHappyHours(happyHours.filter((happyHour) => happyHour.id !== id));
    } catch (error) {
      console.error("Error deleting happy hour:", error);
    }
  };

  return (
    <div>
      <h2>Upcoming Happy Hours</h2>
      <ul>
        {happyHours.map((happyHour) => (
          <li key={happyHour.id}>
            <h3>{happyHour.title}</h3>
            <p>Date: {happyHour.date}</p>
            <p>Time: {happyHour.time}</p>
            <p>Location: {happyHour.location}</p>
            <p>Type: {happyHour.type}</p>
            {happyHour.type === "virtual" && <p>Zoom Link: {happyHour.zoomLink}</p>}
            <button onClick={() => deleteHappyHour(happyHour.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HappyHourList;
