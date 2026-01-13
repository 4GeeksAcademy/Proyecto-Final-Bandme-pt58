import { useState } from "react";
import { EditPostModal } from "./EditPostModal";

export default function PostsCard({ post_id, image, text, userEmail, userName, authorId, onDelete, showDelete }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [authorProfile, setAuthorProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleFlip = async () => {

        if (!isFlipped && !authorProfile && authorId) {
            setLoading(true);
            try {
                const response = await fetch(`${backendUrl}/api/user_profiles/user/${authorId}`);
                if (response.ok) {
                    const data = await response.json();
                    setAuthorProfile(data);
                }
            } catch (error) {
                console.error("Error fetching author profile:", error);
            } finally {
                setLoading(false);
            }
        }
        setIsFlipped(!isFlipped);
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const response = await fetch(`${backendUrl}/api/feed_posts/${post_id}`, {
                    method: "DELETE",
                });
                if (response.ok) onDelete();
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    return (
        <div className="col-md-4 mb-4 d-flex justify-content-center">
            <div className={`flip-card post-card-container ${isFlipped ? "flipped" : ""}`} style={{ width: "18rem", height: "400px" }} onClick={handleFlip}>
                <div className="flip-card-inner">


                    <div className="flip-card-front card border border-secondary shadow h-100">
                        {showDelete && (
                            <div className="position-absolute" style={{ top: "5px", right: "5px", zIndex: 10 }}>
                                <button className="btn btn-sm btn-secondary me-1" data-bs-toggle="modal" data-bs-target={`#editModal-${post_id}`} onClick={(e) => e.stopPropagation()}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button onClick={handleDelete} className="btn btn-sm btn-danger">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        )}
                        {image && <img src={image} className="card-img-top" alt="Post" style={{ height: "200px", objectFit: "cover" }} />}
                        <div className="card-body d-flex flex-column text-start">
                            <h5 className="card-title text-primary small ">Author: {userName}</h5>
                            <p className="card-text flex-grow-1 post-text-truncate" style={{ fontSize: "0.9rem" }}>{text}</p>
                            <small className="text-muted text-center mt-2 author-info-overlay">Click to see author info</small>
                        </div>
                    </div>


                    <div className="flip-card-back shadow">
                        <h5 className="text-primary border-bottom pb-2">About the Author</h5>
                        {loading ? (
                            <div className="spinner-border text-primary mx-auto" role="status"></div>
                        ) : authorProfile ? (
                            <div className="text-start">
                                <p className="mb-1 text-uppercase fw-bold">{userName}</p>
                                <p className="small mb-1"><strong>Instrument:</strong> {authorProfile.instrument}</p>
                                <p className="small mb-1"><strong>Genre:</strong> {authorProfile.genre}</p>
                                <p className="small mb-1"><strong>Location:</strong> {authorProfile.location}</p>
                                <hr className="my-2" />
                                <p className="small italic" style={{ maxHeight: "80px", overflowY: "auto" }}>{authorProfile.bio}</p>

                                <a href={`mailto:${userEmail}`} className="btn btn-sm btn-primary w-100 mt-2" onClick={(e) => e.stopPropagation()}>
                                    Contact
                                </a>
                            </div>
                        ) : (
                            <p className="text-muted small">This user has not completed his Professional Profile</p>
                        )}
                        <button className="btn btn-sm btn-link mt-auto text-decoration-none" onClick={handleFlip}>Back to post</button>
                    </div>
                </div>
            </div>


            {showDelete && <EditPostModal post={{ post_id, text }} onPostUpdated={onDelete} />}
        </div>
    );
}