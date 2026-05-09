import { ImageGrid } from '@/components';
import { getImageUrl } from '@/core';
import { NOW_PLAYING_ENDPOINT, POPULAR_ENDPOINT, TOP_RATED_ENDPOINT, UPCOMING_ENDPOINT } from '@/core/constants/endpoints';
import type { MediaResponse } from '@/core/types/endpoints';
import { useTmdb } from '@/hooks/useTmdb';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const categories = [
  {
    id: 'now-playing',
    label: 'Now Playing',
    endpoint: NOW_PLAYING_ENDPOINT,
  },

  {
    id: 'popular',
    label: 'Popular',
    endpoint: POPULAR_ENDPOINT,
  },

  {
    id: 'upcoming',
    label: 'Upcoming',
    endpoint: UPCOMING_ENDPOINT,
  },

  {
    id: 'top-rated',
    label: 'Top Rated',
    endpoint: TOP_RATED_ENDPOINT,
  },
] as const;

type Category = (typeof categories)[number];

export const MoviesView = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);
  const { data } = useTmdb<MediaResponse>(activeCategory.endpoint, { page: 1 });
  const movies = useMemo(() => data?.results ?? [], [data]);
  const images = useMemo(
    () =>
      movies.map((movie) => ({
        id: movie.id,
        imageUrl: getImageUrl(movie.poster_path),
        primaryText: movie.original_title ?? 'Untitled',
        secondaryText: activeCategory.label,
      })),
    [movies, activeCategory.label]
  );

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-lg text-slate-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl space-y-8 px-5 py-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = activeCategory.id === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive ? 'border-sky-400 bg-sky-500 text-white' : 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm tracking-[0.3em] text-slate-400 uppercase">Movie Gallery</p>

            <h1 className="text-4xl font-bold">{activeCategory.label}</h1>
          </div>

          <ImageGrid
          images={images}
          onClick={(image) => navigate(`/movie/${image.id}`)}/>
        </div>
      </div>
    </div>
  );
};
