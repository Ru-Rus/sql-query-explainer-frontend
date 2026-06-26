interface Props {
  dark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity z-50"
      aria-label="Toggle theme"
    >
      {dark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}