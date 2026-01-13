import React, { useState } from "react";

export const EditPostModal = ({ post, onPostUpdated }) => {
    const [newText, setNewText] = useState(post.text);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleUpdate = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/feed_posts/${post.post_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content_text: newText }),
            });

            if (response.ok) {
                onPostUpdated(); // Refresca la lista en Profile
                // Cerrar modal manualmente si es necesario
                const modal = bootstrap.Modal.getInstance(document.getElementById(`editModal-${post.post_id}`));
                modal.hide();
            }
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <div className="modal fade" id={`editModal-${post.post_id}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar Publicación</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <textarea 
                            className="form-control" 
                            value={newText} 
                            onChange={(e) => setNewText(e.target.value)}
                            rows="4"
                        />
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={handleUpdate}>Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    );
};