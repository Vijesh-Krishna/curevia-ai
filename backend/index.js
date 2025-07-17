import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const MIN_LENGTH = 4;

async function isValidSymptom(text) {
  const validationPrompt = `
    You're a medical assistant. A user entered the following message: "${text}"

    Determine if this is a valid health-related symptom or illness (like fever, cancer, chest pain, etc.).

    Reply with just one word:
      - "yes" → if it's a real or valid health-related issue
      - "no" → if it's not a medical concern (like "hello", "I am fine", "0", etc.)
    `;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct",
      messages: [
        { role: "system", content: "You are a medical assistant AI." },
        { role: "user", content: validationPrompt }
      ]
    })
  });

  const data = await res.json();
  const reply = data.choices?.[0]?.message?.content?.toLowerCase().trim();
  return reply === "yes";
}

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const input = message?.toLowerCase().trim();

  if (!input || input.length < MIN_LENGTH) {
    return res.json({
      reply: `❗ Please enter a valid symptom or health condition for scheme recommendations.`
    });
  }

  try {
    const isSymptom = await isValidSymptom(input);

    if (!isSymptom) {
      return res.json({
        reply: `The text you entered doesn't appear to be a valid symptom.\n\nPlease describe a genuine health issue (e.g., chest pain, diabetes, breathing problem) to get accurate scheme recommendations.`
      });
    }

    const systemPrompt = `
      You are BharatCare AI — a healthcare assistant helping Indians discover public health schemes based on symptoms.

      ⛔ IMPORTANT: Do not include any clickable links or URLs in your reply.

      ✅ INSTEAD, only mention the **name of the platform or scheme** where applicable. Avoid using brackets, URLs, or markdown links.

      Your response should follow this structure:

      1. Likely Health Condition: Give a brief explanation of what the symptom might indicate.

      2. Applicable Government Scheme(s):
        - Just list the names of 1–2 schemes like PMJAY or CMCHIS.

      3. Eligibility Criteria:
       - Example: BPL category, SECC 2011 database inclusion, income limits.

      4. Required Documents: select according to the symptom and scheme.
        // - Aadhaar Card
        // - Ration Card
        // - Proof of Address or Income Certificate 
        provide documents with the actual documents required for the scheme according to the entered symptom or disease.

      5. Where to Apply:
        - Mention accordingly: PMJAY portal, State Health Insurance Office, or Common Service Centre (CSC). Do not give URLs.

      6. City-Specific Hospital Example: select according to the symptom and scheme specific hospitals.
        // - Delhi: Apollo Hospital
        // - Mumbai: Tata Memorial Hospital
        // - Hyderabad: Osmania General Hospital, 
        provide hospitals with the actual hospitals according to the entered symptom or disease and selected scheme. Dont add special characters like "//"

      7. Estimated Time: select according to the symptom, scheme and location.
        // - Eligibility verification: 3–5 working days
        // - Scheme approval: After verification
        // - Treatment start: Once approved card is issued
        provide durations with the actual duration required for verification in terms of selected scheme.

      8. Alternate Assistance:
        - Mention trusted organizations like NGO India or local health departments.

      ⚠️ This is not medical advice. Please consult a licensed doctor for diagnosis and treatment.
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      return res.status(500).json({ error: "Invalid response from OpenRouter API." });
    }

    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "AI or server error." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));