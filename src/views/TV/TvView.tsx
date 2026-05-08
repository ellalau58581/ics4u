import { ImageGrid } from '@/components/controls/images/ImageGrid';
import { Pagination } from '@/components/controls/Pagination';
import { TVSubheader } from '@/components/controls/TVSubheader';
import type { ImageCell, TvResponse } from '@/core';
import { getImageUrl } from '@/core';
import { useTmdb } from '@/hooks/useTmdb';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AIRINGTODAY_ENDPOINT, DISCOVER_TV_ENDPOINT, ONTHEAIR_ENDPOINT, TOPRATED_ENDPOINT } from '@/core/constants/endpoints';

const tvTabs = [
  { label: 'Discover', endpoint: DISCOVER_TV_ENDPOINT },
  { label: 'Airing Today', endpoint: AIRINGTODAY_ENDPOINT },
  { label: 'On The Air', endpoint: ONTHEAIR_ENDPOINT },
  { label: 'Top Rated', endpoint: TOPRATED_ENDPOINT },
];

export const TVView = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(tvTabs[0]);

  const { data } = useTmdb<TvResponse>(activeTab.endpoint, { page });

  const gridData = useMemo<ImageCell[]>(
    () =>
      (data?.results ?? []).map((item) => ({
        id: item.id,
        imageUrl: getImageUrl(item.poster_path),
        primaryText: item.name,
        secondaryText: activeTab.label,
      })),
    [data, activeTab.label]
  );

  const handleTabChange = (endpoint: string) => {
    const selected = tvTabs.find((t) => t.endpoint === endpoint);
    if (!selected) return;

    setPage(1);
    setActiveTab(selected);
  };

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="space-y-6 p-5">
      <TVSubheader value={activeTab.endpoint} options={tvTabs} onClick={(endpoint) => handleTabChange(endpoint)} />

      <ImageGrid images={gridData} onClick={(item) => navigate(`/tv/${item.id}`)} />

      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
