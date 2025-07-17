const bgColors = [
  "bg-blue-50",
  "bg-green-50",
  "bg-yellow-50",
  "bg-purple-50",
  "bg-orange-50",
  "bg-pink-50",
  "bg-indigo-50",
  "bg-emerald-50"
];

export default function SchemeCard({ content }) {
  const cleaned = content
    .replace(/\*\*(.*?)\*\*/g, '$1') 
    .replace(/\*(.*?)\*/g, '$1')     
    .trim();

  const sections = cleaned.split(/\n{2,}/);

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-2">📄 Result</h2>
      {sections.map((section, index) => (
        <div
          key={index}
          className={`border-l-4 p-4 rounded-md shadow-sm transition-all duration-300 hover:scale-[1.01] ${bgColors[index % bgColors.length]} border-blue-400`}
        >
          <p className="text-black whitespace-pre-line leading-relaxed">
            {section.trim()}
          </p>
        </div>
      ))}
    </div>
  );
}