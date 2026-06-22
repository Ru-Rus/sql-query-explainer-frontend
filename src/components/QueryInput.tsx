import { useState } from 'react';

interface Props {
  onExplain: (query: string) => void;
  loading: boolean;
  disabled?: boolean;
}

export default function QueryInput({ onExplain, loading, disabled }: Props) {
  const [query, setQuery] = useState(`SELECT * FROM Orders WHERE Status = 'Pending';`);

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-52 bg-black text-green-400 font-mono p-4 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 resize-y"
        placeholder="Paste your SQL query here..."
        disabled={disabled}
      />
      <button
        onClick={() => onExplain(query)}
        disabled={loading || disabled}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-4 rounded-lg font-medium text-lg"
      >
        {loading ? "🤔 Analyzing with AI..." : "Explain This Query"}
      </button>
    </div>
  );
}