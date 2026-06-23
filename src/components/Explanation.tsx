import { useState } from 'react';

interface Props {
  data: {
    explanation: string;
    performance_issues: string[];
    erd_description: string;
    optimizations: string[];
  };
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API not available
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-gray-500 hover:text-gray-300 transition-colors ml-2"
    >
      {copied ? '✅ Copied' : '📋 Copy'}
    </button>
  );
}

export default function Explanation({ data }: Props) {
  return (
    <div className="mt-8 space-y-6">

      <div className="bg-gray-900 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">📝 Explanation</h2>
          <CopyButton text={data.explanation} />
        </div>
        <p className="text-gray-300 leading-relaxed">{data.explanation}</p>
      </div>

      {data.performance_issues && data.performance_issues.length > 0 && (
        <div className="bg-yellow-950 border border-yellow-600 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-yellow-400">⚠️ Performance Issues</h2>
            <CopyButton text={data.performance_issues.join('\n')} />
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {data.performance_issues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">🗃️ ERD Description</h2>
          <CopyButton text={data.erd_description} />
        </div>
        <p className="text-gray-300">{data.erd_description}</p>
      </div>

      {data.optimizations && data.optimizations.length > 0 && (
        <div className="bg-gray-900 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">🚀 Optimizations</h2>
            <CopyButton text={data.optimizations.join('\n')} />
          </div>
          <ul className="list-disc pl-5 space-y-1 text-emerald-400">
            {data.optimizations.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}