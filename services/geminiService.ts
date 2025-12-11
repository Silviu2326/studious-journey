import { GoogleGenAI } from "@google/genai";
import { AI_SUGGESTION_PROMPT } from "../constants";

// Safe initialization
const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export interface AiSuggestion {
  title: string;
  description: string;
}

export const getAiSuggestion = async (): Promise<AiSuggestion | null> => {
  if (!ai) {
    console.warn("API Key not found via process.env.API_KEY");
    // Fallback for demo if no key
    return {
      title: "Micro-Reto: CSS Flexbox",
      description: "Intenta centrar un div vertical y horizontalmente en 2 minutos sin mirar la documentación."
    };
  }

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: AI_SUGGESTION_PROMPT,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as AiSuggestion;
  } catch (error) {
    console.error("Error getting AI suggestion:", error);
    return {
        title: "Error de conexión",
        description: "No pude contactar con tu mentor virtual. Revisa la consola."
    };
  }
};