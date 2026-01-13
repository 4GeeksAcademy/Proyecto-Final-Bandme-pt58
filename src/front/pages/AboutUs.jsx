import TeamMemberCard from "../components/TeamMemberCard";

export default function AboutUs() {
    const teamMembers = [
        {
            photo: "/lucas-calvo.jpg",
            name: "Lucas Calvo",
            role: "Co-founder / Musician / Full Stack Developer",
            description: "I am a programming student and also a musician. I have always been very close to both the creative world and the tech world. While learning to code, I realized that I could bring both together. That’s where the idea of creating a music-based application was born. An app designed to connect musicians with each other, to find opportunities, collaborate, and discover new projects. This project is my way of uniting those two worlds that represent me."
        },
        {
            photo: "/carlos-santeliz.jpg",
            name: "Carlos Santeliz",
            role: "Co-founder / Musician / Full Stack Developer",
            description: "I am a music lover — both a listener and a musician. Music has the power to move people. With Bandme, we wanted to create an app that allows music lovers and fans to be part of a community where they can share their experiences, knowledge, and overall passion for music. Our goal was an app where fans can enjoy listening to music while also being part of other users’ experiences. Because music is all about that: sharing. "
        },

        {
            photo: "/william-aguas.jpg",
            name: "William Aguas",
            role: "Co-founder / Musician / Full Stack Developer",
            description: "I started studying programming because I wanted to learn how to build things on my own and turn ideas into real projects. Music has always been an essential part of my life and a genuine way to connect with others. This application was born from combining technology and music, with the idea of creating a space where talent and people can connect. More than just an app, it’s a personal project that reflects what I enjoy doing, what I believe in, and where I want to grow."
        },

        {
            photo: "/david-jimenez.jpg",
            name: "David Jimenez",
            role: "Co-founder / Musician / Full Stack Developer",
            description: "Music has always been my greatest joy —  I live through the songs I hear. From headphones while on the road to live shows with friends, music shapes my memories. That’s why we imagined an app where listeners can connect, celebrate their favorite bands, and discover new sounds through others’ experiences. A place where fans feel part of something bigger. Because music is not just listening, it’s sharing the feeling."
        },

    ];

    return (
        <div className="container py-5 text-light bg-dark">
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