# 🧠 Quizzer — AI-Powered Summarizer & Quiz Generator

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-4B32C3?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Render](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

Quizzer is an **AI-powered web app** that helps learners summarize educational videos and automatically generate **interactive quizzes** to test understanding — making learning more efficient and engaging.

---
## 🌍 Visit the Live Site

🚀 Experience **Quizzer** live here:  
🔗 **[https://quizzer-w3m3.onrender.com](https://quizzer-w3m3.onrender.com/)**    

---

## 🚀 Features

✅ **Video Upload & Transcription** — Upload any educational video and let the app generate accurate transcriptions using AI.  
✅ **Smart Summarization** — Automatically summarize the key concepts and main points from the video content.  
✅ **Auto Quiz Generation** — Generate context-based multiple-choice quizzes to reinforce learning.  
✅ **Modern UI** — Simple, responsive, and user-friendly design for effortless interaction.  
✅ **AI-Powered** — Uses advanced natural language models for high-quality summaries and questions.

---

## 🧩 Tech Stack

| Layer | Technologies |
|:------|:--------------|
| **Frontend** | EJS / HTML / CSS / JavaScript / Bootstrap / TailwindCSS |
| **Backend** | Node.js / Express.js |
| **AI APIs** | Gemini API  / AssemblyAI (for transcription and summarization) |
| **Deployment** | Render |

---

## 📂 Project Structure
```
Quizzer/
│
├── public/ # Static assets (CSS, JS, images)
| ├── images/
| ├── js/
|  └── uploadHandler.js
| └── styles/
|  └── main.css
├── views/ # EJS templates (frontend)
│ ├── index.ejs
│ ├── upload.ejs
│ ├── transcribe.ejs
│ ├── quiz.ejs
│ └── partials/ # Includes Header and Footer .ejs files
├── app.js # Main server file
├── assemblyServer.js # JS to handle transcription
├── summarize.js # JS to handle creation of Summary
├── package.json
└── README.md
```
## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ShouryaShinde/VORTEXA2.0-Team_Spectre.git
cd VORTEXA2.0-Team_Spectre
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Set up environment variables
Create a .env file in the root directory and add the following:
```env
GEMINI_API_KEY=your_gemini_api_key
ASSEMBLY_API_KEY=your_assemblyai_api_key
```
### 4️⃣ Run the app
```bash
npm start
```
Then open your browser and visit → <http://localhost:3000/>

---

## 🧠 How It Works

1. **Upload Video** 🎬  
   Upload an educational video or lecture through the upload page.

2. **AI Transcription** ✍️  
   The backend uses **AssemblyAI** (or a similar API) to convert speech into accurate text.

3. **Summarization** 🪄  
   The transcribed text is processed using **Gemini/OpenAI** to create concise and well-structured summaries.

4. **Quiz Generation** 📝  
   Based on the summarized content, the AI dynamically generates multiple-choice questions to help users test their understanding.

---

## ⚡ Hackathon Details

This project was built during the **12-hour VORTEXA Hackathon** held on **24th September**.

### 🧩 Problem Statement
> **"Web App that auto transcribes lectures, summarizes content, and creates adaptive quizzes."**

**Quizzer** was designed as an innovative AI-based solution to help learners and educators save time by automatically processing lecture content into easy-to-understand summaries and adaptive quizzes.

---

## 🌐 Deployment

The project is deployed using **Render**.  
Once deployed, your app will remain live even if you close the Render dashboard.

### 🪄 Redeploying
If you make any changes or commits after deployment:
- Either **enable automatic deploys** in Render’s settings,  
- Or **redeploy manually** from the Render dashboard.

Your live site: 

🔗 **[https://quizzer-w3m3.onrender.com](https://quizzer-w3m3.onrender.com/)**

---

## 🧑‍💻 Contributors

| Name | Role |
|:------|:-----|
| [Shourya Shinde](https://github.com/ShouryaShinde) | Full Stack Developer |
| [Ranjit Bhogil](https://github.com/CodeXSpecter) | Full Stack Developer |
| [Raj Bhokare](https://github.com/RajBhokare) | Front-End Developer |
| [Vedant Toke](https://github.com/vedanttoke20) | Front-End Developer |
| **Team Spectre** | Design, Concept & Development |
---

## 🛡️ License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it for educational or personal projects.

---

## ⭐ Show Your Support

If you found **Quizzer** helpful, please ⭐ star the repo and share it with others!

> “Transform learning through AI — one quiz at a time.” 🧩
