import { DetailItem, LinkGroup, Modal } from '@/components';
import { getImageUrl, type PersonDetailResponse } from '@/core';
import { useTmdb } from '@/hooks/useTmdb';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const PersonView = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = useTmdb<PersonDetailResponse>(`https://api.themoviedb.org/3/person/${id}`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <Modal onClick={() => navigate(-1)}>
      <div className="space-y-6 p-6 text-white">
        <button
          onClick={() => navigate(-1)}
          className="rounded-full border border-slate-600 bg-slate-900 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800"
        >
          ← Back
        </button>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <img src={getImageUrl(data.profile_path)} alt={data.name} className="w-full rounded-2xl object-cover" />

          <div className="space-y-5">
            <div>
              <h1 className="text-4xl font-bold">{data.name}</h1>

              <p className="mt-2 text-slate-400">{data.known_for_department}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DetailItem label="Birthday" value={data.birthday} />

              <DetailItem label="Birth Place" value={data.place_of_birth} />
            </div>

            <div>
              <div className="pt-4">
                <LinkGroup
                  options={[
                    {
                      label: 'Career',
                      to: 'career',
                    },

                    {
                      label: 'Images',
                      to: 'images',
                    },
                  ]}
                />
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
