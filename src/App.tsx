import { MainLayout } from '@/layouts';
import { CreditsView, ErrorView, GenreView, HomeView, MovieView, MoviesView, ReviewsView, SearchView, TrendingView } from '@/views';

import { Route, Routes } from 'react-router-dom';
import { TVView } from './views/TV/TvView';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />

      <Route element={<MainLayout />}>
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/tv" element={<TVView />} />
        <Route path="/movie/:id" element={<MovieView />}>
          {' '}
          //dynamicroute for id, id changes/ambiguous
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
        <Route path="/genre/:media/:genre" element={<GenreView />} />
      </Route>

      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
