🩺 Curevia AI

Curevia AI is an intelligent healthcare assistant that analyzes user-described symptoms and recommends suitable Indian government health schemes. 
Built using modern web technologies and integrated with a powerful LLM API via OpenRouter, it leverages AI to improve accessibility to
welfare schemes in a user-friendly manner.

---

🚀 Features

- 🧠 AI-powered symptom validation using LLM (Mistral-7B via OpenRouter).
- 🏥 Personalized government scheme suggestions (PMJAY, CMCHIS, etc.).
- 📄 Clearly structured replies with eligibility, documents, time estimates.
- 🌙 Dark Mode support based on system theme.
- ⚙️ Express.js-based backend API.
- ⚡ Frontend in React + Tailwind CSS.
- 🌐 Soon to be deployed publicly (currently runs on `localhost:5173`).

---

🛠️ Tech Stack

| Layer       | Technology                  |
|-------------|------------------------------|
| Frontend    | React, Tailwind CSS, Vite    |
| Backend     | Node.js, Express             |
| API Model   | Mistral-7B via OpenRouter.ai |
| Hosting     | GitHub Pages / Render / Netlify (coming soon) |
| Language    | JavaScript (ES6+), JSX       |

---

🧠 AI / ML Involvement

- The app sends user symptom queries to a language model (LLM) using the OpenRouter API.
- The backend uses natural language prompts to:
  - Validate if the input is a symptom or not.
  - Generate scheme suggestions and structured information.
- The model used is: `mistralai/mistral-7b-instruct`.

---

🏗️ Folder Structure

curevia-ai/
├── backend/
│ ├── index.js
│ ├── .env
│ └── package.json
├── frontend/
│ ├── src/
│ │ |
│ │ └── components/
│ │ ├── InputBox.jsx
│ │ └── SchemeCard.jsx
| ├── App.jsx
│ ├── index.html
│ └── package.json
└── README.md

---

📦 Future Improvements
✅ Deploy to Netlify or Render with environment variables.
🔐 Role-based access for doctors and patients.
🌍 Multi-language support.
📊 Usage analytics integration.

---

📃 License
This project is licensed under the MIT License.
Feel free to use, adapt, or contribute!
