import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from  "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const resp = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });


      if (resp.status === 404) {
        setError("Usuario no existe");
        return;
      }

      
      if (!resp.ok) {
        let errorMsg = "Error del servidor";
        try {
          const data = await resp.json();
          errorMsg = data.msg || errorMsg;
        } catch {
          errorMsg = `Error del servidor: ${resp.status}`;
        }
        setError(errorMsg);
        return;
      }

      const data = await resp.json();


      if (data.profile_id) {
        navigate(`/profile/${data.profile_id}`);
      } 
      
      else if (data.user_id && !data.profile_id) {
        setError("Usuario sin perfil. Debes crear tu perfil primero.");
      } 

      else {
        setError("Error inesperado del servidor");
      }

    } catch (err) {
      console.error("Error en fetch:", err);
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <>
    <nav className="bg-dark text-light text-center py-2">
				<h1>Login</h1>
			</nav>

      <div className="container mt-4">
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <div className="col-12 alert alert-danger">{error}</div>}

          <div className="col-12">
            <button type="submit" className="btn btn-secondary w-100">Login</button>
          </div>
        </form>
      </div>
      </>
  );
};
