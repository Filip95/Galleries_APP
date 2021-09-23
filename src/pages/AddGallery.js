import { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {  selectActiveUser } from "../store/auth";
import galleryService from "../services/GalleryService";

function AddGallery() {
  const [newGallery, setNewGallery] = useState({
    name: "",
    description: "",
    image_url: "",
  });
  const history = useHistory();
  const { id } = useParams();
  const activeUser = useSelector(selectActiveUser);


  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = null;
    console.log(activeUser);
    if (!activeUser) {
        return ;
    }
    console.log(activeUser);

    setNewGallery({ ...newGallery, user_id: activeUser.id });
    console.log(newGallery);

    if (id) {
      data = await galleryService.editGallery(id, newGallery);
    } else {
      data = await galleryService.createGallery(newGallery);
    }

    if (!data) {
      alert("Could not create gallery");
      return;
    }

    history.push("/galleries");
  };

  const handleReset = () => {
    setNewGallery({ name: "", description: "", userId: "" });
  };

   useEffect(() => {
     const fetchPost = async () => {
       const {
         id: _,
         createdAt,
         ...restData
       } = await galleryService.getSelectedGallery(id);
       setNewGallery(restData);
     };

     if (id) {
       fetchPost();
     }
   }, [id]);

  return (
    <div>
      <h2>{id ? "Edit" : "Add new"} </h2>
      <form
        style={{ display: "flex", flexDirection: "column", width: 300 }}
        onSubmit={handleSubmit}
      >
        <input
          required
          minLength={2}
          maxLength={255}
          value={newGallery.name}
          placeholder="Gallery name"
          onChange={({ target }) =>
            setNewGallery({ ...newGallery, name: target.value })
          }
        />
        <input
          required
          maxLength={1000}
          value={newGallery.description}
          placeholder="Add a description"
          onChange={({ target }) =>
            setNewGallery({ ...newGallery, description: target.value })
          }
        />
       <input
          required
          maxLength={255}
          value={newGallery.image_url}
          placeholder='images'
          onChange={({ target }) =>
          setNewGallery({ ...newGallery, image_url: target.value,  })
          }
        />
        <button>{id ? "Edit" : "Add"}</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}

export default AddGallery;