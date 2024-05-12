import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Home = () => {
  const testimonies = [
    { 
      id: 1, 
      name: "Anupa Sharma", 
      testimony: "This platform changed my life!", 
      rating: 5 
    },
    { 
      id: 2, 
      name: "Yana Bhandari", 
      testimony: "I'm grateful for the opportunities provided by Humanity Hub.", 
      rating: 5 
    },
    { 
      id: 3, 
      name: "Manju Sharma", 
      testimony: "The work done by this platform is truly inspiring.", 
      rating: 5 
    },
    { 
      id: 4, 
      name: "Pompom SB", 
      testimony: "I've had a wonderful experience volunteering with this platform.", 
      rating: 5 
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon" />);
    }
    return stars;
  };

  return (
    <div className="home">
      <h1>Welcome to Humanity Hub (HH)</h1>
      <p>
        Welcome to Humanity Hub (HH) - Mobilizing Hearts, Empowering Hands, Building a Better World. Your gateway to making a difference in the world. Our landing page is designed to introduce you to our platform and inspire you to get involved in social causes that matter to you.
      </p>
      <h2>Testimonies</h2>
      <div className="testimonies">
        {testimonies.map(testimony => (
          <div key={testimony.id} className="testimony">
            <p>{testimony.testimony}</p>
            <div className="rating">
              {renderStars(testimony.rating)}
            </div>
            <p>- {testimony.name}</p>
          </div>
        ))}
      </div>
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
