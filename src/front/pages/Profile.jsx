import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UploadImg } from "../components/UploadImg";
import PostCreation from "../components/PostCreation";
import PostsCard from "../components/PostsCards.jsx";
import { ProfileForm } from "../components/ProfileForm.jsx"


export const Profile = () => {
  const { user_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [userPosts, setUserPosts] = useState([]);



 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadUserPosts = async () => {
    try {
      const resPosts = await fetch(`${backendUrl}/api/users/${user_id}/posts`);
      if (resPosts.ok) {
        const dataPosts = await resPosts.json();
        setUserPosts(dataPosts);
      }
    } catch (err) {
      console.error("Error al recargar posts:", err);
    }
  };


  const fetchProfile = async () => {
    try {

      const resUser = await fetch(`${backendUrl}/api/users/${user_id}`);
      const userData = await resUser.json();


      const resInfo = await fetch(`${backendUrl}/api/user_profiles/user/${user_id}`);

      if (resInfo.ok) {
        const infoData = await resInfo.json();


        setProfile({
          ...userData,
          profile: infoData
        });
      } else {

        setProfile({
          ...userData,
          profile: null
        });
      }
    } catch (error) {
      console.error("Error by uploading the data:", error);
    }
  };

  const handleProfileUpdate = () => {
    console.log("Updating the profile view...");
    fetchProfile();
  };


  const handleUpdate = async (url) => {
    try {
      const response = await fetch(`${backendUrl}/api/users/${user_id}`, {
        method: "PUT",
        body: JSON.stringify({ profile_image_url: url }),
        headers: { "Content-Type": "application/json" }
      });
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error("Error al cargar imagen:", error);
    }
  };
  useEffect(() => {
    if (user_id) {
      fetchProfile();
      loadUserPosts();
    }
  }, [user_id]);

  useEffect(() => {
    if (imgUrl) {
      handleUpdate(imgUrl);
    }
  }, [imgUrl]);


  if (!profile) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4 text-start">
          <img
            src={profile?.profile_image_url || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"}
            className="mb-3 rounded-circle"
            width="300px"
            height="300px"
            style={{ objectFit: "cover" }}
          />
          <div>
            <small><i className="fa-solid fa-pen"></i> Edit your profile image</small>
            <UploadImg imgUrl={imgUrl} setImgUrl={setImgUrl} />
          </div>


        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h4 className="text-muted text-uppercase">{profile.username}</h4>
            <h4 className="text-muted"><i className="fa-solid fa-envelope"></i> {profile.email}</h4>
            <h4 className="text-muted">{profile.role}</h4>

            {profile.profile ? (
              <div className="card shadow-sm border-0 mt-3" style={{ background: "#f8f9fa" }}>
                <div className="card-body">
                  <h5 className="border-bottom pb-2 text-primary">
                    <i className="fa-solid fa-id-card me-2"></i>Professional Information
                  </h5>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p><strong><i className="fa-solid fa-music text-secondary me-2"></i>Genre:</strong> {profile.profile.genre}</p>
                      <p><strong><i className="fa-solid fa-drum text-secondary me-2"></i>Instrument:</strong> {profile.profile.instrument}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong><i className="fa-solid fa-location-dot text-secondary me-2"></i>Location:</strong> {profile.profile.location}</p>
                      <p><strong><i className="fa-solid fa-calendar text-secondary me-2"></i>Founded year:</strong> {profile.profile.founded_year}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <strong>Bio:</strong>
                    <p className="text-muted small">{profile.profile.bio}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-light border-dashed mt-3 text-center">
                <p className="mb-2 text-muted">Your profile has not been created.</p>

              </div>
            )}
          </div>

          <div className="d-flex gap-2 mt-4">

           
            <div className="d-flex gap-2 mt-4">
              <button
                className={`btn ${profile.profile ? "btn-outline-primary" : "btn-outline-secondary"}`}
                data-bs-toggle="modal"
                data-bs-target="#editProfileModal"
              >
                <i className={`fa-solid ${profile.profile ? "fa-user-pen" : "fa-user-gear"} me-2`}></i>
                {profile.profile ? "Editar Perfil Profesional" : "Completar Perfil"}
              </button>
            </div>


          </div>
          <div className="modal fade" id="editProfileModal" tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Details of the Professional Profile</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <ProfileForm userId={user_id} onProfileCreated={handleProfileUpdate} initialData={profile.profile}/>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex gap-4 mt-3">
            <div className="text-center">15 <small>Followers</small></div>
            <div className="text-center">20 <small>Following</small></div>
          </div>

          <div className="mt-4">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#postCreationModal"
            >
              <i className="fa-solid fa-plus me-2"></i> Create Post
            </button>
          </div>
        </div>
      </div>


      <div className="modal fade" id="postCreationModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create a New Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">

              <PostCreation userId={user_id} onPostCreated={loadUserPosts} />
            </div>
          </div>
        </div>
      </div>

      <hr className="my-5" />

      <h3 className="mb-4 text-center">My Posts</h3>
      <div className="row justify-content-center">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <PostsCard
              key={post.post_id}
              post_id={post.post_id}
              image={post.image_url}
              text={post.content_text}
              userName={post.author_username}
              userEmail={post.author_email}
              onDelete={loadUserPosts}
              showDelete={true}
              authorId={post.author_id}
            />
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted italic">This user has no posts</p>
          </div>
        )}
      </div>
    </div>
    
  );
};