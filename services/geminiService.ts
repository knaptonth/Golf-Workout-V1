import { GoogleGenAI } from "@google/genai";
import { SessionLog } from '../types';
import { WORKOUTS } from '../constants';

const API_KEY = process.env.API_KEY || ''; // Ensure this is available in your build environment

export const analyzeSession = async (log: SessionLog): Promise<string> => {
  if (!API_KEY) {
    return "API Key is missing. Please configure your environment variables.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const workoutRef = WORKOUTS[log.version][log.dayId];
    
    // Construct a prompt that gives context
    const prompt = `
      You are an expert TPI-certified Golf Fitness Instructor. 
      The user just completed the "${workoutRef.title}" workout from the Tour Spec Protocols.
      
      Here is their log data:
      ${JSON.stringify(log.exercises, null, 2)}
      
      The intended protocol details (targets):
      ${JSON.stringify(workoutRef.exercises.map(e => ({ name: e.name, targetWeight: e.weightGuide, tempo: e.tempo })), null, 2)}
      
      Please provide brief, high-impact feedback (max 100 words).
      1. Praise effort on completed heavy lifts.
      2. Point out one area to focus on tempo or form for next time based on the exercise type (e.g. if they did Squats, mention staying upright).
      3. Give a specific "Swing Thought" relating this gym work to their golf swing.
      
      Keep the tone encouraging but professional.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate feedback.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I couldn't connect to the AI coach right now. Check your connection.";
  }
};