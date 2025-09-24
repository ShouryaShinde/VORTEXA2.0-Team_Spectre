// summarize.js
import express from "express";
import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const router = express.Router();
const ai = new GoogleGenAI({});

// Function to generate summary + quiz from text
async function generateFromGemini(transcriptText) {
  const prompt = `
    ${transcriptText}
    Create a summary and send it back in 'summary',
    create 3 questions based on the summary and store them in 'questions' array,
    create 'options' array with 3 incorrect options and 1 correct option for each question,
    create 'answers' array which stores the index of the correct answer for each question,
    return all data in JSON format without markdown.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  // Remove any backticks/markdown formatting
  let jsonText = response.text.trim();
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/```(json)?/g, "").trim();
  }

  return JSON.parse(jsonText);
}

// Route to generate summary and quiz from transcript
router.get("/generate", async (req, res) => {
  try {
    // Get text from query param or stored transcript in app.locals
    const text = req.query.text || req.app.locals.transcript;
    if (!text) return res.status(400).send("No text provided for summary generation");

    const data = await generateFromGemini(text);

    // Store in locals for /quiz-generated
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

  res.render("quiz.ejs", { questions, options, answers });
});

export default router;
