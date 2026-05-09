import { DetailItem, LinkGroup, Modal } from '@/components';
import {getBackdropUrl,getImageUrl, TV_ENDPOINT,type TvShowResponse} from '@/core';
import { useTmdb } from '@/hooks/useTmdb';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const TvView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useTmdb<TvShowResponse>(
    `${TV_ENDPOINT}/${id}`,
    {
      append_to_response: 'videos',
    }
  );

  const trailerVideo =
    data?.videos?.results.find(
      (video) =>
        video.site === 'YouTube' &&
        video.type === 'Trailer'
    );

  if (!data) {
    return (
      <p className="text-center text-gray-400">
        Loading...
      </p>
    );
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="grid h-full grid-rows-[auto_1fr]">
        <img
          className="h-50 w-full rounded-2xl object-cover"
          src={getBackdropUrl(data.backdrop_path)}
          alt={data.name}
        />

        <div className="grid min-h-0 grid-cols-[auto_1fr] gap-5 p-5">
          <img
            className="w-50 rounded-xl object-cover"
            src={getImageUrl(data.poster_path)}
            alt={data.name}
          />

          <div className="space-y-4 overflow-y-auto">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              ← Back
            </button>

            <h1 className="text-3xl font-bold">
              {data.name}
            </h1>

            <p className="leading-relaxed text-gray-300">
              {data.overview}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <DetailItem
                label="First Air Date"
                value={data.first_air_date}
              />

              <DetailItem
                label="Rating"
                value={data.vote_average}
              />
            </div>

            {trailerVideo && (
              <div className="aspect-video w-[50%]">
                <iframe
                  className="h-full w-full rounded-xl"
                  src={`https://www.youtube.com/embed/${trailerVideo.key}`}
                  title={trailerVideo.name}
                  allowFullScreen
                />
              </div>
            )}

            <LinkGroup
              options={[
                {
                  label: 'Seasons',
                  to: 'seasons',
                },

                {
                  label: 'Credits',
                  to: 'credits',
                },

                {
                  label: 'Reviews',
                  to: 'reviews',
                },
              ]}
            />

            <Outlet />
          </div>
        </div>
      </div>
    </Modal>
  );
};