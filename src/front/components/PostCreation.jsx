import { useState } from "react";
import { UploadImg } from "./UploadImg";

export default function PostCreation({ userId }) {
    const [text, setText] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [publishHome, setPublishHome] = useState(false);
    const [file, setFile] = useState(null);
    const [mediaId, setMediaId] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async () => {
        try {
           
            const postRes = await fetch(`${backendUrl}/api/feed_posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content_text: text,
                    user_id: userId,
                    publish_home: publishHome,
                }),
            });

            const postData = await postRes.json();
            const postId = postData.post.post_id;

            
            if (file) {
                const formData = new FormData();
                formData.append("post_id", postId);
                formData.append("file", file);

                const mediaRes = await fetch(
                    `${backendUrl}/api/feed_posts/mediafile`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const mediaData = await mediaRes.json();
                setMediaId(mediaData.media_id);
                setImgUrl(mediaData.file_url);
            }

            
            setText("");
            setFile(null);
            setPublishHome(false);

        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    
    const updateMedia = async (newFile) => {
        if (!mediaId) return;

        const formData = new FormData();
        formData.append("file", newFile);

        const res = await fetch(
            `${backendUrl}/api/feed_posts/mediafile/${mediaId}`,
            {
                method: "PUT",
                body: formData,
            }
        );

        const data = await res.json();
        setImgUrl(data.file_url);
    };

    
    const deleteMedia = async () => {
        if (!mediaId) return;

        await fetch(
            `${backendUrl}/api/feed_posts/mediafile/${mediaId}`,
            { method: "DELETE" }
        );

        setImgUrl("");
        setMediaId(null);
        setFile(null);
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

                <UploadImg
                    imgUrl={imgUrl}
                    setImgUrl={setImgUrl}
                />

                {/* PUT */}
                {mediaId && (
                    <>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => updateMedia(e.target.files[0])}
                        />

                        <button
                            className="btn btn-danger mt-2"
                            onClick={deleteMedia}
                        >
                            Delete media
                        </button>
                    </>
                )}

                <div className="form-check mb-3 mt-3">
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
