import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


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
  const [editingTestimony, setEditingTestimony] = useState(null);

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await axios.get('https://humanity-hub-back-0e67c67407b5.herokuapp.com/api/testimonies');
        setTestimonies(response.data);
      } catch (error) {
        console.error('Error fetching testimonies:', error);
      }
    };

    fetchTestimonies();
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
    if (!testimonyFormData.name || !testimonyFormData.testimony) {
      alert("Please provide your name and testimony.");
      return;
    }
    try {
      let response;
      if (editingTestimony) {
        // Update existing testimony
        response = await axios.put(`https://humanity-hub-back-0e67c67407b5.herokuapp.com/api/testimonies/${editingTestimony.id}`, testimonyFormData);
        setTestimonies(testimonies.map(testimony =>
          testimony.id === editingTestimony.id ? response.data : testimony
        ));
      } else {
        // Add new testimony
        response = await axios.post('https://humanity-hub-back-0e67c67407b5.herokuapp.com/api/testimonies', testimonyFormData);
        setTestimonies([...testimonies, response.data]);
      }
      setEditingTestimony(null);
      setTestimonyFormData({ name: "", testimony: "", rating: 5 });
    } catch (error) {
      console.error('Error submitting testimony:', error);
    }
  };

  const handleEdit = (testimony) => {
    setEditingTestimony(testimony);
    setTestimonyFormData(testimony);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://humanity-hub-back-0e67c67407b5.herokuapp.com/api/testimonies/${id}`);
      setTestimonies(testimonies.filter(testimony => testimony.id !== id));
    } catch (error) {
      console.error('Error deleting testimony:', error);
    }
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
              <div className="testimony-actions">
                <button onClick={() => handleEdit(testimony)}><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => handleDelete(testimony.id)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
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
              <Link to="/happyHour" className="happy-hour-link">Happy Hour</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;