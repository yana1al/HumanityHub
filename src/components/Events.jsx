import React, { useState, useEffect } from "react";
import axios from "axios";
import webinarImage from "../images/webinar.png";
import lgbtqImage from "../images/lgbtq.png";

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
      title: "Humanity Hub Conference",
      location: "San Francisco, 800 Market St",
      date: "June 19 2024",
      time: "8:00 AM",
      image: webinarImage
    },
    {
      title: "Support LGBTQ",
      location: "UC Berkeley",
      date: "May 29 2024",
      time: "9:00 AM onwards",
      image: lgbtqImage
    }
  ];

  return (
    <div className="events-container">
      <form onSubmit={handleSubmitSearchEvents} className="search-form">
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
      <div className="predefined-events">
        {predefinedEvents.map((event, index) => (
          <div key={index} className="event-card">
            <img src={process.env.PUBLIC_URL + event.image} alt={event.title} className="event-image" />
            <div className="event-details">
              <h3>{event.title}</h3>
              <p>
                <strong>Location:</strong> 
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`} target="_blank" rel="noopener noreferrer">
                  {event.location}
                </a>
                <br />
                <strong>Date and Time:</strong> {event.date}, {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      {events.length > 0 ? (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <h2>See you there!</h2>
      )}
    </div>
  );
};

export default Events;