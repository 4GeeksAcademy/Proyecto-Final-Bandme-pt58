import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import PostsCard from "../components/PostsCards.jsx";
import { MusicSearch } from "../components/MusicSearch.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();
	const [posts, setPosts] = useState([]);

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}
		}
		const loadPosts = async () => {
			try {
				const backendUrl = import.meta.env.VITE_BACKEND_URL;
				const response = await fetch(`${backendUrl}/api/feed_posts`);
				const data = await response.json();

				if (response.ok) setPosts(data);
			} catch (error) {
				console.error("Error loading posts:", error);
			}
		};

		useEffect(() => {
			loadMessage();
			loadPosts();
		}, [])

		return (
			<div className="container py-5 ">
				<h2 className="text-center mb-4">Latest Posts</h2>
				<div className="row justify-content-center">

					{posts.length > 0 ? (
						posts.map((post, index) => (
							<PostsCard
								key={post.post_id}
								image={post.image_url}
								title={`Post by user ${post.user_id}`}
								text={post.content_text}
								userName={post.author_username}
								userEmail={post.author_email}
								authorId={post.author_id}
							/>
						))
					) : (
						<p className="text-center">No posts yet</p>
					)}
				</div>

				<MusicSearch />
			</div>
		);
	};