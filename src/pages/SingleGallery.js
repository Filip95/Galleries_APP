
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import galleryService from "../services/GalleryService";

function SingleGallery(){
  const [gallery, setGallery] = useState([]);
  const { id } = useParams()

  useEffect(() => {
    const fetch = async () => {
      const data = await galleryService.getSelectedGallery(id);
      setGallery(data);
    }

    fetch();
  }, [id])

  return (
    <div>
      <h3>{gallery.name}</h3>
      <p>{gallery.description}</p>
      {gallery.images ?
      <div>
          {gallery.images && gallery.images.length ? gallery.images.map((image) => (
              <div 
              key={image.id}
              >
                  <a target="_blank" href={image.image_url}><img src={image.image_url} /></a> 
                  
              </div>
          )): ""}
      </div>
      : "No images"
      }
    </div>
  )
}

export default SingleGallery;