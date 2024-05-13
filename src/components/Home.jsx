import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Home = () => {
  const [testimonyFormData, setTestimonyFormData] = useState({
    name: "",
    testimony: "",
    rating: 5,
  });
  const [testimonies, setTestimonies] = useState([
    { id: 1, name: "Anupa Sharma", testimony: "This platform changed my life!", rating: 5, donatedAmount: 0 },
    { id: 2, name: "Yana Bhandari", testimony: "I'm grateful for the opportunities provided by this organization.", rating: 5, donatedAmount: 0 }
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
    const newTestimony = { ...testimonyFormData, id: testimonies.length + 1, donatedAmount: 0 };
    setTestimonies([...testimonies, newTestimony]);
    // Reset form data
    setTestimonyFormData({ name: "", testimony: "", rating: 5 });
  };

  const donateForTestimony = (testimony) => {
    const donationAmount = 10; // Example donation amount
    console.log(`Donating $${donationAmount} for the testimony by ${testimony.name}`);
    // Add your donation logic here
    // For example, you can send an API request to process the donation
    // Update the donated amount for the testimony
    setTestimonies(testimonies.map((t) => (t.id === testimony.id ? { ...t, donatedAmount: t.donatedAmount + donationAmount } : t)));
  };

  return (
    <div className="home">
      <h1>Welcome to Humanity Hub (HH)</h1>
      <p>
        Welcome to Humanity Hub (HH) - Mobilizing Hearts, Empowering Hands, Building a Better World. Your gateway to making a difference in the world. Our landing page is designed to introduce you to our platform and inspire you to get involved in social causes that matter to you.
      </p>
      <h2>Testimonies</h2>
      <div className="testimonies">
        {testimonies.map((testimony) => (
          <div key={testimony.id} className="testimony">
            <p>{testimony.testimony}</p>
            <div className="rating">
              {renderStars(testimony.rating)}
            </div>
            <p>- {testimony.name}</p>
            <p>Donated Amount: ${testimony.donatedAmount}</p>
            <button onClick={() => donateForTestimony(testimony)}>Donate $</button>
          </div>
        ))}
      </div>
      <h2>Submit Testimony</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={testimonyFormData.name} onChange={handleChange} />
        </label>
        <label>
          Testimony:
          <textarea name="testimony" value={testimonyFormData.testimony} onChange={handleChange} />
        </label>
        <label>
          Rating:
          <select name="rating" value={testimonyFormData.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      <h2>Support Us</h2>
      <p>If you'd like to support our cause, you can make a donation or volunteer with us:</p>
      <div className="support-links">
        <Link to="/donate" className="donate-link">Donate</Link>
        <Link to="/volunteer" className="volunteer-link">Volunteer</Link>
      </div>
    </div>
  );
};

export default Home;