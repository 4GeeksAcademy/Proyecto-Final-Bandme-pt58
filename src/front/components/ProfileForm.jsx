import React, { useState, useEffect } from "react";

export const ProfileForm = ({ userId, onProfileCreated, initialData }) => {
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

  // Si recibimos datos iniciales (edición), los cargamos en el estado
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        user_id: userId // Aseguramos que el ID de usuario se mantenga
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si tenemos initialData, usamos PUT y el profile_id, si no, POST
    const isEditing = initialData;
    const url = isEditing
      ? `${backendUrl}/api/user_profiles/${initialData.profile_id}`
      : `${backendUrl}/api/user_profiles`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(isEditing ? "¡Perfil actualizado!" : "¡Perfil creado!");
        onProfileCreated(); // Refresca la vista en Profile.jsx
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Nombre Artístico</label>
        <input type="text" name="display_name" value={formData.display_name} className="form-control" onChange={handleChange} required />
      </div>
      <div className="col-md-6">
        <label className="form-label">Ubicación</label>
        <input type="text" name="location" value={formData.location} className="form-control" onChange={handleChange} />
      </div>
      <div className="col-12">
        <label className="form-label">Biografía</label>
        <textarea name="bio" value={formData.bio} className="form-control" rows="3" onChange={handleChange}></textarea>
      </div>
      <div className="col-md-4">
        <label className="form-label">Género</label>
        <input type="text" name="genre" value={formData.genre} className="form-control" onChange={handleChange} />
      </div>
      <div className="col-md-4">
        <label className="form-label">Instrumento</label>
        <input type="text" name="instrument" value={formData.instrument} className="form-control" onChange={handleChange} />
      </div>
      <div className="col-md-4">
        <label className="form-label">Año de Inicio</label>
        <input type="number" name="founded_year" value={formData.founded_year} className="form-control" onChange={handleChange} />
      </div>
      <div className="col-12 text-end mt-3">
        <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
          {initialData ? "Actualizar Cambios" : "Guardar Datos de Perfil"}
        </button>
      </div>
    </form>
  );
};