export type MovieResponse = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: string;
  results: Array<{
    id: number;
    original_title: string;
    poster_path: string;
  }>;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  total_pages: number;
};

export type CreditsResponse = {
  cast: Array<{
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }>;
};

export type ReviewsResponse = {
  results: Array<{
    id: string;
    author: string;
    content: string;
  }>;
};

export type MediaResponse = {
  results: Array<{
    id: number;
    original_title?: string;
    name?: string;
    title?: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type TvShowResponse = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  videos?: {
    results: Array<{
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
};

export type TvResponse = {
  results: Array<{
    id: number;
    name: string;
    poster_path: string;
  }>;
  total_pages: number;
};

export type PersonResponse = {
  results: Array<{
    id: number;
    name: string;
    profile_path: string;
    known_for_department: string;
  }>;
  total_pages: number;
};

export type SearchResponse = {
  results: Array<{
    id: number;
    name?: string;
    original_title?: string;
    original_name?: string;
    poster_path?: string;
    profile_path?: string;
  }>;
  total_pages: number;
  total_results: number;
};
