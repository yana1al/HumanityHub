import React, { useState } from "react";
import { donate } from "../services/apis";

const Donations = () => {
  const [formData, setFormData] = useState({
    amount: 1,
    name: "",
    location: "",
    donationType: "money",
    description: "",
    zipCode: "",
  });
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donationLocations, setDonationLocations] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.donationType === "money") {
        const response = await axios.post("https://humanity-hub1-3599a88da879.herokuapp.com/", formData);
        console.log("Donation successful:", response.data);
        setDonationSuccess(true);
      } else {
        // Handle other donation types like books and clothes
        alert("Donation type not yet implemented");
      }
    } catch (error) {
      console.error("Error donating:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://humanity-hub1-3599a88da879.herokuapp.com/donations?zipCode=${formData.zipCode}`);
      setDonationLocations(response.data);
    } catch (error) {
      console.error("Error searching for donation locations:", error);
    }
  };

  const handleItemTypeChange = (e) => {
    setSelectedItemType(e.target.value);
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    try {
      const { clientSecret } = await donate(donationAmount);
      setClientSecret(clientSecret);
    } catch (error) {
      console.error("Error donating:", error);
      setPaymentError("Failed to process donation. Please try again.");
    }
  };

  return (
    <div>
      <h1>Want to Donate?</h1>
      {donationSuccess && <p>Donation successfully submitted!</p>}
      <div>
        <h3>Monetary Donation</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Amount ($$):
            <input
              type="number"
              name="amount"
              min="1"
              max="100"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Donate Now</button>
        </form>
      </div>
      <div>
        <h3>Find Other donations on your local Area</h3>
        <form onSubmit={handleSearch}>
          <label>
            Find by Zip Code:
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Search</button>
        </form>
        <label>
          Filter by Item Type:
          <select value={selectedItemType} onChange={handleItemTypeChange}>
            <option value="">All</option>
            <option value="clothes">Clothes</option>
            <option value="toys">Toys</option>
            <option value="books">Books</option>
            <option value="food">Food</option>
          </select>
        </label>
      </div>
      <div>
        {/* Display donation locations based on selectedItemType */}
        {selectedItemType && (
          <div>
            <h3>Donation Locations</h3>
            <ul>
              {donationLocations
                .filter((location) => location.itemType === selectedItemType)
                .map((location) => (
                  <li key={location.id}>{location.name}</li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <h3>Donate Now</h3>
        {clientSecret ? (
          <form action="/pay" method="POST">
            <input type="hidden" name="clientSecret" value={clientSecret} />
            <button type="submit">Pay Now</button>
          </form>
        ) : (
          <form onSubmit={handleDonation}>
            <input
              type="number"
              placeholder="Enter donation amount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              required
            />
            <button type="submit">Donate</button>
          </form>
        )}
        {paymentError && <p>{paymentError}</p>}
      </div>
    </div>
  );
};

export default Donations;
