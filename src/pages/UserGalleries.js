import {  useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { logout, selectActiveUser, selectIsAuthenticated } from "../store/auth";
import galleryService from "../services/GalleryService";



 function UserGalleries() {
    
    const [galleries, setGalleries] = useState([]);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const activeUser = useSelector(selectActiveUser);
    useEffect(() => {
        const fetch = async () => {
            if (!activeUser) {
               return ;
            }
            const data = await galleryService.getCurrentUserGalleries (activeUser.id);
            if (!data) {
                alert('You have no images in your gallery ');
                return;
            }
            console.log('My Gallery', data);      
            setGalleries(data); 
        }
        
        fetch();
    }, [activeUser])
    
    console.log(galleries);
    return (
        <div>
            <h2>My Galleries</h2>
            {galleries.map((gallery) => (
                <div key={gallery.id}>
                    <div>
            <strong>Description:</strong> 
            <p>{gallery.descrtiption}</p>

            {gallery.images.length ? <img
                style={{width:"300px",height:"300px"}}
                src={gallery.images.length ? gallery.images[0].image_url : "There are currently no images in your gallery"}
              />  : "There are currently no images in your gallery"}
            </div>
                
            </div>)
            )}

        </div>

    );
}

export default UserGalleries;