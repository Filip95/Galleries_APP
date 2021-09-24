import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import galleryService from "../services/GalleryService";

function AppGalleries() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const getGalleries = async () => {
      const { data } = await galleryService.getAll();
      setGalleries(data);
    };
    getGalleries();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        backgroundColor: "bisque",
        direction: "ltr",
      }}
    >
      <h1>All galleries</h1>
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <div style={{ padding: "10px" }}>
            <Link to={`galleries/${gallery.id}`}>
              <h2>
                <strong>{gallery.name}</strong>
              </h2>
            </Link>
          </div>
          <div style={{ padding: "10px" }}>
            <Link to={`authors/${gallery.user_id}`}>
              <h3>
                <strong>{gallery.user.first_name}</strong>
              </h3>
            </Link>
          </div>
          <div>
            <div style={{ padding: "10px" }}>
              <strong>Description:</strong> {gallery.description}
            </div>
            <img
              src={gallery.images.length ? gallery.images[0].image_url : ""}
              alt="Various images contained in a gallery"
              style={{ padding: "10px" }}
              width="50%"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export default AppGalleries;