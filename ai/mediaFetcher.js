import axios from "axios";
import config from "../config.js";
export async function fetchMedia(query) {
  try {
    const res = await axios.get("https://api.pexels.com/videos/search", {
      params: { query, per_page: 1 },
      headers: { Authorization: config.PEXELS_API_KEY },
    });
   
    if (res.data.videos.length > 0) {
      return res.data.videos[0].video_files[0].link; // Best quality video
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching media:", error);
    return null;
  }
}
