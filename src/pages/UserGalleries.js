import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectActiveUser } from "../store/auth";
import galleryService from "../services/GalleryService";
import { Link } from "react-router-dom";

function UserGalleries() {
  const [galleries, setGalleries] = useState([]);
  const activeUser = useSelector(selectActiveUser);
  useEffect(() => {
    const fetch = async () => {
      if (!activeUser) {
        return;
      }
      const data = await galleryService.getCurrentUserGalleries(activeUser.id);
      if (!data) {
        alert("You have no images in your gallery ");
        return;
      }
      console.log("My Gallery", data);
      setGalleries(data);
    };

    fetch();
  }, [activeUser]);

  console.log(galleries);
  return (
    <div className="singleBox">
      <h1>My Galleries</h1>
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <div style={{ padding: "10px" }}>
            <Link to={`galleries/${gallery.id}`}>
              <div className="singleBox-title">
                <h4>{gallery.name}</h4>
              </div>
            </Link>
            <div style={{ padding: "10px" }}>
              <Link to={`authors/${gallery.user_id}`}>
                <h3>
                  <strong>{activeUser.first_name}</strong>
                </h3>
              </Link>
            </div>
            <div>
              <h4>{gallery.description}</h4>
            </div>
            {gallery.images.length ? (
              <img
                style={{ width: "500px", height: "500px" }}
                src={
                  gallery.images.length
                    ? gallery.images[0].image_url
                    : "There are currently no images in your gallery"
                }
                alt=""
              />
            ) : (
              "There are currently no images in your gallery"
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserGalleries;