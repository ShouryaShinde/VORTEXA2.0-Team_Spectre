import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

// Routes
import assemblyRoutes from "./assemblyServer.js";
import summarizeRoutes from "./summarize.js";

const app = express();
const port = process.env.PORT || 3000;

// Set EJS
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Create uploads folder if it doesn't exist
const uploadFolder = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

// Use routes
app.use("/", assemblyRoutes);
app.use("/", summarizeRoutes);

// Basic pages
app.get("/", (req, res) => res.render("index.ejs"));
app.get("/upload", (req, res) => res.render("upload.ejs"));
app.get("/quiz" , (req,res) => res.render("quiz.ejs")) ;
app.get("/transcribe" , (req,res) => res.render("transcribe.ejs")) ;

// Start server
app.listen(port, () => console.log(`Listening on port ${port}`));
