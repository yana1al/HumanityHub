import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen); // Toggle menu open/close state
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
      <Link to="/" className="logo">HH</Link> {/* Fixed logo navigation */}
      <div className="menu" onClick={handleMenuClick}>
        <div className="menu-title">Access</div>
        {menuOpen && (
          <div className="menu-list">
            <div className="menu-item" onClick={() => handleMenuItemClick("about")}>About Us</div>
            <div className="menu-item" onClick={() => handleMenuItemClick("donations")}>Donations</div>
            <div className="menu-item" onClick={() => handleMenuItemClick("events")}>Events</div>
            <div className="menu-item" onClick={() => handleMenuItemClick("login")}>Login</div>
          </div>
        )}
      </div>
      <div>
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
