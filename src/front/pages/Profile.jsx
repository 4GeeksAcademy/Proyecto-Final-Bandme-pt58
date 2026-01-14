import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UploadImg } from "../components/UploadImg";
import PostCreation from "../components/PostCreation";

export const Profile = () => {
  const { user_id } = useParams();
  const [profile, setProfile] = useState();
  const [showForm, setShowForm] = useState(false);
  const [imgUrl, setImgUrl] = useState(null)
  const [formDato, setformDato] = useState({display_name: "",
        bio: "",
        genre: "",
        instrument: "",
        founded_year: "",
        enterprise_type: "",
        location: "",
        profile_image_url: "",
        website_url: ""   });
  
  
    const handleChange = (e) => {
  const { name, value } = e.target;
  setFormDato(prev => ({ ...prev, [name]: value }));
};



 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (!user_id) return;
    

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/users/${user_id}`);
        if (!response.ok) throw new Error("Usuario no encontrado");

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    

    fetchProfile();
  }, [user_id, backendUrl]);

  const postProfile = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/user_profile`, {
      method: "POST",
      headers: {
        "display_name": "",
        "bio": "",
        "genre": "",
        "instrument": "",
        "founded_year": "",
        "enterprise_type": "",
        "location": "",
        "profile_image_url": "",
        "website_url": ""   
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) throw new Error("Error al actualizar el usuario");

    const data = await response.json();
    setProfile(data); 
  } catch (err) {
    console.error(err);
  }
};

const deleteProfile = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/user_profile/${user_id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Error al eliminar el usuario");

   
    setProfile(null);
    console.log("Usuario eliminado");
  } catch (err) {
    console.error(err);
  }
};

  if (!profile) {
    return <h2 className="text-center mt-5">Loading profile...</h2>;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", user_id);

    try {
      const response = await fetch(`${backendUrl}/api/upload-profile-image`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();


      setProfile(prev => ({ ...prev, profile_image_url: data.profile_image_url }));
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };
  return (
    <>
  
    
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      
      
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="group relative px-8 py-4 bg-white text-purple-900 font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 text-lg"> Editar Perfil Artístico</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </button>
      )}

     
      {showForm && (
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-extrabold text-black tracking-tight">Mi Perfil</h2>
            <button 
              onClick={() => setShowForm(false)}
              className="text-white/50 hover:text-white transition-colors"
            >
              ✕ Cerrar
            </button>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="text-xs font-bold text-purple-300 uppercase ml-1">Empresa / Artista / Banda</label>
              <input type="text" name="display_name" onChange={handleChange} className="input-style" placeholder="Ej: Stellar Echoes" />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-purple-300 uppercase ml-1">Bio</label>
              <textarea name="bio" rows="2" onChange={handleChange} className="input-style" placeholder="Breve historia..." />
            </div>

            <div>
              <label className="text-xs font-bold text-purple-300 uppercase ml-1">Genre</label>
              <input type="text" name="genre" onChange={handleChange} className="input-style" placeholder="Rock Alternativo" />
            </div>

            <div>
              <label className="text-xs font-bold text-purple-300 uppercase ml-1">Instrument</label>
              <input type="text" name="instrument" onChange={handleChange} className="input-style" placeholder="Sintetizadores" />
            </div>

            <div>
              <label className="text-xs font-bold text-purple-300 uppercase ml-1">Founded Year</label>
              <input type="number" name="founded_year" onChange={handleChange} className="input-style" placeholder="2024" />
            </div>

            <div>
              <label className="text-xs font-bold text-purple-300 uppercase ml-1">Location</label>
              <input type="text" name="location" onChange={handleChange} className="input-style" placeholder="Madrid, ES" />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-purple-300 uppercase ml-1">Web Site</label>
              <input  name="website_url" onChange={handleChange} className="input-style" placeholder="https://..." />
            </div>

            <button type="submit" className="md:col-span-2 mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/40 transition-all hover:-translate-y-1" onClick={postProfile}>
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>

  



    
    <div className="container">

      <div className="row mt-5">
        <div className="col-md-4 text-start">
          {/* <UploadImg imgUrl={imgUrl} setImgUrl={setImgUrl} /> */}


          <img
            // src={profile.profile_image_url}
            src={profile?.profile_image_url || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"}
            className="mb-3 rounded-circle"
            width="200px"
            height="200px"
          />
          <div>
            <small> <i className="fa-solid fa-pen"></i> Edit your profile image </small>
            <UploadImg imgUrl={imgUrl} setImgUrl={setImgUrl} />

          </div>


        </div>

        <div className="col-md-8">
          <div className="card-body">
            {/* <h1 className="card-title">{profile.display_name}</h1> */}
            <h4 className="text muted">Username: {profile.username}</h4>
            <h4 className="text muted"><i className="fa-solid fa-envelope"></i> {profile.email}</h4>
            <h4 className="text muted">Role: {profile.role}</h4>
            {/* <p className="card-text">{profile.bio}</p> */}
          </div>

          <div className="d-flex gap-4 me-auto">
            <div className="text-center">
              {/* <h5>{profile.tracks_count}</h5> */}
              {/* <small>Tracks</small> */}
            </div>
            <div className="text-center">
              {/* <h5>{profile.followers_count}</h5> */} 15
              <small> Followers</small>
            </div>
            <div className="text-center">
              {/* <h5>{profile.following_count}</h5> */} 20
              <small> Following</small>
            </div>
          </div>
          <div className="d-flex-justify-content-center mt-2  gap-2">
            {/* <button className="btn btn-secondary me-2">Follow</button> */}
            {/* <button className="btn btn-secondary">  Message</button> */}
          </div>
        </div>


      </div>

 <div className="mt-3">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#postCreationModal"
        >
          Create Post
        </button>
      </div>


      <div className="modal fade" id="postCreationModal" tabIndex="-1">
        <div className="modal-dialog modal-lg"> 
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create a New Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">

              <PostCreation userId={user_id} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>



      

      
      

    </div>
    </>
  );
};