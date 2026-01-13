import React, { useState } from "react";

export const ProfileForm = ({ userId, onProfileCreated }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    user_id: userId,
    display_name: "",
    bio: "",
    genre: "",
    instrument: "",
    founded_year: "",
    enterprise_type: "",
    location: "",
    profile_image_url: "",
    website_url: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/api/user_profiles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("The profile has been succesfully updated!");
        onProfileCreated(data); // 
      } else {
        console.error("Error by creating the profile");
      }
    } catch (error) {
      console.error("Error on the request:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Music Alias</label>
        <input type="text" name="display_name" className="form-control" onChange={handleChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Location</label>
        <input type="text" name="location" className="form-control" onChange={handleChange} />
      </div>
      <div className="col-12">
        <label className="form-label">Bio</label>
        <textarea name="bio" className="form-control" rows="3" onChange={handleChange}></textarea>
      </div>
      <div className="col-md-4">
        <label className="form-label">Genre</label>
        <input type="text" name="genre" className="form-control" placeholder="Rock, Jazz, etc." onChange={handleChange} />
      </div>
      <div className="col-md-4">
        <label className="form-label">Instrument</label>
        <input type="text" name="instrument" className="form-control" onChange={handleChange} />
      </div>
      <div className="col-md-4">
        <label className="form-label">Year of founding</label>
        <input type="number" name="founded_year" className="form-control" onChange={handleChange} />
      </div>
      <div className="col-md-6">
        <label className="form-label">Type of enterprise (if applicable)</label>
        <input type="text" name="enterprise_type" className="form-control" onChange={handleChange} />
      </div>
      <div className="col-md-6">
        <label className="form-label">URL Sitio Web</label>
        <input type="url" name="website_url" className="form-control" onChange={handleChange} />
      </div>
      <div className="col-12 text-end mt-3">
        <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
          Save Profile Data
        </button>
      </div>
    </form>
  );
};