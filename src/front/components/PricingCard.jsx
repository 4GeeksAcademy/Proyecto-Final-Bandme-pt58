export default function PricingCard({ title, price, features }) {
    return (
        <div className="col-md-3 mb-4">
            <div className="card h-100 text-dark" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                        {price} per user/month
                    </h6>

                    <ul className="list-unstyled mt-3">
                        {features.map((f, i) => (
                            <li key={i}>✅ {f}</li>
                        ))}
                    </ul>

                    <a href="#" className="card-link">Start Free Trial</a>
                    <a href="#" className="card-link">Sign up on this plan</a>


                </div>
            </div>
        </div>

    )
}