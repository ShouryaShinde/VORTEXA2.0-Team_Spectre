// geminiRoutes.js
import express from "express";
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const router = express.Router();
const ai = new GoogleGenAI({});

// Route to generate summary and quiz
router.get("/generate", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        AI is the field of computer science that focuses on creating intelligent machines that can perform tasks that usually require human intelligence.
        Create a summary and send it back in 'summary',
        create 3 questions based on the summary and store them in 'questions' array,
        create 'options' array with 3 incorrect options and 1 correct option for each question,
        create 'answers' array which stores the index of the correct answer for each question,
        return all data in JSON format without JSON markdown.
      `
    });

    const data = JSON.parse(response.text);

    // Store in locals to share between routes if needed
    req.app.locals.summary = data.summary;
    req.app.locals.questions = data.questions;
    req.app.locals.options = data.options;
    req.app.locals.answers = data.answers;

    // Render summary page
    res.render("transcribe.ejs", { summary: data.summary });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating content");
  }
});

// Route to show quiz page
router.get("/quiz-generated", (req, res) => {
  const { questions, options, answers } = req.app.locals;

  if (!questions || !options || !answers) {
    return res.status(400).send("No quiz data available. First visit /generate");
  }

  res.render("quizz.ejs", { questions, options, answers });
});

export default router;
