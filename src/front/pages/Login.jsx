import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from  "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();
  const [formData, setFormData] = useState({
    email: "",
    password_hash: ""
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
       const backendUrl= import.meta.env.VITE_BACKEND_URL;
		   const resp = await fetch(`${backendUrl}/api/login`, {
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
      
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      const user = data.user;
      if (user?.profile_id) { navigate(/profile/`${user.profile_id}`); }
      else if (user?.user_id && !user.profile_id) { setError("Usuario sin perfil. Debes crear tu perfil primero."); }
      else { setError("Error inesperado del servidor");}

      dispatch({
      
        type: "login_success",
        payload: {
          token: data.token,
                    user: data.user
                }    
              });    
              
              navigate(`/profile/${resp.profile_id}`)
              
              
              
              
              
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
            <label htmlFor="password_hash" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password_hash"
              value={formData.password_hash}
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
