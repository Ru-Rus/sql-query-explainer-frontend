import { useState } from 'react';
import QueryInput from './components/QueryInput';
import Explanation from './components/Explanation';
import { explainQuery, type ExplanationData } from './api';

const DAILY_LIMIT = 10;
const STORAGE_KEY = 'sql_explainer_usage';

interface UsageData {
  date: string;
  count: number;
}

interface HistoryEntry {
  query: string;
  result: ExplanationData;
  timestamp: string;
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

function getHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem('sql_explainer_history');
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryEntry[]): void {
  localStorage.setItem('sql_explainer_history', JSON.stringify(history));
}

function App() {
  const [result, setResult] = useState<ExplanationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [usage, setUsage] = useState<UsageData>(getUsage);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory);
  const [showHistory, setShowHistory] = useState(false);

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
      const data = await explainQuery(query);
      setResult(data);

      // Save to history (keep last 10)
      const entry: HistoryEntry = {
        query,
        result: data,
        timestamp: new Date().toLocaleString()
      };
      const newHistory = [entry, ...history].slice(0, 10);
      setHistory(newHistory);
      saveHistory(newHistory);

      // Increment usage count
      const newUsage = { date: getTodayString(), count: usage.count + 1 };
      setUsage(newUsage);
      saveUsage(newUsage);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to explain query');
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (entry: HistoryEntry) => {
    setResult(entry.result);
    setError('');
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">🔍 AI SQL Query Explainer</h1>
        <p className="text-center text-gray-400 mb-8">Paste your SQL query • Powered by Gemini</p>

        {/* Usage counter */}
        <div className="text-center mb-4">
          {isLimitReached ? (
            <p className="text-red-400 font-medium">❌ Daily limit reached — resets tomorrow</p>
          ) : (
            <p className="text-gray-500 text-sm">
              {triesLeft} of {DAILY_LIMIT} free queries remaining today
            </p>
          )}
        </div>

        <QueryInput onExplain={handleExplain} loading={loading} disabled={isLimitReached} />

        {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}

        {/* History toggle */}
        {history.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                {showHistory ? '▲ Hide History' : `▼ Show History (${history.length})`}
              </button>
              {showHistory && (
                <button
                  onClick={handleClearHistory}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Clear
                </button>
              )}
            </div>

            {showHistory && (
              <div className="space-y-2">
                {history.map((entry, i) => (
                  <button
                    key={i}
                    onClick={() => handleHistorySelect(entry)}
                    className="w-full text-left bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 transition-colors"
                  >
                    <p className="text-green-400 font-mono text-sm truncate">{entry.query}</p>
                    <p className="text-gray-500 text-xs mt-1">{entry.timestamp}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {result && <Explanation data={result} />}
      </div>
    </div>
  );
}

export default App;