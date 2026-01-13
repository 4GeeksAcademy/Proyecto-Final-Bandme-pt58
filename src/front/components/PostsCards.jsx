import { EditPostModal } from "./EditPostModal";

export default function PostsCard({ post_id, image, text, userEmail, userName, onDelete, showDelete }) {
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post")) {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${backendUrl}/api/feed_posts/${post_id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    onDelete();
                }
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };



    return (
        <div className="col-md-4 mb-4 d-flex justify-content-center">
            <div className="card border border-secondary shadow h-100" style={{ width: "18rem" }}>

                {showDelete && (
                    <div className="position-absolute" style={{ top: "5px", right: "5px", zIndex: 10 }}>

                        <button
                            className="btn btn-sm btn-secondary me-1"
                            data-bs-toggle="modal"
                            data-bs-target={`#editModal-${post_id}`}
                        >
                            <i className="fa-solid fa-pen"></i>
                        </button>

                        <button onClick={handleDelete} className="btn btn-sm btn-danger">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                )}

                {showDelete && (
                    <EditPostModal
                        post={{ post_id, text }}
                        onPostUpdated={onDelete}
                    />
                )}
                {image && (
                    <img
                        src={image}
                        className="card-img-top"
                        alt="Post"
                        style={{ height: "200px", objectFit: "cover" }}
                    />
                )}

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">Posted by: {userName}</h5>
                    <p className="card-text flex-grow-1">{text}</p>


                    <a
                        href={`mailto:${userEmail}?subject=Reach out from Bandme&body=Hi ${userName}, I would like to get in touch with you in regard to your Post.`}
                        className="btn btn-outline-primary mt-auto"
                    >
                        <i className="fa-regular fa-envelope me-2"></i>
                        Contact the author
                    </a>
                </div>
            </div>
        </div>
    )
}
