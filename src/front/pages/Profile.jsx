import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UploadImg } from "../components/UploadImg";
import PostCreation from "../components/PostCreation";
import PostsCard from "../components/PostsCards.jsx";

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

  useEffect(() => {
    if (!user_id) return;

    const fetchProfile = async () => {
      const res = await fetch(`${backendUrl}/api/users/${user_id}`);
      const data = await res.json();
      setProfile(data);
    };

    fetchProfile();
    loadUserPosts();
  }, [user_id]);

  if (!profile) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-4 text-start">
          <img
            src={profile?.profile_image_url || "https://cdn-icons-png.flaticon.com/512/9187/9187604.png"}
            className="mb-3 rounded-circle"
            width="200px"
            height="200px"
            style={{ objectFit: "cover" }}
          />
          <div>
            <small><i className="fa-solid fa-pen"></i> Edit your profile image</small>
            <UploadImg imgUrl={imgUrl} setImgUrl={setImgUrl} />
          </div>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h4 className="text-muted">Username: {profile.username}</h4>
            <h4 className="text-muted"><i className="fa-solid fa-envelope"></i> {profile.email}</h4>
            <h4 className="text-muted">Role: {profile.role}</h4>
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

      <h3 className="mb-4 text-center">Mis Publicaciones</h3>
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
            />
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted italic">Este usuario aún no tiene publicaciones.</p>
          </div>
        )}
      </div>
    </div>
  );
};