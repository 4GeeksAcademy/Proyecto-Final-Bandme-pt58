import { useState } from "react";

export const UploadImg = ({ imgUrl, setImgUrl }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "TU_UPLOAD_PRESET");
    formData.append("resource_type", "auto");

    try {
      setUploading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setImgUrl(data.secure_url);

    } catch (err) {
      console.error("Error al subir archivo", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <label style={{ cursor: "pointer" }}>
        📎
        <input
          type="file"
          hidden
          accept="image/*,video/*"
          onChange={(e) => handleUpload(e.target.files[0])}
        />
      </label>

      {uploading && <span>Subiendo...</span>}

      {imgUrl && (
        imgUrl.includes("video") ? (
          <video src={imgUrl} controls width={300} />
        ) : (
          <img src={imgUrl} alt="preview" width={300} />
        )
      )}
    </>
  );
};
