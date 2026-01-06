export default function TeamMemberCard({ photo, name, role, description }) {
    return (
        <div className="col-md-3 mb-4">
            <div className="card h-100" style={{ width: "18rem" }}>
                <img src={photo} className="card-img-top" alt={name} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{role}</h6>
                    <p className="card-text">{description}</p>
                </div>
            </div>
        </div>
    );
}