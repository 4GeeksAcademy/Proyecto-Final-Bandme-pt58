export default function PostsCard({ image, text, userEmail, userName }) {
    return (
        <div className="col-md-4 mb-4 d-flex justify-content-center">
            <div className="card border border-secondary shadow h-100" style={{ width: "18rem" }}>
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
