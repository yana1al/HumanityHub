import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


const Home = ({ user, isAdmin }) => {
  console.log(user);
  const [testimonyFormData, setTestimonyFormData] = useState({
    name: user?.name || "",
    testimony: "",
    rating: 5,
  });
  const [testimonies, setTestimonies] = useState([
    { id: 1, name: "Anupa Sharma", testimony: "This platform changed my life!", rating: 5, donatedAmount: 1 },
    { id: 2, name: "Yana Bhandari", testimony: "I'm grateful for the opportunities provided by this organization.", rating: 5, donatedAmount: 1 }
  ]);
  const [editingTestimony, setEditingTestimony] = useState(null);

  useEffect(() => {
    // Fetch testimonies from the backend (mocked here)
    // In a real app, replace with API call to fetch testimonies
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!testimonyFormData.name || !testimonyFormData.testimony) {
        alert("Please provide your name and testimony.");
        return;
      }
      const response = await axios.post("/api/testimonies", testimonyFormData);
      alert("Review posted successfully!");
      
      setTestimonyFormData({
        name: user?.name || "",
        testimony: "",
        rating: 5
      });
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };
  

  const handleEdit = (testimony) => {
    setEditingTestimony(testimony);
    setTestimonyFormData(testimony);
  };

  const handleDelete = (id) => {
    setTestimonies(testimonies.filter(testimony => testimony.id !== id));
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
              {(user?.name === testimony.name || isAdmin) && (
                <div className="testimony-actions">
                  <button onClick={() => handleEdit(testimony)}><FontAwesomeIcon icon={faEdit} /></button>
                  <button onClick={() => handleDelete(testimony.id)}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        
          <div className="how-did-we-do">
            <div className="background-image"></div>
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
              <button type="submit">{editingTestimony ? "Update" : "Post & Donate"}</button>
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
      </div>
    </div>
  );
};

export default Home;
