import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
export const Navbar = () => {
	const { store } = useGlobalReducer()
	return (
		<nav className="navbar navbar-dark bg-dark text-white">
			{store.currentUser ?
				<nav class="navbar navbar-expand-lg bg-dark navbar-dark w-100">
					<div class="container-fluid">
						<a class="navbar-brand" href="#">BANDME</a>
						<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav me-auto mb-2 mb-lg-0">
								<li class="nav-item">
									<a class="nav-link active" aria-current="page" href="#">HOME</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#">COMMUNITY</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#">ABOUT US</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#">LIBRERY</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#"><img src="https://i.pinimg.com/736x/b1/40/cf/b140cf1ff6dfc4002d6ac79b12a40d92.jpg" className="mt-3 rounded-circle" alt="..." width="40px" height="40px" /></a>
								</li>

							</ul>
							<form class="d-flex" role="search">
								<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
								<button class="btn btn-outline-success" type="submit">Search</button>
							</form>
						</div>
					</div>
				</nav>
				 : 
				<nav class="navbar navbar-expand-lg bg-dark navbar-dark w-100">
					<div class="container-fluid">
						<a class="navbar-brand" href="#">BANDME</a>
						<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						<div class="collapse navbar-collapse" id="navbarSupportedContent">
							<ul class="navbar-nav me-auto mb-2 mb-lg-0">
								<li class="nav-item">
									<a class="nav-link active" aria-current="page" href="#">HOME</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#">COMMUNITY</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#">ABOUT US</a>
								</li>
								<li class="nav-item">
									<a class="nav-link" href="#">LIBRERY</a>
								</li>
							</ul>
							<form class="d-flex" role="search">
								<button class="btn btn-outline-success" type="submit">LOGIN</button>
							</form>
						</div>
					</div>
				</nav>
			 } 
		</nav>
	);
};