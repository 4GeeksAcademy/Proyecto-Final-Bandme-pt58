import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const { profile_id } = useParams();
  const [profile, setProfile] = useState(null);
  



  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
      fetch(`${backendUrl}/api/user_profiles/${profile_id}`)
      .then(resp => resp.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, [profile_id]);


  if (!profile) {
    return <h2 className="text-center mt-5">Loading profile...</h2>;
  }

  return (
    <div className="mb-3">

      <div className="row g-6">
        <div className="col-md-5 mt-5 text-center">
          <img
            src={profile.profile_image_url}
            className="mt-3 rounded-circle"
            alt="profile"
            width="300px"
            height="300px"
          />

          <h1 className="mt-3">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star-half"></i>
            <i className="fa-regular fa-star"></i>
          </h1>

          <p className="d-inline-flex gap-2">
            <button className="btn btn-primary">Follow</button>

            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#messageModal"
            >
              Message
            </button>
          </p>
        </div>

        <div className="col-md-5 mt-5">
          <div className="card-body">
            <h1 className="card-title">{profile.display_name}</h1>
            <h4>@user_{profile.user_id}</h4>
            <p className="card-text">{profile.bio}</p>
            <p><strong>Location:</strong> {profile.location}</p>
          </div>

          <p className="d-inline-flex gap-2">
            <button className="btn btn-primary">Tracks</button>
            <button className="btn btn-primary">Followers</button>
            <button className="btn btn-primary">Following</button>
          </p>
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

    </div>
  );
};
