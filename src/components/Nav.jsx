import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen); 
  };

  const handleMenuItemClick = (section) => {
    setMenuOpen(false); 
    switch (section) {
      case "about":
        navigate("/about");
        break;
      case "donations":
        navigate("/donations");
        break;
      case "events":
        navigate("/events");
        break;
      case "login":
        navigate("/login");
        break;
      default:
        break;
    }
  };

  return (
    <nav className="navbar">
      <div className="menu-icon" onClick={handleMenuClick}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className="logo-container">
        <Link to="/" className="logo">HH</Link> {/* Logo routes to home page */}
      </div>
      {menuOpen && (
        <div className="menu-list">
          <div className="menu-item" onClick={() => handleMenuItemClick("about")}>About Us</div>
          <div className="menu-item" onClick={() => handleMenuItemClick("donations")}>Donations</div>
          <div className="menu-item" onClick={() => handleMenuItemClick("events")}>Events</div>
          <div className="menu-item" onClick={() => handleMenuItemClick("login")}>Login</div>
        </div>
      )}
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Explore Events..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
};

export default Nav;
