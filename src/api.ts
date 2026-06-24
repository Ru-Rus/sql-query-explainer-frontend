const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ExplanationData {
  explanation: string;
  performance_issues: string[];
  erd_description: string;
  optimizations: string[];
}

export async function explainQuery(query: string): Promise<ExplanationData> {
  const res = await fetch(`${API_URL}/api/explain`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });

  if (!res.ok) {
    if (res.status === 429) {
      throw new Error('Daily limit reached. Come back tomorrow!');
    }
    let detail = 'Failed to explain query';
    try {
      const err = await res.json();
      detail = err.detail || detail;
    } catch {
      // response body wasn't JSON (e.g. proxy HTML error page)
    }
    throw new Error(detail);
  }

  return res.json();
}