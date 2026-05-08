type TVSubheaderProps = {
  value: string;
  options: Array<{ label: string; endpoint: string }>;
  onClick: (endpoint: string) => void;
};

export const TVSubheader = ({ value, options, onClick }: TVSubheaderProps) => {
  return (
    <header>
      <nav className="flex flex-wrap gap-3 bg-gray-600 p-4">
        {options.map((option) => (
          <button
            key={option.endpoint}
            type="button"
            onClick={() => onClick(option.endpoint)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              value === option.endpoint ? 'bg-white text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {option.label}
          </button>
        ))}
      </nav>
    </header>
  );
};
