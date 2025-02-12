import express from "express";
import cors from "cors";
import generateRoute from "./routes/generate.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/generate", generateRoute);
app.use(express.static("public"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
