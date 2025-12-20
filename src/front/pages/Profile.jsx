import { useFetcher } from "react-router-dom";
import {useEffect} from 'react';
export const Profile = () => {
  fetch

  return (
    <div className=" mb-3" >

      <div className="row g-6">
        <div className="col-md-5 mt-5 justify-content-center text-center">
          <img src="https://i.pinimg.com/1200x/ac/ef/7a/acef7a10207e7d98a43b994e463afa27.jpg" className="mt-3 rounded-circle" alt="..." width="300px" height="300px" />
          <h1>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star-half"></i>
            <i className="fa-regular fa-star"></i>
          </h1>
          <p className="d-inline-flex gap-1">
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Folow</button>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Message</button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">

                    <div class="modal-title fs-5" id="exampleModalLabel">
                      <div class="d-flex flex-row align-items-center gap-2 justify-content-end me-2">
                        <h1 class="fs-5 mb-0">Message</h1>
                        <i class="fa-solid fa-phone-volume"></i>
                        <i class="fa-solid fa-video"></i>
                      </div>

                      <div class="d-flex flex-row justify-content-between align-items-center mb-2">
                        <div class="d-flex flex-row align-items-center">
                          <img class="border rounded-circle profile-img" src="https://i.pinimg.com/200x/ac/ef/7a/acef7a10207e7d98a43b994e463afa27.jpg" />
                          <h1 class="fs-5 ms-2 mb-0">@Richar_navarromusic</h1>
                        </div>
                      </div>
                    </div>

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <textarea class="form-control" id="message-text"></textarea>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Send <i class="fa-solid fa-paper-plane"></i></button>
                  </div>
                </div>
              </div>
            </div>

          </p>
        </div>

        <div className="col-md-5 mt-5">
          <div className="card-body">
            <h1 className="card-title">Richar Navarro</h1>
            <h4>@Richar_navarromusic.</h4>
            <p className="card-text">Creating melodies that tell stories and always searching for a sound that connects with the heart of those who listen.</p>
          </div>
          <p className="d-inline-flex gap-1">
            <a className="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">305 Tracks</a>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">120K Followers</button>
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">416 Following</button>
          </p>
        </div>
      </div>

      <ul className="nav nav-tabs nav-link active d-flex justify-content-center align-items-center" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true"><h1><i className="fa-solid fa-music"></i></h1></button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false"><h1><i className="fa-solid fa-camera"></i></h1></button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false"><h1><i className="fa-solid fa-video"></i></h1></button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
          <p>
            <img src="https://i.pinimg.com/1200x/d6/c2/5a/d6c25a342c1ca5558f269001e0126667.jpg" width="500px" height="800px" />
          </p>
        </div>

        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab"
              tabIndex="0">
              <div className="row align-items-start mt-4">
                <div className="col">
                  <img className="w-100 h-100" src="https://i.pinimg.com/1200x/6f/3c/7a/6f3c7ab1042a04409d8550403a3636c3.jpg" />
                </div>
                <div className="col">
                  <img className="w-100 h-100" src="https://i.pinimg.com/1200x/8e/c5/cd/8ec5cdd3701d4e7259c421585c8483dd.jpg" />
                </div>
                <div className="col">
                  <img className="w-100 h-100" src="https://i.pinimg.com/1200x/7a/3c/2d/7a3c2d28678938db3f8c4696cdf2f305.jpg" />
                </div>
              </div>
              <div className="row align-items-start mt-4">
                <div className="col">
                  <img className="w-100 h-100" src="https://i.pinimg.com/736x/a6/0d/97/a60d97a4fb92090dc1378f05a111540f.jpg" />
                </div>
                <div className="col">
                  <img className="w-100 h-100" src="https://i.pinimg.com/1200x/54/4f/ec/544feca5e0fd04d8256a04e7f8b1f086.jpg" />
                </div>
                <div className="col">
                  <img className="w-100 h-100" src="https://i.pinimg.com/1200x/5e/55/b2/5e55b2550d11ba39c0ffe086973a997f.jpg" />
                </div>
              </div>
              <div className="row align-items-start mt-4">
                <div className="col">
                  <img className="w-100 h-100" src="https://i.pinimg.com/736x/e4/a0/14/e4a0146767a41cf00bbaf5774230bbd9.jpg" />
                </div>
                <div className="col">
                  <img className="w-100 h-100" src="https://i.pinimg.com/1200x/fa/12/3e/fa123e12b1c3255e035e8b7064fa29b6.jpg" />
                </div>
                <div className="col">
                  <img className="w-100 h-100" src="https://i.pinimg.com/736x/db/ae/c0/dbaec05fc8378048d85d681b19ab823a.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
          <div className="row align-items-start mt-4">
            <div className="col">

              <iframe
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                width="100%"
                height="100%"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
                referrerpolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="col">
              <iframe
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                width="100%"
                height="100%"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
                referrerpolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="col">
              <iframe
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                width="100%"
                height="100%"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
                referrerpolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
          <div className="row align-items-start mt-4">
            <div className="col">
              <iframe
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                width="100%"
                height="100%"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
                referrerpolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="col">
              <iframe
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                width="100%"
                height="100%"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
                referrerpolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="col">
              <iframe
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                width="100%"
                height="100%"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
                referrerpolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
          <div className="row align-items-start mt-4">
            <div className="col">
              <iframe
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                width="100%"
                height="100%"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
                referrerpolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="col">
              <iframe
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                width="100%"
                height="100%"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
                referrerpolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="col">
              <iframe
                src="https://www.youtube.com/embed/3ssL8vx7Xhg"
                width="100%"
                height="100%"
                allowFullScreen={true}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="rounded-lg"
                referrerpolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

      </div>


    

      function Profile() {
        useEffect(() => {
          const initMap = () => {
            const chapinero = { lat: 4.6486, lng: -74.0570 };
            const map = new window.google.maps.Map(document.getElementById("map"), {
              zoom: 14,
              center: chapinero,
            });
          };

          if (!window.google || !window.google.maps) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD-H5isf1jqQb0iaANiz3t8nv9KRwBsTmk&callback=initMap`;
            script.async = true;
            window.initMap = initMap;
            document.head.appendChild(script);
          } else {
            initMap();
          }
        }, [])};

      return (
      <div className="container mt-4">
        <h2 className="mb-3">Mapa de Chapinero</h2>
        <div
          id="map"
          style={{
            height: "400px",
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        ></div>
      </div>
      );


    










    </div>
  );
};

