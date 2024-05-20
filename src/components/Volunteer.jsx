import React from "react";

const Volunteer = () => {
  return (
    <div className="volunteer">
      
      <h1>Helping Hands @ HH!</h1>
        <img src="/images/IMG_1347.jpeg" alt="Helping Hands @ HH!" className="title-image" />
         
      <p>
        Thank you for your interest in volunteering with Humanity Hub! We
        appreciate your willingness to contribute your time and skills to make
        a difference in our community.
      </p>
      <p>
        Whether you're passionate about social causes, have specific skills you
        want to share, or simply want to give back, there are many ways you can
        get involved as a volunteer.
      </p>
      <p>
      To learn more about volunteer opportunities and how you can make an
        impact, please contact our volunteer coordinator at{" "}
        <a href="mailto:volunteer@humanityhub.org">volunteer@humanityhub.org</a>.
      </p>
    </div>
  );
};

export default Volunteer;
