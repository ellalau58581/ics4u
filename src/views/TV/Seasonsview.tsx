import { useTmdb } from '@/hooks/useTmdb';
import { useNavigate, useParams } from 'react-router-dom';

type SeasonResponse = {
  seasons: Array<{
    id: number;
    season_number: number;
    name: string;
    poster_path: string;
    episode_count: number;
  }>;
};

export const SeasonsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<SeasonResponse>(`https://api.themoviedb.org/3/tv/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <div className="space-y-4 pt-4">
      <h2 className="text-2xl font-bold text-white">Seasons</h2>

      <div className="grid gap-4">
        {data.seasons.map((season) => (
          <button
            key={season.id}
            onClick={() => navigate(`/tv/${id}/season/${season.season_number}`)}
            className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-left transition hover:bg-slate-800"
          >
            <h3 className="text-lg font-semibold text-white">{season.name}</h3>

            <p className="text-sm text-slate-400">{season.episode_count} Episodes</p>
          </button>
        ))}
      </div>
    </div>
  );
};
