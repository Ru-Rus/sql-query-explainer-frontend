interface Props {
  data: {
    explanation: string;
    performance_issues: string[];
    erd_description: string;
    optimizations: string[];
  };
}

export default function Explanation({ data }: Props) {
  return (
    <div className="mt-8 space-y-6">
      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-3">📝 Explanation</h2>
        <p className="text-gray-300 leading-relaxed">{data.explanation}</p>
      </div>

      {data.performance_issues && data.performance_issues.length > 0 && (
        <div className="bg-yellow-950 border border-yellow-600 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3 text-yellow-400">⚠️ Performance Issues</h2>
          <ul className="list-disc pl-5 space-y-1">
            {data.performance_issues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-3">🗃️ ERD Description</h2>
        <p className="text-gray-300">{data.erd_description}</p>
      </div>

      {data.optimizations && data.optimizations.length > 0 && (
        <div className="bg-gray-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">🚀 Optimizations</h2>
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