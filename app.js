import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

// Set EJS
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Create uploads folder if it doesn't exist
const uploadFolder = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Multer setup for audio uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Routes
app.get("/", (req, res) => res.render("index.ejs"));
app.get("/upload", (req, res) => res.render("upload.ejs"));
app.get("/transcribe", (req, res) => res.render("transcribe.ejs"));
app.get("/quiz", (req, res) => res.render("quiz.ejs"));

// Handle audio file upload
app.post("/upload", upload.array("audioFiles"), (req, res) => {
  try {
    const filesInfo = req.files.map((file) => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`,
      originalname: file.originalname,
    }));

    // Send response with uploaded files info
    res.json({
      message: "Files uploaded successfully!",
      files: filesInfo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading files", error: err.message });
  }
});

// Serve uploaded files
app.use("/uploads", express.static(uploadFolder));

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
