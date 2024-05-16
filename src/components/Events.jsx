import React, { useState, useEffect } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ zipCode: "", city: "" });
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: {
      address: "",
      city: "",
      state: "",
      country: "",
      zipCode: ""
    }
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "zipCode" || name === "city") {
      setSearchQuery((prevQuery) => ({
        ...prevQuery,
        [name]: value
      }));
    } else {
      setEventData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        [name]: value
      }
    }));
  };
  

  const handleCityChange = (e) => {
    const { value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        city: value
      }
    }));
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        state: value
      }
    }));
  };

  const handleCountryChange = (e) => {
    const { value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        country: value
      }
    }));
  };

  const handleZipCodeChange = (e) => {
    const { value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      location: {
        ...prevData.location,
        zipCode: value
      }
    }));
  };

  const handleSubmitCreateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/events", eventData);
      setEventData({
        title: "",
        description: "",
        date: "",
        time: "",
        location: {
          address: "",
          city: "",
          state: "",
          country: "",
          zipCode: ""
        }
      });
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleSubmitSearchEvents = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("https://your-heroku-app.herokuapp.com/events", {
        params: searchQuery
      });
      
      console.log("Search results:", response.data);
  
      // Redirect to GlobalGiving website
      window.location.href = "https://www.globalgiving.org/";
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };
  
  const fetchEvents = async () => {
    try {
      const response = await axios.get("https://humanity-hub1-3599a88da879.herokuapp.com/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ];

  const countries = [
    "United States", "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
    "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius",
    "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
    "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama",
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
    "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
    "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
        <button type="submit">Search Events</button>
      </form>
      <form onSubmit={handleSubmitCreateEvent}>
        <label>
          Title:
          <input type="text" name="title" value={eventData.title} onChange={handleChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={eventData.description} onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" value={eventData.date} onChange={handleChange} />
        </label>
        <label>
          Time:
          <input type="time" name="time" value={eventData.time} onChange={handleChange} />
        </label>
        <label>
        <label>
          Address:
          <input type="text" name="address" value={eventData.location.address} onChange={handleLocationChange} />
        </label>

          City:
          <input type="text" name="city" value={eventData.location.city} onChange={handleCityChange} />
        </label>
        <label>
          State:
          <select name="state" value={eventData.location.state} onChange={handleStateChange}>
            {usStates.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>
        </label>
        <label>
          Country:
          <select name="country" value={eventData.location.country} onChange={handleCountryChange}>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </label>
        <label>
          Zip Code:
          <input type="text" name="zipCode" value={eventData.location.zipCode} onChange={handleZipCodeChange} />
        </label>
        <button type="submit">Create Event</button>
      </form>
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
