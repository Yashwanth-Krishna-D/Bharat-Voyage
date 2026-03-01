import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv'; // Ensure dotenv is used if not already loaded globally

dotenv.config();

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini
let genAI;
let model;

if (GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
} else {
    console.warn("GEMINI_API_KEY not found in environment variables. AI generation will fail.");
}

router.post('/generate', async (req, res) => {
    if (!model) {
        return res.status(500).json({ error: "Server misconfiguration: Gemini API Key missing." });
    }

    const { destination, days, budget, travelers, interests } = req.body;

    if (!destination || !days) {
        return res.status(400).json({ error: "Destination and days are required." });
    }

    try {
        const prompt = `
      Act as an expert travel planner. Create a detailed day-by-day itinerary for a trip to ${destination} for ${days} days.
      Travelers: ${travelers || '2'} people.
      Budget Level: ${budget || 'Moderate'}.
      Interests: ${interests ? interests.join(', ') : 'General Sightseeing'}.

      Return ONLY a JSON object with this structure (no markdown, no extra text):
      {
        "tripTitle": "Catchy Title for the Trip",
        "summary": "Brief summary of the experience",
        "itinerary": [
          {
            "day": 1,
            "theme": "Theme of the day (e.g., Temple Tour)",
            "activities": [
              { "time": "Morning", "description": "Activity details" },
              { "time": "Afternoon", "description": "Activity details" },
              { "time": "Evening", "description": "Activity details" }
            ]
          }
        ]
      }
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks (e.g. ```json ... ```)
        const jsonStr = text.replace(/```json|```/g, '').trim();
        const plan = JSON.parse(jsonStr);

        res.json(plan);
    } catch (error) {
        console.error("Error generating trip plan:", error);
        res.status(500).json({ error: "Failed to generate itinerary. Please try again." });
    }
});

export default router;
