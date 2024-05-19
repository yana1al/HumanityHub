import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [testimonyFormData, setTestimonyFormData] = useState({
    name: "",
    testimony: "",
    rating: 5,
  });
  const [testimonies, setTestimonies] = useState([
    { id: 1, name: "Anupa Sharma", testimony: "This platform changed my life!", rating: 5, donatedAmount: 1 },
    { id: 2, name: "Yana Bhandari", testimony: "I'm grateful for the opportunities provided by this organization.", rating: 5, donatedAmount: 1 }
  ]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon" />);
    }
    return stars;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonyFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!testimonyFormData.name || !testimonyFormData.testimony) {
      alert("Please provide your name and testimony.");
      return;
    }
    const newTestimony = { ...testimonyFormData, id: testimonies.length + 1, donatedAmount: 1 };
    setTestimonies([...testimonies, newTestimony]);
    // Reset form data
    setTestimonyFormData({ name: "", testimony: "", rating: 5 });
  };

  return (
    <div className="home-container">
      <div className="welcome-message">
        <Link to="/about">Want to Know Us? Hop on In!</Link>
      </div>
     
      <div className="testimonies-container">
        <div className="testimonies" style={{ marginTop: '20px' }}>
          <h3>Testimonies</h3>
          {testimonies.map((testimony) => (
            <div key={testimony.id} className="testimony">
              <p>{testimony.testimony}</p>
              <div className="rating">
                {renderStars(testimony.rating)}
              </div>
              <p>- {testimony.name}</p>
              <p>Subsidy: ${testimony.donatedAmount}</p>
            </div>
          ))}
        </div>
        <div className="how-did-we-do">
          <h3>Any Suggestions?</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" value={testimonyFormData.name} onChange={handleChange} required />
            </label>
            <label>
              Review:
              <textarea name="testimony" value={testimonyFormData.testimony} onChange={handleChange} required />
            </label>
            <label>
              Rating:
              <select name="rating" value={testimonyFormData.rating} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </label>
            <button type="submit">Post & Donate</button>
          </form>
        </div>
        
        <div className="partnered-with">
          <u><h1>Partnered with:</h1></u>
          <ul>
            <li><a href="https://www.globalgiving.org/" target="_blank" rel="noopener noreferrer">GlobalGiving</a></li>
            <li><a href="https://dashboard.stripe.com/test/dashboard" target="_blank" rel="noopener noreferrer">Stripe</a></li>
          </ul> 
        </div>
        
        <div className="join-us">
          <div className="join-us-content">
            <h3>Many More....</h3>
            <p>Support Us by joining. Follow the link below:</p>
            <div className="support-links">
              <Link to="/donations" className="donations-link">Donations</Link>
              <Link to="/volunteer" className="volunteer-link">Volunteer</Link>
              <Link to="/happyHour" className="happyHour-link">HappyHour</Link>
            </div>
          </div>
        </div>

        <div className="background-image"></div>
      </div>
    </div>
  );
};

export default Home;
