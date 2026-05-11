import { ImageGrid, Pagination } from '@/components';
import { getImageUrl, type MediaResponse } from '@/core';
import { useTmdb } from '@/hooks/useTmdb';
import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const tvTabs = [
  {
    id: 'popular',
    label: 'Popular',
    endpoint: 'https://api.themoviedb.org/3/tv/popular',
  },
  {
    id: 'on-the-air',
    label: 'On The Air',
    endpoint: 'https://api.themoviedb.org/3/tv/on_the_air',
  },
  {
    id: 'top-rated',
    label: 'Top Rated',
    endpoint: 'https://api.themoviedb.org/3/tv/top_rated',
  },
  {
    id: 'airing-today',
    label: 'Airing Today',
    endpoint: 'https://api.themoviedb.org/3/tv/airing_today',
  },
] as const;

type Tab = (typeof tvTabs)[number];

export const TvView = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>(tvTabs[0]);
  const [page, setPage] = useState<number>(1);
  const { data } = useTmdb<MediaResponse>(activeTab.endpoint, { page });
  const gridData = useMemo(
    () =>
      (data?.results ?? []).map((result) => ({
        id: result.id,
        imageUrl: getImageUrl(result.poster_path),
        primaryText: result.name ?? result.title ?? 'Untitled',
        secondaryText: activeTab.label,
      })),
    [data, activeTab.label]
  );

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div>
      <Outlet />

      <section className="mx-auto max-w-300 space-y-6 p-5">
        <div className="flex flex-wrap gap-3">
          {tvTabs.map((tab) => {
            const isActive = activeTab.id === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab);
                  setPage(1);
                }}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  isActive ? 'border-sky-400 bg-sky-500 text-white' : 'border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <ImageGrid images={gridData} onClick={(item) => navigate(`/tv/${item.id}`)} />

        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      </section>
    </div>
  );
};
