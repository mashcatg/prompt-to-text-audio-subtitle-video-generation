import googleTTS from "google-tts-api";
import fs from "fs";
import { exec } from "child_process";

export async function textToSpeech(text) {
  const url = googleTTS.getAudioUrl(text, { lang: "en", slow: false });
  const outputFile = `output_audio.mp3`;

  return new Promise((resolve, reject) => {
    exec(`curl -o ${outputFile} "${url}"`, (err) => {
      if (err) return reject(err);
      resolve(outputFile);
    });
  });
}
