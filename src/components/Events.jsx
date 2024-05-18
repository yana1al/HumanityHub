import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ zipCode: "", city: "" });

  useEffect(() => {
    fetchEvents();
  }, []);

  console.log("events", events);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value
    }));
  };

  const handleSubmitSearchEvents = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://humanity-hub1-3599a88da879.herokuapp.com/events", {
        params: searchQuery
      });

      console.log("Search results:", response.data);

      // Redirect to GlobalGiving website
      window.location.href = "https://www.globalgiving.org/search/?size=25&nextPage=1&sortField=sortorder&loadAllResults=true";
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://humanity-hub-back-0e67c67407b5.herokuapp.com/");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const predefinedEvents = [
    {
      title: "Diversity",
      location: "San Francisco, 800 Market St",
      date: "June 19 2024",
      time: "10:00 AM"
    },
    {
      title: "Support Abortion",
      location: "UC Berkeley",
      date: "May 29 2024",
      time: "2:00 PM onwards"
    }
  ];

  return (
    <div>
      <form onSubmit={handleSubmitSearchEvents}>
        <label>
          Zip Code:
          <input type="text" name="zipCode" value={searchQuery.zipCode} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={searchQuery.city} onChange={handleChange} />
        </label>
        <button type="submit">Affiliated Campaign with Global Giving</button>
      </form>
      <h2>Join the Campaign:</h2>
      {predefinedEvents.map((event, index) => (
        <div key={index}>
          <h3>{event.title}</h3>
          <p>
            <strong>Location:</strong> {event.location}
            <br />
            <strong>Date and Time:</strong> {event.date}, {event.time}
          </p>
        </div>
      ))}
      {events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      ) : (
        <p>No events available</p>
      )}
    </div>
  );
};

export default Events;
