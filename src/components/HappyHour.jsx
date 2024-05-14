import React, { useState, useEffect } from "react";
import axios from "axios";

const HappyHour = ({ eventId }) => {
  const [happyHour, setHappyHour] = useState(null);

  useEffect(() => {
    // Fetch Happy Hour details from backend
    axios.get(`/api/happy-hours/${eventId}`)
      .then(response => {
        setHappyHour(response.data);
      })
      .catch(error => {
        console.error("Error fetching Happy Hour details:", error);
      });
  }, [eventId]);

  const handleJoinZoomMeeting = (zoomLink) => {
    window.open(zoomLink, "_blank"); // Open Zoom meeting link in a new tab
  };

  return (
    <div>
      {happyHour && (
        <div>
          <h2>{happyHour.title}</h2>
          <p>Date: {happyHour.date}</p>
          <p>Time: {happyHour.time}</p>
          <p>Description: {happyHour.description}</p>
          <button onClick={() => handleJoinZoomMeeting(happyHour.zoomLink)}>Join Zoom Meeting</button>
        </div>
      )}
    </div>
  );
};

export default HappyHour;
