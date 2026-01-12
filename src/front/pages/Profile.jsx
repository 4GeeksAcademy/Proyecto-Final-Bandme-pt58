import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UploadImg } from "../components/UploadImg";
import PostCreation from "../components/PostCreation";

export const Profile = () => {
  const { profile_id } = useParams();
  const [profile, setProfile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null)

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!profile_id) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/user_profiles/${profile_id}`);
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [profile_id, backendUrl]);

  if (!profile) {
    return <h2 className="text-center mt-5">Loading profile...</h2>;
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", profile_id);

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
    <div className="container">

      <div className="row">
        <div className="col-md-4 text-start">
          <UploadImg imgUrl={imgUrl} setImgUrl={setImgUrl} />
          <img
            src={profile.profile_image_url}
            className="mb-3 rounded-circle"
            width="300px"
            height="300px"
          />

          <div className="d-flex-justify-content-center mt-2  gap-2">
            <button className="btn btn-secondary me-2">Follow</button>
            <button className="btn btn-secondary">  Message</button>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h1 className="card-title">{profile.display_name}</h1>
            <h4 className="text muted">{profile.username}</h4>
            <p className="card-text">{profile.bio}</p>
          </div>

          <div className="d-flex gap-4 me-auto">
            <div className="text-center">
              <h5>{profile.tracks_count}</h5>
              <small>Tracks</small>
            </div>
            <div className="text-center">
              <h5>{profile.followers_count}</h5>
              <small>Followers</small>
            </div>
            <div className="text-center">
              <h5>{profile.following_count}</h5>
              <small>Following</small>
            </div>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs d-flex justify-content-center mt-4">
        <li className="nav-item">
          <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#music">
            <i className="fa-solid fa-music fa-2x"></i>
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#photos">
            <i className="fa-solid fa-camera fa-2x"></i>
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#videos">
            <i className="fa-solid fa-video fa-2x"></i>
          </button>
        </li>
      </ul>


      <div className="tab-content mt-4">


        <div className="tab-pane fade show active text-center" id="music">
          <img
            src="https://i.pinimg.com/1200x/d6/c2/5a/d6c25a342c1ca5558f269001e0126667.jpg"
            width="500"
            height="700"
            alt="music"
          />
        </div>


        <div className="tab-pane fade" id="photos">
          <div className="row mt-3">
            <div className="col">
              <img className="w-100" src="https://i.pinimg.com/1200x/6f/3c/7a/6f3c7ab1042a04409d8550403a3636c3.jpg" />
            </div>
            <div className="col">
              <img className="w-100" src="https://i.pinimg.com/1200x/8e/c5/cd/8ec5cdd3701d4e7259c421585c8483dd.jpg" />
            </div>
            <div className="col">
              <img className="w-100" src="https://i.pinimg.com/1200x/7a/3c/2d/7a3c2d28678938db3f8c4696cdf2f305.jpg" />
            </div>
          </div>
        </div>


        <div className="tab-pane fade" id="videos">
          <div className="row mt-3">
            <div className="col">
              <iframe
                width="100%"
                height="250"
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                allowFullScreen
              ></iframe>
            </div>
            <div className="col">
              <iframe
                width="100%"
                height="250"
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                allowFullScreen
              ></iframe>
            </div>
            <div className="col">
              <iframe
                width="100%"
                height="250"
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

      </div>


      <div className="modal fade" id="messageModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Message</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <textarea className="form-control" placeholder="Write a message..."></textarea>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-primary">Send</button>
            </div>
          </div>
        </div>
      </div>

      //Modal CD

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
        <div className="modal-dialog modal-lg"> {/* modal-lg for more space */}
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create a New Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">

              <PostCreation userId={profile_id} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
