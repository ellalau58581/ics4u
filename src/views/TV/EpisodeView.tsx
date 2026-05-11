import { getImageUrl } from '@/core';
import { useTmdb } from '@/hooks/useTmdb';
import { useParams } from 'react-router-dom';

type EpisodeResponse = {
  episodes: Array<{
    id: number;
    name: string;
    overview: string;
    episode_number: number;
    still_path: string;
  }>;
};

export const EpisodeView = () => {
  const { id, seasonNumber } = useParams();

  const { data } = useTmdb<EpisodeResponse>(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="space-y-4 pt-4">
      <h2 className="text-2xl font-bold text-white">Episodes</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {data.episodes.map((episode) => (
          <div key={episode.id} className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900">
            {episode.still_path && <img src={getImageUrl(episode.still_path)} alt={episode.name} className="h-54 w-full object-cover" />}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">
                Episode {episode.episode_number}
                {' — '}
                {episode.name}
              </h3>

              <p className="mt-2 text-sm text-slate-300">{episode.overview || 'No overview available.'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
