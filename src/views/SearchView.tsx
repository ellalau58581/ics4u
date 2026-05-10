import { ImageGrid, Pagination } from '@/components';
import {
  type ImageCell,
  type MovieResponse,
  type PersonResponse,
  type TvResponse,
  getImageUrl,
  RATE_LIMIT_DELAY,
  SEARCH_MOVIE_ENDPOINT,
  SEARCH_PERSON_ENDPOINT,
  SEARCH_TV_ENDPOINT,
} from '@/core';
import { useDebounce, useTmdb } from '@/hooks';
import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type SearchType = 'movie' | 'tv' | 'person';

export const SearchView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const query = searchParams.get('q') || '';
  const searchType = (searchParams.get('type') as SearchType) || 'movie';
  const debouncedQuery = useDebounce(query, RATE_LIMIT_DELAY);

  const endpoint = useMemo(() => {
    switch (searchType) {
      case 'tv':
        return SEARCH_TV_ENDPOINT;
      case 'person':
        return SEARCH_PERSON_ENDPOINT;
      default:
        return SEARCH_MOVIE_ENDPOINT;
    }
  }, [searchType]);

  const { data } = useTmdb<MovieResponse | TvResponse | PersonResponse>(endpoint, { query: debouncedQuery, page });

  type SearchResult = {
    id: number;
    name?: string;
    original_title?: string;
    poster_path?: string;
    profile_path?: string;
  };

  const gridData: ImageCell[] = useMemo(() => {
    if (!data?.results) return [];

    return (data.results as SearchResult[]).map((result) => {
      if (searchType === 'person') {
        return {
          id: result.id,
          imageUrl: getImageUrl(result.profile_path ?? ''),
          primaryText: result.name || 'Unknown',
          secondaryText: 'Person',
        };
      } else {
        return {
          id: result.id,
          imageUrl: getImageUrl(result.poster_path ?? ''),
          primaryText: result.original_title || result.name || 'Untitled',
          secondaryText: searchType === 'tv' ? 'TV Show' : 'Movie',
        };
      }
    });
  }, [data, searchType]);

  const handleItemClick = (image: ImageCell) => {
    setPage(1);
    if (searchType === 'person') {
      navigate(`/person/${image.id}`);
    } else if (searchType === 'tv') {
      navigate(`/tv/${image.id}`);
    } else {
      navigate(`/movie/${image.id}/credits`);
    }
  };

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-5 p-5">
      <h1 className="mb-4 text-3xl font-bold">Search Results</h1>
      <div className="mb-4">
        <p className="text-gray-300">
          Searching for "{query}" in {searchType === 'movie' ? 'Movies' : searchType === 'tv' ? 'TV Shows' : 'People'}
        </p>
      </div>
      <ImageGrid images={gridData} onClick={handleItemClick} />
      {data.results && data.results.length ? (
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      ) : (
        <p className="text-center text-gray-400">No search results found.</p>
      )}
    </section>
  );
};
