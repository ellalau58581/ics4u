import { getImageUrl } from '@/core';
import { type ImagesResponse } from '@/core/types/endpoints';
import { useTmdb } from '@/hooks/useTmdb';
import { useParams } from 'react-router-dom';

export const ImagesView = () => {
  const { id } = useParams();

  const { data } = useTmdb<ImagesResponse>(`https://api.themoviedb.org/3/person/${id}/images`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

 return (
  <section className="flex h-full flex-col space-y-5 pt-6">
      <h2 className="text-2xl font-bold text-white">Images</h2>

      <div className="grid max-h-[70vh] grid-cols-2 gap-4 overflow-y-auto pr-2 md:grid-cols-3 lg:grid-cols-4">
        {data.profiles.map((image, index) => (
          <img key={index} src={getImageUrl(image.file_path)} className="rounded-xl object-cover" />
        ))}
      </div>
    </section>
  );
};
