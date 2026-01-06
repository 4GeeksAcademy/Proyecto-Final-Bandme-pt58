export default function PostsCard ( {image, title, text} ){
    return(
        <div className="col-md-4 mb-4">
            <div className="card-h-100" style={{ width: "18rem" }}>
                <img src={image} className="card-img-top" alt={title}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                </div>
            </div>
        </div>
    )
}