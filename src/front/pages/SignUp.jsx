import { Link } from "react-router-dom";

export const SignUp = () => {
	return (
		<>
			<nav className="bg-dark text-light text-center py-2 mt-auto">
				<div className="container-fluid">
					<h1 className="navbar-brand text-center w-100 h1">BandMe</h1>
				</div>
			</nav>
			<div>
				<p className="text-center mt-3"><b>What kind of account would you like?</b></p>
			</div>

			<div className="container mt-4">
				<form className="row g-3">
					<div className="col-md-12">
						<label htmlFor="userName" className="form-label">
							User name:
						</label>
						<input
							type="text"
							className="form-control"
							id="userName"
						/>
					</div>

					<div className="col-md-12">
						<label htmlFor="inputEmail" className="form-label">
							Email:
						</label>
						<input
							type="email"
							className="form-control"
							id="inputEmail"
						/>
					</div>

					<div className="col-md-12">
						<label htmlFor="inputPassword" className="form-label">
							Password:
						</label>
						<input
							type="password"
							className="form-control"
							id="inputPassword"
						/>
					</div>
					<div className="col-md-12">
						<label for="role" className="form-label">Role:</label>
						<select id="role" className="form-select">
							<option selected>Choose...</option>
							<option>Musician</option>
							<option>Band</option>
							<option>Industry</option>
						</select>
					</div>
					<div className="col-12">
						<button type="submit" className="btn btn-secondary w-100">
							Sign up
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
