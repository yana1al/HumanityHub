import React from "react";

const ConnectUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission
  };

  return (
    <div className="connect-us">
      <h3>Connect with Us</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Message:
          <textarea name="message"></textarea>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConnectUs;
