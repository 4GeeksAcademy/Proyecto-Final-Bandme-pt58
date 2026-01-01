import React, { useEffect, useState } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const [newPost, setNewPost] = useState("");
	const [loading, setLoading] = useState(false);
	const backendUrl = import.meta.env.VITE_BACKEND_URL;

	const loadPosts = async () => {
		try {
			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined");
			const response = await fetch(`${backendUrl}/api/feed_posts`);
			if (response.ok) {
				const data = await response.json();
				dispatch({ type: "set_posts", payload: data });
			}
		} catch (error) {
			console.error("Error cargando posts:", error);
		}
	};

	const loadMessage = async () => {
		try {
			const response = await fetch(`${backendUrl}/api/hello`);
			const data = await response.json();
			if (response.ok) {
				dispatch({ type: "set_hello", payload: data.message });
			}
		} catch (error) {
			console.error("Error cargando mensaje:", error);
		}
	};

	useEffect(() => {
		loadPosts();
		loadMessage();
	}, []);

	const handleCreatePost = async (e) => {
		e.preventDefault();
		if (!newPost.trim() || !store.currentUser) return;

		setLoading(true);
		try {
			const response = await fetch(`${backendUrl}/api/feed_posts/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					user_id: store.currentUser.user_id,
					content_text: newPost,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				dispatch({ type: "add_post", payload: data.post });
				setNewPost("");
			} else {
				alert("Error al crear post");
			}
		} catch (error) {
			console.error("Error creando post:", error);
			alert("Error al crear post");
		}
		setLoading(false);
	};

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-md-8">
					{store.currentUser ? (
						<div className="card mb-4">
							<div className="card-body">
								<h5>Hola, {store.currentUser.username}!</h5>
								<form onSubmit={handleCreatePost}>
									<textarea
										className="form-control mb-2"
										rows="3"
										placeholder="¿Qué estás pensando?"
										value={newPost}
										onChange={(e) => setNewPost(e.target.value)}
									/>
									<button
										type="submit"
										className="btn btn-primary"
										disabled={loading || !newPost.trim()}
									>
										{loading ? "Publicando..." : "Publicar"}
									</button>
								</form>
							</div>
						</div>
					) : (
						<div className="alert alert-info text-center">
							<a href="/login">Inicia sesión</a> para crear posts
						</div>
					)}

					<h4>Feed</h4>
					{store.posts && store.posts.length > 0 ? (
						store.posts.map((post) => (
							<div key={post.post_id} className="card mb-3">
								<div className="card-body">
									<h6 className="card-subtitle mb-2 text-muted">
										Usuario #{post.user_id} -{" "}
										{new Date(post.created_at).toLocaleString()}
									</h6>
									<p className="card-text">{post.content_text}</p>
								</div>
							</div>
						))
					) : (
						<p className="text-muted">No hay posts todavía. ¡Sé el primero!</p>
					)}
				</div>
			</div>
		</div>
	);
};