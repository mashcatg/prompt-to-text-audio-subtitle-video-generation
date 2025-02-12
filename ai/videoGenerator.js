import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set FFmpeg path
const ffmpegPath = "C:\\Users\\Home\\Downloads\\ffmpeg-7.1-full_build\\bin\\ffmpeg";
ffmpeg.setFfmpegPath(ffmpegPath);

// Construct the absolute path to the audio file
const audioFilePath = path.resolve(__dirname, "../output_audio.mp3");

// Check if the audio file exists
console.log("Looking for audio file at:", audioFilePath);
if (!fs.existsSync(audioFilePath)) {
  console.error("❌ Audio file not found!");
} else {
  console.log("✅ Audio file found!");
}

// Generate the video
// generateVideo(audioFilePath, "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4")
//   .then((outputFile) => {
//     console.log("Video generated successfully:", outputFile);
//   })
//   .catch((err) => {
//     console.error("Error generating video:", err);
//   });

// Function to generate the video
export async function generateVideo(audioFile, videoFile) {
  return new Promise((resolve, reject) => {
    const outputFile = "final_video.mp4";

    const command = ffmpeg()
      .input(videoFile)
      .input(audioFile)
      .outputOptions([
        "-c:v copy", // Copy the video stream without re-encoding
        "-c:a aac",  // Encode the audio stream using AAC codec
        "-map 0:v:0", // Map the first video stream from the first input (video file)
        "-map 1:a:0", // Map the first audio stream from the second input (audio file)
        "-shortest", // Ensure the output duration matches the shortest input
      ])
      .output(outputFile)
      .on("start", (commandLine) => {
        console.log("FFmpeg command: " + commandLine);
      })
      .on("codecData", (data) => {
        console.log("Input is " + data.audio + " audio " + "with " + data.video + " video");
      })
      .on("end", () => {
        console.log("FFmpeg processing finished");
        resolve(outputFile);
      })
      .on("error", (err) => {
        console.error("FFmpeg error:", err);
        reject(err);
      })
      .on("stderr", (stderr) => {
        console.error("FFmpeg stderr:", stderr);
      })
      .on("progress", (progress) => {
        console.log(`Processing: ${progress.timemark}`);
      });

    command.run();
  });
}