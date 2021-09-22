import axios from "axios";

// abstract class
 class HttpService {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:8000/api",
    });

  }
}

export default HttpService;