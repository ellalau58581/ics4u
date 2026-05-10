import { MainLayout } from '@/layouts';
import {
  CreditsView,
  EpisodeView,
  ErrorView,
  GenreView,
  HomeView,
  MovieView,
  MoviesView,
  ReviewsView,
  SearchView,
  SeasonsView,
  TrendingView,
  TvDetailView,
  TvView,
} from '@/views';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeView />} />

      <Route element={<MainLayout />}>
        <Route path="/trending" element={<TrendingView />} />
        <Route path="/search" element={<SearchView />} />
        <Route path="/movies" element={<MoviesView />} />
        <Route path="/tv" element={<TvView />} />
        <Route path="tv/:id" element={<TvDetailView />}>
          <Route path="seasons" element={<SeasonsView />} />
          <Route path="season/:seasonNumber" element={<EpisodeView />} />
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
        <Route path="/movie/:id" element={<MovieView />}>
          <Route path="credits" element={<CreditsView />} />
          <Route path="reviews" element={<ReviewsView />} />
        </Route>
        <Route path="/genre/:media/:genre" element={<GenreView />} />
      </Route>

      <Route path="*" element={<ErrorView />} />
    </Routes>
  );
};
