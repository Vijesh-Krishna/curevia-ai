export default function InputBox({ userInput, setUserInput, handleSubmit, loading }) {
  const exampleInputs = [
    "Severe headache with nausea",
    "Fever for more than 3 days",
    "Weight loss and fatigue"
  ];

  return (
    <div className="mb-4 animate-fade-in-up">
      <label
        htmlFor="symptomInput"
        className="block text-gray-700 dark:text-gray-200 mb-2 font-medium text-center text-lg"
      >
        🔍 Describe your symptoms or issue:
      </label>

      <textarea
        id="symptomInput"
        name="symptomInput"
        rows="4"
        placeholder="e.g., My father has chest pain and breathing difficulty"
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={loading}
      ></textarea>

      <div className="mt-4 flex flex-wrap justify-center gap-2 text-center">
        {exampleInputs.map((example, index) => (
          <button
            key={index}
            onClick={() => setUserInput(example)}
            className="cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {example}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="cursor-pointer mt-4 w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "🧠 Thinking..." : "🧠 Suggest Scheme"}
      </button>
    </div>
  );
}