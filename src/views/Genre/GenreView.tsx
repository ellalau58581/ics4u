import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import type { ImageCell, MediaResponse } from '@/core';
import { DISCOVER_MOVIE_ENDPOINT, DISCOVER_TV_ENDPOINT, GENRE_MAP, getImageUrl, movieGenres, tvGenres } from '@/core';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTmdb } from '../../hooks/useTmdb';

export const GenreView = () => {
  const { media, genre } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);

  const isMovies = media === 'movies';
  const isTv = media === 'tv';

  const genreOptions = isMovies ? movieGenres : tvGenres;

  let currentGenreId;
  if (isMovies) {
    currentGenreId = GENRE_MAP.movies[genre!];
  } else {
    currentGenreId = GENRE_MAP.tv[genre!];
  }
  console.log(media, genre, currentGenreId);

  const { data } = useTmdb<MediaResponse>(isMovies ? DISCOVER_MOVIE_ENDPOINT : DISCOVER_TV_ENDPOINT, {
    page,
    with_genres: currentGenreId,
  });

  if (!media || !genre || (!isMovies && !isTv)) {
    return <p className="text-center text-gray-400">Invalid route</p>;
  }

  const handleMediaChange = (newMedia: string) => {
    const newGenre = newMedia === 'movies' ? movieGenres[0].value : tvGenres[0].value;

    setPage(1);
    navigate(`/genre/${newMedia}/${newGenre}`);
  };

  const handleGenreChange = (newGenre: string) => {
    setPage(1);
    navigate(`/genre/${media}/${newGenre}`);
  };

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  const gridData: ImageCell[] = data.results.map((result) => ({
    id: result.id,
    imageUrl: getImageUrl(result.poster_path),
    primaryText: result.original_title ?? result.name ?? result.title ?? 'Untitled',
  }));

  const type = isTv ? 'tv' : 'movie';

  return (
    <section className="mx-auto max-w-300 space-y-5 p-5">
      <header className="space-y-4">
        <ButtonGroup
          value={media}
          options={[
            { label: 'Movies', value: 'movies' },
            { label: 'TV', value: 'tv' },
          ]}
          onClick={handleMediaChange}
        />

        <ButtonGroup
          value={genre}
          options={genreOptions.map((item) => ({
            label: item.name,
            value: item.value,
          }))}
          onClick={handleGenreChange}
        />
      </header>

      <ImageGrid images={gridData} onClick={(image) => navigate(`/${type}/${image.id}`)} />

      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
