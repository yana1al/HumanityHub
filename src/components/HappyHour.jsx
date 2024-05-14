import React from "react";

const HappyHour = () => {
  
  const zoomLink = "https://us05web.zoom.us/j/86518387952?pwd=De7pxYcnZ6qAp91F8nrlvt7bpxmiGv.1";

  const eventDetails = {
    place: "Samovar Tea",
    location: "1910 Fillmore Street, SF, CA, 94115",
    date: "Saturday, May 28, 2024",
    time: "5:00 PM - 7:00 PM",
    checkOutThisTeaPalace: "https://www.samovartea.com/1910-fillmore/"
  };

  return (
    <div className="happy-hour">
      <h3>Happy Hour</h3>
      <div className="happy-hour-option">
        <h4>In-Person Happy Hour</h4>
        <p>Join us for an in-person happy hour at {eventDetails.place} in the {eventDetails.location}!</p>
        <p>Date: {eventDetails.date}</p>
        <p>Time: {eventDetails.time}</p>
        <a href={eventDetails.checkOutThisTeaPalace} target="_blank" rel="noopener noreferrer">
          Check Out This Tea Palace
        </a>
      </div>
      <div className="happy-hour-option">
        <h4>Can't Join Us In-Person? No Perblem, We will meet Next Time Virtually here!</h4>
        
        <p>One Click is right away from You to Join Us Virtually!</p>
        <a href={zoomLink} target="_blank" rel="noopener noreferrer">
          Humanity Hub' Happy Hour
        </a>
      </div>
    </div>
  );
};

export default HappyHour;
