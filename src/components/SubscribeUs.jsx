import React from "react";

const SubscribeUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
  };

  return (
    <div className="subscribe-us">
      <h3>Subscribe Now</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <button type="submit">Subscribe</button>
      </form>
    </div>
  );
};

export default SubscribeUs;
