import { useState, useEffect } from "react";
import { useParams } from "react-router";
import galleryService from "../services/GalleryService";

function AuthorGalleries() {
  const [galleries, setGalleries] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const data = await galleryService.getCurrentUserGalleries (id);
      console.log('My Gallery', data)
      setGalleries(data);
    };
    fetch();
  }, [id]);
  console.log(galleries);

  return (
    <div className="singleBox">
      <h1 className="singleBox-title">Author Galleries</h1>
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <div>
            <h3>User ID: {gallery.user_id}</h3>
            {gallery.user ? (
                <p className="single-user">
                {gallery.user.first_name} {gallery.user.last_name}{" "}
                </p>
            ) : (
            "No author"
             )}
            <h4>{gallery.name}</h4>
            <h5>{gallery.description}</h5>

            {gallery.images.length ? (
              <img
                className ="single-page--img"
                alt=""
                src={
                  gallery.images.length
                    ? gallery.images[0].image_url
                    : "There are no images in this gallery"
                }
              />
            ) : (
              "There are currently no images in this authors gallery"
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
export default AuthorGalleries;