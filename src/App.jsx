import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Events from "./components/Events";
import Donations from "./components/Donations";
import Resources from "./components/Resources";
import HappyHour from "./components/HappyHour";
import PrivacyPolicyDetails from "./components/PrivacyPolicyDetails";
import ConnectUs from "./components/ConnectUs";
import SubscribeUs from "./components/SubscribeUs";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogOut = () => {
    setUser(null);
    localStorage.clear();
  };

  useEffect(() => {
    const checkToken = async () => {
      const user = await checkSession();
      setUser(user);
    };

    const token = localStorage.getItem("token");
    if (token) {
      checkToken();
    }
  }, []);

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} /> 
          <Route path="/donations" element={<Donations />} /> 
          <Route path="/happyHour" element={<HappyHour />} /> 
          <Route path="/resources" element={<Resources />} />
          <Route path="/privacyPolicyDetails" element={<PrivacyPolicyDetails />} />
          <Route path="/connectUs" element={<ConnectUs />} />
          <Route path="/subscribeUs" element={<SubscribeUs />} />
        </Routes>
      </main>
      <footer>
        <Link to="/connectUs">Connect with Us</Link>
        <Link to="/subscribeUs">Subscribe Now</Link>
        <Link to="/privacyPolicyDetails">Privacy Policy</Link>
        <p>&copy; 2024 Humanity Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
