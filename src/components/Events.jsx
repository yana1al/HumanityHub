import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";



const Events = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchEvents();
    }, []);
  
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://your-backend-api-url/events");
        if (Array.isArray(response.data)) {
          setEvents(response.data);
          setSelectedEvent(response.data[0]);
        } else {
          setError("Invalid data format received from server");
        }
      } catch (error) {
        setError("Failed to fetch events. Please try again later.");
      }
    };
  
    const handleEventClick = (event) => {
      setSelectedEvent(event);
    };
  
    return (
      <div>
        {error && <p>{error}</p>}
        <h1 className="events-title">Explore All Events</h1>
        <div className="event-container">
          <ul className="events-list">
            {events.map((event) => (
              <li key={event._id} className="event-item">
                <div onClick={() => handleEventClick(event)}>
                  <a href={`#${event.title}`} className="event-link">
                    {event.title}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {selectedEvent && (
          <div className="event-details-container">
            <div className="event-details">
              <h2>{selectedEvent.title}</h2>
              <p>Type: {selectedEvent.type}</p>
              <p>Location: {selectedEvent.location}</p>
              <p>Description: {selectedEvent.description}</p>
              <p>Date: {selectedEvent.date}</p>
              <p>Time: {selectedEvent.time}</p>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Events;
  