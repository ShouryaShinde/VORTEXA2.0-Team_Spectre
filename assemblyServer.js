// assemblyServer.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";
 // correct relative path

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const ASSEMBLY_API_KEY = "9a005678cf114b4598364b4b53ca5880";

// Transcribe audio via AssemblyAI
async function transcribeAudio(filePath) {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(filePath));

  const uploadRes = await axios.post(
    "https://api.assemblyai.com/v2/upload",
    formData,
    { headers: { authorization: ASSEMBLY_API_KEY, ...formData.getHeaders() } }
  );

  const audioUrl = uploadRes.data.upload_url;

  const transcriptRes = await axios.post(
    "https://api.assemblyai.com/v2/transcript",
    { audio_url: audioUrl },
    { headers: { authorization: ASSEMBLY_API_KEY } }
  );

  const transcriptId = transcriptRes.data.id;

  while (true) {
    const statusRes = await axios.get(
      `https://api.assemblyai.com/v2/transcript/${transcriptId}`,
      { headers: { authorization: ASSEMBLY_API_KEY } }
    );

    if (statusRes.data.status === "completed") return statusRes.data.text;
    if (statusRes.data.status === "error") throw new Error(statusRes.data.error);

    await new Promise((r) => setTimeout(r, 3000));
  }
}

// POST /assembly/transcribe
router.post("/assembly/transcribe", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send({ error: "No file uploaded" });

  try {
    const filePath = path.join(process.cwd(), req.file.path);
    const transcriptText = await transcribeAudio(filePath);
    fs.unlinkSync(filePath);

    // Store transcript in app.locals for summarize.js
    req.app.locals.transcript = transcriptText;

    // Redirect to /generate to automatically get summary + quiz
    res.redirect("/generate");

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

export default router;
