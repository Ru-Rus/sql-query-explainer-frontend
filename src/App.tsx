import { useState } from 'react';
import QueryInput from './components/QueryInput';
import Explanation from './components/Explanation';

interface ExplanationData {
  explanation: string;
  performance_issues: string[];
  erd_description: string;
  optimizations: string[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [result, setResult] = useState<ExplanationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExplain = async (query: string) => {
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/api/explain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to explain query");
      }

      setResult(await res.json());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to explain query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">🔍 AI SQL Query Explainer</h1>
        <p className="text-center text-gray-400 mb-8">Paste your SQL query • Powered by Gemini</p>
        <QueryInput onExplain={handleExplain} loading={loading} />
        {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
        {result && <Explanation data={result} />}
      </div>
    </div>
  );
}

export default App;