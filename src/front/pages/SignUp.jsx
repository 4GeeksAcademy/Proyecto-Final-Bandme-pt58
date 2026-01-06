import { useState } from "react";
import { Profile } from "./Profile";
import {useNavigate} from "react-router-dom";


export const SignUp = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password_hash: "",
		role: ""
	});

	const navigate = useNavigate()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData)
try{
	    const backendUrl= import.meta.env.VITE_BACKEND_URL;
		 const resp = await fetch(`${backendUrl}/api/users`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData)
		});

if (!resp.ok){
            const err = await resp.json()
            alert (err.message || "signup failed" )
            return
        }
		
		if (!user.profile_id) {
  navigate(`/create-profile?user_id=${user.user_id}`);
}

        alert ("Signup Successful, Please login")
        navigate("/login") 


    } catch (error) {
        console.error("signup error:", error)
        alert ("signup failed")
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
						value={formData.username}
						className="form-control"
						placeholder="Username"
						onChange={handleChange}
					/>

					<input
						id="email"
						value={formData.email}
						type="email"
						className="form-control"
						placeholder="Email"
						onChange={handleChange}
					/>

					<input
						id="password_hash"
						value={formData.password_hash}
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
						<option value="enterprise">Enterprise</option>
					</select>

					<button type="submit" className="btn btn-secondary w-100">
						Sign up
					</button>
				</form>
			</div>
		</>
	);
};

