import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch({ type: "logout" }); 
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">BANDME</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">HOME</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">COMMUNITY</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">ABOUT US</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">LIBRARY</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">PRICING</Link>
            </li>

            
            {token && store.currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to={`/profile/${store.currentUser.id}`}>
                PROFILE
                </Link>
              </li>
            )}
          </ul>

          
          <ul className="navbar-nav ms-auto">
            {!token ? (
              
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/signup">Sign up</Link>
                </li>
              </>
            ) : !store.currentUser ? (
              
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/login">Login</Link>
              </li>
            ) : (
              
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleSignout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};