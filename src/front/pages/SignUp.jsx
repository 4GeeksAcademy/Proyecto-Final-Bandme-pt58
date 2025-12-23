import { useState } from "react";

export const SignUp = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		role: ""
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const resp = await fetch("/signup", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		});

		const data = await resp.json();

		if (resp.ok)
		{ 
		console.log("Perfil creado:", data);
		window.location.href = `/profile/${data.profile.profile_id}`;
		}else {console.error(data);

		}
	};

	return (
		<>
			<nav className="bg-dark text-light text-center py-2">
				<h1>BandMe</h1>
			</nav>

			<p className="text-center mt-3">
				<b>What kind of account would you like?</b>
			</p>

			<div className="container mt-4">
				<form className="row g-3" onSubmit={handleSubmit}>

					<input
						id="username"
						className="form-control"
						placeholder="Username"
						onChange={handleChange}
					/>

					<input
						id="email"
						type="email"
						className="form-control"
						placeholder="Email"
						onChange={handleChange}
					/>

					<input
						id="password"
						type="password"
						className="form-control"
						placeholder="Password"
						onChange={handleChange}
					/>

					<select
						id="role"
						className="form-select"
						onChange={handleChange}
					>
						<option value="">Choose...</option>
						<option value="musician">Musician</option>
						<option value="band">Band</option>
						<option value="industry">Industry</option>
					</select>

					<button className="btn btn-secondary w-100">
						Sign up
					</button>
				</form>
			</div>
		</>
	);
};
