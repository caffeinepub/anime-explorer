export interface AnimeImage {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp?: {
    image_url: string;
    large_image_url: string;
  };
}

export interface AnimeGenre {
  mal_id: number;
  name: string;
}

export interface AnimeStudio {
  mal_id: number;
  name: string;
}

export interface AnimeTrailer {
  youtube_id?: string;
  url?: string;
  embed_url?: string;
}

export interface Anime {
  mal_id: number;
  title: string;
  title_english?: string;
  images: AnimeImage;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  status: string;
  episodes?: number;
  genres: AnimeGenre[];
  synopsis?: string;
  year?: number;
  season?: string;
  studios: AnimeStudio[];
  trailer?: AnimeTrailer;
  source?: string;
  rating?: string;
  duration?: string;
  type?: string;
  aired?: {
    string?: string;
    from?: string;
    to?: string;
  };
}

export interface AnimeRecommendation {
  entry: {
    mal_id: number;
    title: string;
    images: AnimeImage;
  };
  votes: number;
}

export interface JikanResponse<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export interface FilterState {
  genres: number[];
  status: string;
  minRating: number;
}

export type SortOption = "default" | "rating";

export const GENRE_MAP: Record<string, number> = {
  Action: 1,
  Adventure: 2,
  Comedy: 4,
  Drama: 8,
  Fantasy: 10,
  Horror: 14,
  Mystery: 7,
  Romance: 22,
  "Sci-Fi": 24,
  "Slice of Life": 36,
  Sports: 30,
  Supernatural: 37,
};
