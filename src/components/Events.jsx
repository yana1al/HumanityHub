import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Events = () => {
  // State to store the list of events
  const [events, setEvents] = useState([]);
  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState({ zipCode: "", city: "" });

  // Fetch events from the server when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to handle changes in the search inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value
    }));
  };

  // Function to handle the form submission for searching events
  const handleSubmitSearchEvents = async (e) => {
    e.preventDefault();
    try {
      // Send GET request to fetch events based on search query
      const response = await axios.get("https://humanity-hub1-3599a88da879.herokuapp.com/api/events", {
        params: searchQuery
      });

      // Redirect to GlobalGiving website
      window.location.href = "https://www.globalgiving.org/search/?size=25&nextPage=1&sortField=sortorder&loadAllResults=true";
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  // Function to fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://humanity-hub-back-0e67c67407b5.herokuapp.com/");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  // Predefined events data
  const predefinedEvents = [
    {
      title: "Humanity Hub Conference",
      location: "San Francisco, 800 Market St",
      date: "June 19 2024",
      time: "8:00 AM",
      image: "/images/webinar.png"
    },
  {
    title: "Pride Parade",
    location: "Financial District, SF Bay",
    date: "June 2 2024",
    time: "9:00 AM onwards",
    image: "/images/lgbtq.png"
  },
  
  {
  title: "Spring Festival",
  location: "San Francisco Ballet School",
  date: "May 30, 2024",
  time: "12:00 PM onwards",
  image: "/images/ballet.png"
},
];

  return (
    <div className="events-container">
      {/* Heading */}
      <h1>Humanity Hub Campaigns & Events</h1>
      
      <form onSubmit={handleSubmitSearchEvents} className="search-form">
        <label>
          Zip Code:
          <input type="text" name="zipCode" value={searchQuery.zipCode} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={searchQuery.city} onChange={handleChange} />
        </label>
        <button type="submit">Search Events</button>
      </form>
      
      <Link to="/createEvents">Let's Host Event or Campaign Together</Link> 

      <h2>OR</h2>
      
      <h2>Join with Us:</h2>
      <div className="predefined-events">
        {predefinedEvents.map((event, index) => (
          <div key={index} className="event-card">
            <img src={event.image} alt={event.title} className="event-image" />
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
      {/* Display fetched events */}
      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
