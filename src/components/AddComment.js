import React, { useState } from "react";
import galleryService from "../services/GalleryService";

function AddComment({ galleryId, addNewCommentCallback }) {
  const [newComment, setNewComment] = useState({ body: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await galleryService.addComment(newComment, galleryId);

    if (data) {
      addNewCommentCallback(data);
    }

    setNewComment({ body: "" });
  };

  return (
    <div>
      <form className="comments-form" onSubmit={handleSubmit}>
        <textarea
          type="textarea"
          rows="4" cols="60"
          placeholder="Add a comment"
          value={newComment.body}
          onChange={({ target }) => setNewComment({ body: target.value })}
          width="500"
        />
        <button className="comments-btn">Add comment</button>
      </form>
    </div>
  );
}
export default AddComment;