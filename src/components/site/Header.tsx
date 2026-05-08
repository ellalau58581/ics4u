import { ButtonGroup, LinkGroup, SearchBar } from '@/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchType = 'movie' | 'tv' | 'person';

export const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('movie');

  const handleSearchSubmit = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}&type=${searchType}`);
    }
  };

  const handleSearchTypeChange = (type: SearchType) => {
    setSearchType(type);
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&type=${type}`);
    }
  };

  return (
    <header className="border-b border-gray-700 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl space-y-2 p-5">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">TMDB Explorer</h1>
          <LinkGroup
            options={[
              { label: 'Movies', to: '/movies' },
              { label: 'TV', to: '/tv' },
              { label: 'Genre', to: '/genre/movies/action' },
              { label: 'Trending', to: '/trending?interval=day' },
            ]}
          />
          <div className="ml-auto flex items-center gap-4">
            <ButtonGroup
              value={searchType}
              options={[
                { label: 'Movie', value: 'movie' },
                { label: 'TV', value: 'tv' },
                { label: 'Person', value: 'person' },
              ]}
              onClick={(value) => handleSearchTypeChange(value as SearchType)}
            />
            <SearchBar value={searchQuery} onChange={setSearchQuery} onSubmit={handleSearchSubmit} />
          </div>
        </div>
      </div>
    </header>
  );
};
