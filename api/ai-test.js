// api/ai-test.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Sprawdzenie metody (obsługujemy tylko POST)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // 2. Pobranie klucza z bezpiecznych zmiennych środowiskowych Vercela
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Brak klucza API Gemini w zmiennych środowiskowych!");
    }

    // 3. Konfiguracja modelu Gemini 2.0 Flash (lub 1.5-flash)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 4. Pobranie pytania z body requestu (od frontendu)
    const { prompt } = req.body;
    
    // 5. Wywołanie AI
    const result = await model.generateContent(prompt || "Przywitaj się krótko jako Asystent.");
    const responseText = result.response.text();

    // 6. Zwrócenie odpowiedzi do frontendu
    res.status(200).json({ answer: responseText });

  } catch (error) {
    console.error("Błąd AI:", error);
    res.status(500).json({ error: error.message });
  }
}