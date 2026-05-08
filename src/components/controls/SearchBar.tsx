import type { FormEvent, KeyboardEvent } from 'react';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export const SearchBar = ({ value, onChange, onSubmit }: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="search"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
        className="rounded-xl border border-gray-700 bg-gray-800 p-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button type="submit" className="hidden">
        Search
      </button>
    </form>
  );
};
