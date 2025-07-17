import { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import SchemeCard from "./components/SchemeCard";

function App() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  // ✅ Submit the current input to backend
  const handleSubmit = async () => {
    const trimmed = message.trim();
    if (!trimmed) {
      alert("⚠️ Please enter a valid symptom or issue.");
      return;
    }

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      setReply(data.reply || "⚠️ Something went wrong. Please try again.");
    } catch (error) {
      console.error("❌ Frontend fetch error:", error);
      setReply("⚠️ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-10 transition-all">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-xl rounded-xl p-6 sm:p-10 transition-all">
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-200 mb-2 text-center">
          🩺 Curevia AI
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 italic mb-6">
          Empowering lives with the right care path.
        </p>

        <InputBox
          userInput={message}
          setUserInput={setMessage}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {reply && <SchemeCard content={reply} />}

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-8 text-center">
          ⚠️ This tool is for informational purposes only. Always consult a medical professional.
        </p>
      </div>
    </div>
  );
}

export default App;