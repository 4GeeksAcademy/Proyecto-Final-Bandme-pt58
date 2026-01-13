import { useRef, useState } from "react"; 

export default function UploadMediaModal({ isOpen, onClose, user, onSendMessage }) { 
  const fileInputRef = useRef(null); 
  const [message, setMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 

if (!isOpen || !user) return null; 

const handleButtonClick = () => { fileInputRef.current.click(); }; 

const uploadToCloudinary = async (file) => { const formData = new FormData(); 
  formData.append("file", file); formData.append( "upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ); 

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
 
const response = await fetch( 
 `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, 
 { 
   method: "POST", 
   body: formData, 
 } 
); 
 
if (!response.ok) throw new Error("Error al subir archivo"); 
 
return response.json(); 
 

}; 

const handleFileChange = async (e) => { const file = e.target.files[0]; if (!file) return; 

try { 
 setLoading(true); 
 const uploadResult = await uploadToCloudinary(file); 
 
 onSendMessage({ 
   to: user, 
   text: message, 
   mediaUrl: uploadResult.secure_url, 
   mediaType: uploadResult.resource_type, 
 }); 
 
 setMessage(""); 
 onClose(); 
} catch (error) { 
 console.error(error); 
 alert("Error al subir el archivo"); 
} finally { 
 setLoading(false); 
} 
 

}; 

return ( <>  

<div className="modal fade show d-block" tabIndex="-1"> 
   <div className="modal-dialog modal-dialog-centered"> 
     <div className="modal-content"> 
 
        
       <div className="modal-header"> 
         <h5 className="modal-title">Mensaje nuevo</h5> 
         <button className="btn-close" onClick={onClose}></button> 
       </div> 
 
       
       <div className="modal-body"> 
        <div className="mb-2"> 
           <strong>Para:</strong>{" "} 
           <span className="text-primary">{user.name}</span> 
         </div> 
 
         <textarea 
           className="form-control mb-3" 
           rows="3" 
           placeholder="Escribe tu mensaje..." 
           value={message} 
           onChange={(e) => setMessage(e.target.value)} 
         /> 
 
         <button 
           className="btn btn-primary w-100" 
           onClick={handleButtonClick} 
           disabled={loading} 
         > 
            
         </button> 
 
         <input 
           ref={fileInputRef} 
           type="file" 
           accept="image/*,video/*" 
           hidden 
           onChange={handleFileChange} 
         /> 
       </div> 
 
       
       <div className="modal-footer"> 
         <button 
           className="btn btn-secondary" 
           onClick={onClose} 
           disabled={loading} 
         > 
           Cancelar 
         </button> 
       </div> 
 
     </div> 
   </div> 
 </div> 
</> 
 

); }9