import { ImageGrid } from '@/components';
import { getImageUrl } from '@/core';
import { NOW_PLAYING_ENDPOINT, POPULAR_ENDPOINT, TOP_RATED_ENDPOINT, UPCOMING_ENDPOINT } from '@/core/constants/endpoints';
import type { MediaResponse } from '@/core/types/endpoints';
import { useTmdb } from '@/hooks/useTmdb';
import { useMemo, useState } from 'react';

const categories = [
  {
    id: 'now-playing',
    label: 'Now Playing',
    endpoint: NOW_PLAYING_ENDPOINT,
    description: 'Fresh theatrical releases and the latest cinema favorites.',
  },
  {
    id: 'popular',
    label: 'Popular',
    endpoint: POPULAR_ENDPOINT,
    description: 'The most-watched movies lighting up the global box office.',
  },
  {
    id: 'upcoming',
    label: 'Upcoming',
    endpoint: UPCOMING_ENDPOINT,
    description: 'Eye-catching premieres and next-season blockbusters.',
  },
  {
    id: 'top-rated',
    label: 'Top Rated',
    endpoint: TOP_RATED_ENDPOINT,
    description: 'Critically acclaimed favorites with audience-led praise.',
  },
] as const;

type Category = (typeof categories)[number];

export const MoviesView = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(categories[0]);
  //   const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data } = useTmdb<MediaResponse>(activeCategory.endpoint, { page: 1 });
  const movies = useMemo(() => data?.results ?? [], [data]);
  const featuredMovie = movies[0];
  const images = useMemo(
    () =>
      movies.map((movie) => ({
        id: movie.id,
        imageUrl: getImageUrl(movie.poster_path),
        primaryText: movie.original_title,
        secondaryText: activeCategory.label,
      })),
    [movies, activeCategory.label]
  );

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="rounded-3xl border border-slate-700/80 bg-slate-900/80 px-8 py-6 text-lg text-slate-300 shadow-xl shadow-slate-900/50">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(22,75,141,0.18),_rgba(4,14,35,1))] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 overflow-hidden rounded-[2rem] border border-slate-500/20 bg-slate-950/80 p-6 shadow-[0_40px_120px_rgba(8,20,55,0.65)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="rounded-full bg-slate-900/90 px-4 py-2 text-sm tracking-[0.35em] text-sky-300 uppercase shadow-lg shadow-sky-500/10">
                Disney-style movie lounge
              </p>
              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-100 sm:text-5xl">Movies by category</h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Hover over the Movies button to explore curated TMDB lists: Now Playing, Popular, Upcoming, and Top Rated.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = activeCategory.id === category.id;

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                className={`relative rounded-full border px-5 py-2.5 text-sm font-semibold backdrop-blur-md transition-all duration-300 ${
                  isActive
                    ? 'border-sky-300/50 bg-sky-400/20 text-sky-200 shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                    : 'border-slate-600/40 bg-slate-900/80 text-slate-300 hover:border-slate-400 hover:bg-slate-800/90 hover:text-white'
                } `}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.75fr]">
          <section className="space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-600/40 bg-slate-950/80 shadow-[0_30px_90px_rgba(7,18,41,0.55)]">
              {featuredMovie ? (
                <img
                  src={getImageUrl(featuredMovie.poster_path)}
                  alt={featuredMovie.original_title}
                  className="h-[520px] w-full object-cover"
                />
              ) : (
                <div className="flex h-[520px] items-center justify-center bg-slate-900 text-slate-400">No featured movie available</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
              <div className="absolute right-6 bottom-6 left-6 rounded-3xl border border-white/10 bg-slate-950/75 p-6 backdrop-blur-xl">
                <p className="text-sm tracking-[0.3em] text-sky-300/80 uppercase">Featured</p>
                <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
                  {featuredMovie?.original_title ?? activeCategory.label}
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Discover this selection from the {activeCategory.label} list, handpicked for cinematic impact and irresistible
                  storytelling.
                </p>
              </div>
            </div>

            <div className="grid gap-4 rounded-[2rem] border border-slate-700/50 bg-slate-950/70 p-6 shadow-[0_20px_60px_rgba(7,18,41,0.45)]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm tracking-[0.35em] text-slate-400 uppercase">Category</p>
                  <h3 className="text-2xl font-semibold text-white">{activeCategory.label}</h3>
                </div>
                <span className="rounded-full bg-slate-900/80 px-4 py-2 text-sm font-medium text-sky-200 shadow-inner shadow-slate-950/20">
                  {movies.length} titles
                </span>
              </div>
              <p className="text-slate-300">{activeCategory.description}</p>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-700/50 bg-slate-950/80 p-6 shadow-[0_20px_60px_rgba(7,18,41,0.45)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm tracking-[0.35em] text-slate-400 uppercase">Your next watch</p>
                  <h3 className="text-xl font-semibold text-white">Browse the gallery</h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-2 text-xs text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Live
                </div>
              </div>
              <p className="mt-4 text-slate-400">Hover over Movies and select a list to refresh the selection instantly.</p>
            </div>

            <div className="rounded-[2rem] border border-slate-700/50 bg-slate-950/80 p-6 shadow-[0_20px_60px_rgba(7,18,41,0.45)]">
              <h4 className="text-lg font-semibold text-white">Why these categories?</h4>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li className="flex gap-3 text-sm">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" /> Now Playing highlights current box office favorites.
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" /> Popular tracks audience buzz and trending theatrical hits.
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" /> Upcoming previews future releases and blockbuster
                  anticipation.
                </li>
                <li className="flex gap-3 text-sm">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-400" /> Top Rated surfaces the most celebrated films from TMDB
                  users.
                </li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-700/50 bg-slate-950/80 p-6 shadow-[0_20px_80px_rgba(7,18,41,0.55)]">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm tracking-[0.35em] text-slate-400 uppercase">Movie gallery</p>
              <h2 className="text-3xl font-semibold text-white">{activeCategory.label} selections</h2>
            </div>
            <p className="text-sm text-slate-400">Hover the button again to switch categories anytime.</p>
          </div>
          <ImageGrid images={images} />
        </div>
      </div>
    </div>
  );
};
