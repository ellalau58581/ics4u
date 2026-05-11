import { ImageGrid } from '@/components';
import { getImageUrl, type ImageCell } from '@/core';
import { useTmdb } from '@/hooks/useTmdb';
import { useNavigate, useParams } from 'react-router-dom';

type CareerResponse = {
  cast: Array<{
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    media_type: string;
  }>;
};

export const CareerView = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data } = useTmdb<CareerResponse>(`https://api.themoviedb.org/3/person/${id}/combined_credits`, {});

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const gridData: ImageCell[] = data.cast
    .filter((item) => item.poster_path)
    .map((item) => ({
      id: item.id,
      imageUrl: getImageUrl(item.poster_path),
      primaryText: item.title ?? item.name ?? 'Untitled',
      secondaryText: item.media_type,
    }));

  return (
    <section className="space-y-5 pt-6">
      <h2 className="text-2xl font-bold text-white">Career</h2>

      <ImageGrid images={gridData} onClick={(image) => navigate(`/${image.secondaryText}/${image.id}`)} />
    </section>
  );
};
