export default function PricingCard({ title, price, features }) {
    return (
        <div className="card" style={{  width: "18rem"  }}>
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                <ul className="list-unstyled mt-3">
                    {features.map((f,i) => (
                        <li key={i}>✅ {f}</li>
                    ))}
                </ul>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    )
}