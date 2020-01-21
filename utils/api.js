import fetch from "unfetch";
import moment from "moment";

import { getCookie } from "./cookie";

const API_SERVER_BASE = process.env.API_URL;

class API {
  static getUrl(path) {
    return API_SERVER_BASE + path;
  }

  // Journal Entries

  static postJournalEntry(text) {
    const path = "/api/journals";
    const csrfToken = getCookie("csrftoken");
    return fetch(API.getUrl(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        timestamp: moment().valueOf(),
        text: text,
      }),
    }).then(r => r.json());
  }

  // Reddit

  static listRedditPosts() {
    const path = "/api/reddit";
    return fetch(API.getUrl(path)).then(r => r.json());
  }
}

export default API;
