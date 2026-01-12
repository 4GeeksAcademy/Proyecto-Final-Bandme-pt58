import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleSignout = () => {
		dispatch({ type: "set_currentUser", payload: null });
		localStorage.removeItem("token");
		localStorage.removeItem("currentUser");
		actions.logout?.();
		navigate("/login");
	}
	return (
		<nav className="navbar navbar-dark bg-dark text-white">
			{store.currentUser ? (
				<nav className="navbar navbar-expand-lg bg-dark navbar-dark w-100">
					<div className="container-fluid">
						<a className="navbar-brand" href="#">BANDME</a>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
									<Link className="nav-link" to="/pricing">PRICING</Link>
								</li>
							</ul>
							<form className="d-flex" role="search">
								<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
								<button className="btn btn-outline-success" type="submit">Search</button>
							</form>
						</div>
					</div>
				</nav>
			) : (
				<nav className="navbar navbar-expand-lg bg-dark navbar-dark w-100">
					<div className="container-fluid">
						<a className="navbar-brand" href="#">BANDME</a>
						<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav me-auto mb-2 mb-lg-0">
								<li className="nav-item">
									<a className="nav-link active" aria-current="page" href="#">HOME</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">COMMUNITY</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">ABOUT US</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#">LIBRARY</a>
								</li>
							</ul>
							<form className="d-flex" role="search">
								<Link className="btn btn-outline-success" to="/login">LOGIN</Link>
								<Link className="btn btn-outline-primary ms-2" to="/signup">SIGN UP</Link>
							</form>
						</div>
					</div>
				</nav>
			)}
		</nav>
	);
};