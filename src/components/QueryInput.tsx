import { sql } from '@codemirror/lang-sql';
import { oneDark } from '@codemirror/theme-one-dark';
import CodeMirror from '@uiw/react-codemirror';
import { useState } from 'react';
import { DEFAULT_QUERY } from '../constants';

interface Props {
  onExplain: (query: string) => void;
  loading: boolean;
  disabled?: boolean;
  initialQuery?: string;
}

export default function QueryInput({ onExplain, loading, disabled = false, initialQuery }: Props) {
  const [query, setQuery] = useState(initialQuery || DEFAULT_QUERY);

  const isDisabled = loading || disabled;

  return (
    <div className="bg-gray-900 dark:bg-gray-100 p-6 rounded-xl border border-gray-700 dark:border-gray-300">
      <div className="rounded-lg overflow-hidden border border-gray-700 dark:border-gray-300">
        <CodeMirror
          value={query}
          height="200px"
          theme={oneDark}
          extensions={[sql()]}
          onChange={(value) => setQuery(value)}
          editable={!disabled}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: !disabled,
            foldGutter: false,
          }}
        />
      </div>
      <button
        onClick={() => onExplain(query)}
        disabled={isDisabled}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed py-4 rounded-lg font-medium text-lg transition-colors"
      >
        {loading ? '🤔 Analyzing with AI...' : disabled ? '❌ Daily limit reached' : 'Explain This Query'}
      </button>
    </div>
  );
}