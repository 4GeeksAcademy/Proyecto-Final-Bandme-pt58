import TeamMemberCard from "../components/TeamMemberCard";

export default function AboutUs() {
    const teamMembers = [
        {
            photo: "/lucas-calvo.jpg",
            name: "Lucas Calvo",
            role: "Co-founder / Musician / Full Stack Developer",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },
        {
            photo: "/carlos-santeliz.jpg",
            name: "Carlos Santeliz",
            role: "Co-founder / Musician / Full Stack Developer",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },

        {
            photo: "/william-aguas.jpg",
            name: "William Aguas",
            role: "Co-founder / Musician / Full Stack Developer",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },

        {
            photo: "/david-jimenez.jpg",
            name: "David Jimenez",
            role: "Co-founder / Musician / Full Stack Developer",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        },

    ];

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Get to know our Team</h2>
            <div className="row justify-content-center">
                {teamMembers.map((member, index) => (
                    <TeamMemberCard
                        key={index}
                        photo={member.photo}
                        name={member.name}
                        role={member.role}
                        description={member.description}
                    />
                ))}
            </div>
        </div>
    );
}