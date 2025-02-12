import axios from "axios";
import config from "../config.js";
export async function generateScript(prompt) {
  try {
    const res = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3",
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${config.HUGGINGFACE_API_KEY}` } }
    );
    return res.data[0].generated_text || "Sorry, I couldn't generate a script.";
  } catch (error) {
    console.error("Error generating script:", error);
    return "Script generation failed.";
  }
}
