import { useState } from "react"
export const UploadImg = ({ imgUrl, setImgUrl }) => {
    const [file, setFile] = useState(null)
    async function handleSubmit() {
        if (!file) return
        const formData = new FormData()
        formData.append("image", file)
        try {
            console.log(file)
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendUrl}/api/uploadimg`, {
                method: "POST",
                body: formData
            });
            if (!response.ok) {
            throw new Error("Error al subir imagen")
            }
            const data = await response.text()
            setImgUrl(data)
        } catch (error) {
            console.log("error al cargar imagen", error)
        }
    }
    return (
        <>
            <input type="file" accept="image/*" name="image" id="image" onChange={(e) => setFile(e.target.files[0])} />
            {imgUrl && <img src={imgUrl} alt="uploadimage" width={300} />}
            <input type="button" value="Enviar" onClick={handleSubmit} />
        </>
    )
}