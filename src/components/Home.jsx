import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Client, { fetchTestimonies } from "../../services/apis"; 

const Home = () => {
  const preMadeTestimonies = [
    {
      id: 1,
      name: "Yana SB",
      testimony: "This platform changed my life!",
      rating: 5,
      donatedAmount: 1,
    },
    
  ];

  const [testimonyFormData, setTestimonyFormData] = useState({
    name: "",
    testimony: "",
    rating: 5,
    donatedAmount: 1,
  });
  const [testimonies, setTestimonies] = useState(preMadeTestimonies);
  const [editingTestimony, setEditingTestimony] = useState(null);

  useEffect(() => {
    const fetchTestimoniesData = async () => {
      try {
        const data = await fetchTestimonies();
        setTestimonies((prevTestimonies) => [...prevTestimonies, ...data]);
      } catch (error) {
        console.error('Error fetching testimonies:', error);
      }
    };

    fetchTestimoniesData();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
    ));
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

    const testimonyData = {
      ...testimonyFormData,
      donatedAmount: 1,
    };

    try {
      let response;
      if (editingTestimony) {
        response = await Client.put(`/api/testimonies/${editingTestimony.id}`, testimonyData);
        setTestimonies(testimonies.map(testimony =>
          testimony.id === editingTestimony.id ? response.data : testimony
        ));
      } else {
        response = await Client.post('/api/testimonies', testimonyData);
        setTestimonies([...testimonies, response.data]);
      }
      setEditingTestimony(null);
      setTestimonyFormData({ name: "", testimony: "", rating: 5, donatedAmount: 1 });
    } catch (error) {
      console.error('Error submitting testimony:', error);
    }
  };

  const handleEdit = (testimony) => {
    setEditingTestimony(testimony);
    setTestimonyFormData({
      name: testimony.name,
      testimony: testimony.testimony,
      rating: testimony.rating,
      donatedAmount: testimony.donatedAmount,
    });
  };

  const handleDelete = async (id) => {
    try {
      await Client.delete(`/api/testimonies/${id}`);
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
                <button onClick={() => handleEdit(testimony)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDelete(testimony.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
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
