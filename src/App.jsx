import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Events from "./components/Events";
import Donations from "./components/Donations";


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
        </Routes>
      </main>
      <footer>
        <p>&copy; 2024 Humanity Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;