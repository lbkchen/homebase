import fetch from "unfetch";
import moment from "moment";

import { getCookie } from "./cookie";

const API_SERVER_BASE = process.env.API_URL;

class API {
  static getUrl(path) {
    return API_SERVER_BASE + path;
  }

  // Journal Entries

  static async postJournalEntry(text) {
    const path = "/api/journals";
    const csrfToken = getCookie("csrftoken");
    const res = await fetch(API.getUrl(path), {
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
    });
    return res.json();
  }

  // Reddit

  static async listRedditPosts() {
    const path = "/api/reddit";
    const res = await fetch(API.getUrl(path));
    return res.json();
  }

  // Anki
  static async getAnkiStats() {
    const path = "/api/anki";
    const res = await fetch(API.getUrl(path));
    return res.json();
  }
}

export default API;
