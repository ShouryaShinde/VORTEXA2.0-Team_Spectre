import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "AI is the field of computer science that focuses on creating intelligent machines that can perform tasks that usually require human intelligence." + "Summarize the text in short",
  });
  console.log(response.text) ;
}

main();
