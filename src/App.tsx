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
const DAILY_LIMIT = 10;
const STORAGE_KEY = 'sql_explainer_usage';

interface UsageData {
  date: string;
  count: number;
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

function getUsage(): UsageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: getTodayString(), count: 0 };
    const parsed: UsageData = JSON.parse(raw);
    if (parsed.date !== getTodayString()) {
      return { date: getTodayString(), count: 0 };
    }
    return parsed;
  } catch {
    return { date: getTodayString(), count: 0 };
  }
}

function saveUsage(usage: UsageData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(usage));
}

function App() {
  const [result, setResult] = useState<ExplanationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usage, setUsage] = useState<UsageData>(getUsage);

  const triesLeft = DAILY_LIMIT - usage.count;
  const isLimitReached = triesLeft <= 0;

  const handleExplain = async (query: string) => {
    if (isLimitReached) {
      setError('You have reached your daily limit of 10 queries. Come back tomorrow!');
      return;
    }

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
        if (res.status === 429) {
          throw new Error('Daily limit reached. Come back tomorrow!');
        }
        const err = await res.json();
        throw new Error(err.detail || 'Failed to explain query');
      }

      const data = await res.json();
      setResult(data);

      const newUsage = { date: getTodayString(), count: usage.count + 1 };
      setUsage(newUsage);
      saveUsage(newUsage);

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

        <div className="text-center mb-4">
          {isLimitReached ? (
            <p className="text-red-400 font-medium">
              ❌ Daily limit reached — resets tomorrow
            </p>
          ) : (
            <p className="text-gray-500 text-sm">
              {triesLeft} of {DAILY_LIMIT} free queries remaining today
            </p>
          )}
        </div>

        <QueryInput onExplain={handleExplain} loading={loading} disabled={isLimitReached} />
        {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
        {result && <Explanation data={result} />}
      </div>
    </div>
  );
}

export default App;