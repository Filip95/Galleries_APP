import HttpService from "./HttpService";

class GalleryService extends HttpService {
  getAll = async (name = "") => {
    try {
      let route = "/galleries";
      if (name) {
        route += `?name=${name}`;
      }
      const { data } = await this.client.get(route);
      return data;
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  getSelectedGallery = async (id) => {
    try {
      const { data } = await this.client.get(`/galleries/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  getCurrentUserGalleries = async (id) => {
    try {
      const { data } = await this.client.get(`/my-galleries/${id}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  createGallery = async (newGallery) => {
    try {
      const { data } = await this.client.post("/create-gallery", newGallery);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  removeGallery = async (id) => {
    try {
      const { data } = await this.client.delete(`/galleries/${id}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  editGallery = async (id, gallery) => {
    try {
      const { data } = await this.client.put(`/galleries/${id}`, gallery);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  addComment = async (comment, galleryId) => {
    try {
      const { data } = await this.client.post(
        `/galleries/${galleryId}/comments`,
        comment
      );
      return data;
    } catch (error) {
      console.log(error);
    }
    return null;
  };

  deleteComment = async (commentId, galleryId) => {
    try {
      const { data } = await this.client.delete(
        `/galleries/${galleryId}/comments/${commentId}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new GalleryService();