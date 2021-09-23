import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import galleryService from "../services/GalleryService";

function AppGalleries() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const getGalleries = async () => {
      const {data} = await galleryService.getAll();
      setGalleries(data);
    };
    getGalleries();
  }, []);

  return (
    <div>
      <h2>All galleries</h2>
      {galleries.map((gallery) => (
        <div key={gallery.id}>
          <p>
            <Link to={`galleries/${gallery.id}`}>
              <strong>{gallery.name}</strong>
            </Link>
          </p>
          <p>
            <strong>Description:</strong> {gallery.description}
            <img
              src={gallery.images.length ? gallery.images[0].image_url : ""}
              alt="Various images contained in a gallery"
            />
          </p>
        </div>
      ))}
    </div>
  );
}
export default AppGalleries;