import { useState } from "react";
import { UploadImg } from "./UploadImg";

export default function PostCreation({ userId, onPostCreated,  }) {   //postId
    const [text, setText] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [publishHome, setPublishHome] = useState(false)

    const handleSubmit = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/feed_posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content_text: text,
                    user_id: userId,
                    publish_home: publishHome,
                    image_url: imgUrl,
                }),
            });

            if (response.ok) {
                
                setText("");
                setImgUrl("");
                setPublishHome(false);

                
                if (onPostCreated) {
                    onPostCreated(); 
                }
                
                console.log("¡Post creado y lista actualizada!");
            }
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };


    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <h5 className="card-title">Create a new Post</h5>
                <textarea
                    className="form-control mb-3"
                    placeholder="What would you like to share?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="3"
                />
                <UploadImg imgUrl={imgUrl} setImgUrl={setImgUrl} />

                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={publishHome}
                        onChange={(e) => setPublishHome(e.target.checked)}
                        id="publishHomeCheck"
                    />
                    <label className="form-check-label" htmlFor="publishHomeCheck">
                        Publish on Bandme's Home
                    </label>
                </div>

                <button className="btn btn-primary" onClick={handleSubmit}>
                    Publish
                </button>
            </div>
        </div>
    );
}