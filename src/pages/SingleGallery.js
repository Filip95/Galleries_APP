
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import galleryService from "../services/GalleryService";
import useFormattedDate from "../hooks/useFormattedDate";
import AddComment from "../components/AddComment";

function SingleGallery() {
  const [gallery, setGallery] = useState([]);
  const { id } = useParams();

  const date = useFormattedDate(
    gallery ? gallery.created_at : "",
    "dd-MM-yyyy"
  );

  const addCommentHandler = (comment) => {
    setGallery({ ...gallery, comments: [...gallery.comments, comment] });
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await galleryService.getSelectedGallery(id);
      setGallery(data);
    };
    fetch();
  }, [id]);
  console.log(gallery);

  return ( 
    <div className="singleBox">
      <h1 className="singleBox-title">{gallery.name}</h1>
      <h4>{gallery.description}</h4>
      <div>Created at: {date}</div>
      {gallery.user ? (
        <p className="single-user">
          {gallery.user.first_name} {gallery.user.last_name}{" "}
        </p>
      ) : (
        "No author"
      )}

      {gallery.images ? (
        <div>
          {gallery.images && gallery.images.length
            ? gallery.images.map((image) => (
                <div key={image.id}>
                  <a target="" href={image.image_url}>
                    <img
                      className="single-page--img"
                      src={image.image_url}
                      alt={gallery.name}
                    />
                  </a>
                </div>
              ))
            : ""}
        </div>
      ) : (
        "No images"
      )}
    
    <AddComment
        galleryId={gallery.id}
        addNewCommentCallback={addCommentHandler}
      />

      {gallery.comments  ? (
        <ol >
          {gallery.comments.map((comment) => (
              
            <li className="comment-box" width = "600" key={comment.id}>{comment.body}</li>
           
          ))}
        </ol>
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
}

export default SingleGallery;