import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const AdminHome = () => {
  const [testimonies, setTestimonies] = useState([
    { id: 1, name: "Anupa Sharma", testimony: "This platform changed my life!", rating: 5, donatedAmount: 1 },
    { id: 2, name: "Yana Bhandari", testimony: "I'm grateful for the opportunities provided by this organization.", rating: 5, donatedAmount: 1 }
  ]);

  const [editTestimonyData, setEditTestimonyData] = useState(null);
  const [manyMoreLinks, setManyMoreLinks] = useState([
    { id: 1, text: "Donations", link: "/donations" },
    { id: 2, text: "Volunteer", link: "/volunteer" },
    { id: 3, text: "HappyHour", link: "/happyHour" }
  ]);
  const [editManyMoreData, setEditManyMoreData] = useState(null);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star-icon" />);
    }
    return stars;
  };

  const handleEditTestimony = (testimony) => {
    setEditTestimonyData({ ...testimony });
  };

  const handleDeleteTestimony = (id) => {
    setTestimonies(testimonies.filter(testimony => testimony.id !== id));
  };

  const handleTestimonyChange = (e) => {
    const { name, value } = e.target;
    setEditTestimonyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateTestimony = (e) => {
    e.preventDefault();
    setTestimonies(testimonies.map(testimony => testimony.id === editTestimonyData.id ? editTestimonyData : testimony));
    setEditTestimonyData(null);
  };

  const handleEditManyMore = (link) => {
    setEditManyMoreData({ ...link });
  };

  const handleDeleteManyMore = (id) => {
    setManyMoreLinks(manyMoreLinks.filter(link => link.id !== id));
  };

  const handleManyMoreChange = (e) => {
    const { name, value } = e.target;
    setEditManyMoreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateManyMore = (e) => {
    e.preventDefault();
    setManyMoreLinks(manyMoreLinks.map(link => link.id === editManyMoreData.id ? editManyMoreData : link));
    setEditManyMoreData(null);
  };

  return (
    <div className="admin-home">
      <h2>Admin Home</h2>
      
      <div className="admin-section">
        <h3>Manage Testimonies</h3>
        {testimonies.map((testimony) => (
          <div key={testimony.id} className="admin-testimony">
            {editTestimonyData && editTestimonyData.id === testimony.id ? (
              <form onSubmit={handleUpdateTestimony}>
                <label>
                  Name:
                  <input type="text" name="name" value={editTestimonyData.name} onChange={handleTestimonyChange} required />
                </label>
                <label>
                  Testimony:
                  <textarea name="testimony" value={editTestimonyData.testimony} onChange={handleTestimonyChange} required />
                </label>
                <label>
                  Rating:
                  <select name="rating" value={editTestimonyData.rating} onChange={handleTestimonyChange}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>{rating}</option>
                    ))}
                  </select>
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditTestimonyData(null)}>Cancel</button>
              </form>
            ) : (
              <div>
                <p>{testimony.testimony}</p>
                <div className="rating">{renderStars(testimony.rating)}</div>
                <p>- {testimony.name}</p>
                <p>Subsidy: ${testimony.donatedAmount}</p>
                <button onClick={() => handleEditTestimony(testimony)}><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => handleDeleteTestimony(testimony.id)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="admin-section">
        <h3>Manage "Many More" Links</h3>
        {manyMoreLinks.map((link) => (
          <div key={link.id} className="admin-link">
            {editManyMoreData && editManyMoreData.id === link.id ? (
              <form onSubmit={handleUpdateManyMore}>
                <label>
                  Text:
                  <input type="text" name="text" value={editManyMoreData.text} onChange={handleManyMoreChange} required />
                </label>
                <label>
                  Link:
                  <input type="text" name="link" value={editManyMoreData.link} onChange={handleManyMoreChange} required />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setEditManyMoreData(null)}>Cancel</button>
              </form>
            ) : (
              <div>
                <p>{link.text}</p>
                <p>{link.link}</p>
                <button onClick={() => handleEditManyMore(link)}><FontAwesomeIcon icon={faEdit} /></button>
                <button onClick={() => handleDeleteManyMore(link.id)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
