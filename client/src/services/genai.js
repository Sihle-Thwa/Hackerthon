import {GoogleGenerativeAI} from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

export const fetchAIResponse =  async (prompt) => {
    const model = genAI.getGenerativeModel({model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    return result.response.text();
}