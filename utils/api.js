import fetch from "unfetch";

// TODO: Change this
const API_SERVER_BASE = "http://localhost:8000";

class API {
  static getUrl(path) {
    return API_SERVER_BASE + path;
  }

  static listRedditPosts() {
    const path = "/api/reddit";
    return fetch(API.getUrl(path)).then(r => r.json());
  }
}

export default API;
