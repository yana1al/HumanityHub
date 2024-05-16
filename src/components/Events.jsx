import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [zipCode, setZipCode] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        fetchEventsData();
    }, [zipCode, city]); // Fetch events data whenever zip code or city changes

    const fetchEventsData = async () => {
        try {
             
            const response = await axios.get('/api/events', {
                params: {
                    zipCode: zipCode,
                    city: city
                }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events data:', error);
        }
    };

    const handleSearch = () => {
       
        fetchEventsData();
    };

    return (
        <div>
            <h1>Events</h1>
            <div>
                <label>Zip Code:</label>
                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                <label>City:</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        
                        <div>Title: {event.title}</div>
                        <div>Date: {event.date}</div>
                        <div>Description: {event.description}</div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Events;
