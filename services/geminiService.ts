
import { GoogleGenAI } from "@google/genai";

export const getSmartHRSummary = async (userName: string, role: string, data: any) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = `
      As an HR Assistant AI for Dayflow, provide a brief, professional daily insight for ${userName} (${role}).
      Context Data: ${JSON.stringify(data)}
      Focus on highlighting important reminders, productivity tips, or policy snippets. 
      Keep it under 3 sentences. Professional and encouraging.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Welcome back to Dayflow! Ready to align your workday?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Welcome back to Dayflow! Have a productive day ahead.";
  }
};
