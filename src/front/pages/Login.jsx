import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});

	const navigate = useNavigate();
	const { dispatch } = useGlobalReducer();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			const resp = await fetch(`${backendUrl}/api/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData)
			});

			if (!resp.ok) {
				const err = await resp.json();
				alert(err.message || "Login failed");
				return;
			}

			const data = await resp.json();

			// Guardar en el store global
			dispatch({
				type: "login",
				payload: { user: data.user, token: data.token }
			});

			navigate("/");

		} catch (error) {
			console.error("Login error:", error);
			alert("Login failed");
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6">
					<div className="card">
						<div className="card-body">
							<h2 className="text-center mb-4">Login</h2>

							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<input
										id="email"
										type="email"
										className="form-control"
										placeholder="Email"
										onChange={handleChange}
										required
									/>
								</div>

								<div className="mb-3">
									<input
										id="password"
										type="password"
										className="form-control"
										placeholder="Password"
										onChange={handleChange}
										required
									/>
								</div>

								<button type="submit" className="btn btn-primary w-100">
									Login
								</button>
							</form>

							<p className="text-center mt-3">
								Don't have an account? <Link to="/signup">Sign up</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
