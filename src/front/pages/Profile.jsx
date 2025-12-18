export const Profile = () => {
  return (
    <div className=" mb-3" >
      <div className="row g-0">


        <div className="col-md-4">
          <img src="https://i.pinimg.com/736x/b1/40/cf/b140cf1ff6dfc4002d6ac79b12a40d92.jpg" className="img-fluid rounded-circle" alt="..." width="300px" height="300px" />
          <h1>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star-half"></i>
            <i class="fa-regular fa-star"></i>
          </h1>
          <p class="d-inline-flex gap-1">
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Folow</a>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">Message</button>
          </p>
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h1 className="card-title">Richar Navarro</h1>
            <h4>@Richar_navarromusic.</h4>
            <p className="card-text">Creating melodies that tell stories and always searching for a sound that connects with the heart of those who listen.</p>
          </div>
          <p class="d-inline-flex gap-1">
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">305 Tracks</a>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">120K Followers</button>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">416 Following</button>
          </p>
        </div>
      </div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active d-flex justify-content-center align-items-center" aria-current="page" href="#"><h1><i class="fa-solid fa-music"></i></h1></a>
          <p>
             <img src="https://i.pinimg.com/1200x/d6/c2/5a/d6c25a342c1ca5558f269001e0126667.jpg" width="500px" height="800px" />
          </p>
        </li>
        <li class="nav-item">
          <a class="nav-link active d-flex justify-content-center align-items-center" href="#"><h1><i class="fa-solid fa-camera"></i></h1></a>
           <p>
             <img src="https://i.pinimg.com/736x/14/97/f0/1497f0c6fff850ccc10d9f8afaad9b30.jpg" width="500px" height="800px" />
          </p>
        </li>
        <li class="nav-item">
          <a class="nav-link active d-flex justify-content-center align-items-center" href="#"><h1><i class="fa-solid fa-video"></i></h1></a>
          <p>
             <img src="https://i.pinimg.com/736x/3b/e5/3c/3be53c491d9bde99704505c5dfb72262.jpg" width="500px" height="800px" />
          </p>
        </li>
      </ul>
    </div>
  )



};
