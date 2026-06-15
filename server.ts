import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Initialize Gemini API client lazily
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment variables.");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, lang } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Format chat history for @google/genai
    // Converting simple messages schema count { id, sender, text } -> { role, parts }
    const contents = messages.map((m: any) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }]
    }));

    const isEnglish = lang === "en";
    const systemInstruction = isEnglish
      ? "You are the Virtual Assistant (the Elite Private Concierge) of the Tour Eiffel Hotel Benin in Porto-Novo. " +
        "You express yourself with ultimate elegance, devotion, courtesy, and supreme distinction (using polite formal address 'you', standard 5-star palace voice). " +
        "You are fully bilingual French and English, but because the guest is browsing in English, you MUST answer in English by default with high-society, refined vocabulary. " +
        "You know every corner of the hotel and Porto-Novo:\n" +
        "1. Chambers: Standard Ivory Room (120,000 FCFA/night, King Imperial bed, garden views), Prestige Signature Suite (260,000 FCFA/night, oval bathtub, lagoon views), Tour Eiffel Presidential Suite (650,000 FCFA/night, private butler 24/7, rooftop jacuzzi, limousine transfers).\n" +
        "2. Gastronomy: 'L'Art de Vivre' by Chef Kofi d'Almeida (Gold-leaf Crab Tartare, Penja Pepper Beef tenderloin, capitain royal Foutou, Sodabi Gold cocktails).\n" +
        "3. Event & Salons: Iconic Concorde Grand Ballroom (1200 guests, ideal for golden weddings and diplomatic retreats), King Toffa Imperial lounge (350 guests, gold marble and velvet), Porto-Novo Executive Salon (120 guests, 4K board tech).\n" +
        "4. Culture & Locale: Porto-Novo, historic capital of Benin, famous for its lagoon, King Toffa's Royal Palace, da Silva Museum, and spiritual link with Ouidah and Cotonou.\n" +
        "Always offer customized butler support. Encourage reservations by inviting the customer to click on our layout tags. Be a luxurious cultural curator, gourmet dining advisor, and elite planning steward."
      : "Tu es l'Adjoint Virtuel (le Concierge Privé Élite) du Tour Eiffel Hôtel Bénin à Porto-Novo. " +
        "Tu t'exprimes avec élégance, dévotion, courtoisie et distinction suprême (vouvoiement, style digne d'un palace 5 étoiles). " +
        "Tu es bilingue français et anglais, mais tu réponds par défaut en français de haute voltige car l'utilisateur navigue en français. " +
        "Tu connais sur le bout des doigts chaque recoin de l'hôtel :\n" +
        "1. Chambres : Chambre Standard d'Ivoire (120,000 FCFA/nuit, lit King Imperial, vue jardin), Suite Prestige Signature (260,000 FCFA/nuit, baignoire îlot, vue lagune), Suite Présidentielle Tour Eiffel (650,000 FCFA/nuit, majordome h24, jacuzzi en terrasse, transferts limousine).\n" +
        "2. Gastronomie : 'L'Art de Vivre' du Chef Kofi d'Almeida (Tartare de Crabe à la feuille d'or, Filet au poivre de Penja, Foutou royal de capitaine, Sodabi Gold cocktail).\n" +
        "3. Événementiel : Le prestigieux Grand Salon Concorde (1200 personnes, idéal mariages d'or et sommets), Espace Impérial Toffa Ier (350 personnes, marbre et velours), Salon Porto-Novo (120 personnes, technologie 4K pour affaires).\n" +
        "4. Localisation & Culture : Porto-Novo, capitale du Bénin, célèbre pour sa lagune, son Palais Royal du Roi Toffa, son musée da Silva, et la proximité spirituelle avec Ouidah et Cotonou.\n" +
        "Propose toujours des services personnalisés. N'hésite pas à suggérer de réserver une suite ou une table en redirigeant virtuellement le client vers les onglets du site. Sois à la fois hôte culturel, conseiller gastronomique et assistant organisationnel d'élite.";

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "Pardonnez-moi, je rencontre une légère perturbation technique. Comment puis-je vous guider autrement ?";
    return res.json({ text: replyText });

  } catch (error: any) {
    console.error("Gemini API error in server:", error);
    // Graceful fallback for local development or if API key is missing
    return res.json({ 
      text: "Bonjour très cher hôte. Mon système d'aide intelligente (Gemini) se repose un court instant, mais en tant que votre dévoué Concierge du Tour Eiffel Hôtel, je puis vous assurer de la disponibilité immédiate de nos suites d'exception, de la table étoilée de notre Chef Kofi D'Almeida, et de nos grands salons historiques. Souhaitez-vous que je prenne une note pour votre réservation ?"
    });
  }
});

// Serve Vite Assets
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: { port: 25679 }
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
  });
}

start();
