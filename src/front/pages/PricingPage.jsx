import PostCreation from "../components/PostCreation";
import PricingCard from "../components/PricingCard";

export default function PricingPage() {
    return (

        <>
        <PostCreation />
        <div className="container py-5 text-light bg-dark">
            <h2 className="text-center mb-4">No hassle membership pricing</h2>
            <p className="text-center mb-5">Choose the plan that fits your needs</p>

            <div className="row">
                <PricingCard
                    title="Free"
                    price="$0"
                    features={[
                        "Limited Posts",
                        "Endless Networking Possibilities"
                    ]}
                />
                <PricingCard
                    title="Basic"
                    price="$6"
                    features={[
                        "Limited Discounts",
                        "Unlimited Posts",
                        "Endless Networking Possibilities"
                    ]}
                />
                <PricingCard
                    title="Standard"
                    price="$12"
                    features={[
                        "Greater Discounts",
                        "Unlimited Posts",
                        "Endless Networking Possibilities",
                        "Highlithed Posts for 24 hours"
                    ]}
                />

                <PricingCard
                    title="Professional"
                    price="$18"
                    features={[
                        "Full Range Discounts",
                        "Unlimited Posts",
                        "Endless Networking Possibilities",
                        "Highlithed Posts for 72 hours"
                    ]}
                />
            </div>
        </div>
        </>
    )
}