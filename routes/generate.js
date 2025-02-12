import express from "express";
import { generateScript } from "../ai/scriptGenerator.js";
import { textToSpeech } from "../ai/textToSpeech.js";
import { fetchMedia } from "../ai/mediaFetcher.js";
import { generateVideo } from "../ai/videoGenerator.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const script = await generateScript(prompt);
    const audioFile = await textToSpeech(script);
    const videoFile = await fetchMedia(prompt);

    if (!videoFile) return res.status(500).json({ error: "No video found." });

    const finalVideo = await generateVideo(audioFile, videoFile);
    res.json({ videoUrl: `http://localhost:5000/${finalVideo}` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

export default router;
