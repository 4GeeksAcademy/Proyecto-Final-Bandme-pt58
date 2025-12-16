import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
export const Navbar = () => {
	const { store } = useGlobalReducer()
	return (
		<nav className="navbar navbar-dark bg-dark">
			{store.currentUser ?  
			<h1>Navbar para el usuario conectado</h1>
			:
			<h1>Navbar para el usuario no registrado</h1>
		}
		</nav>
	);
};