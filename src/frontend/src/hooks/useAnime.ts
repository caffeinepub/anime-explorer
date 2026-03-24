import type { Anime, AnimeRecommendation, JikanResponse } from "@/types/anime";
import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://api.jikan.moe/v4";

async function jikanFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Jikan API error: ${res.status}`);
  return res.json();
}

export function useTopAnime() {
  return useQuery<JikanResponse<Anime[]>>({
    queryKey: ["top-anime"],
    queryFn: () => jikanFetch(`${BASE_URL}/top/anime?limit=24`),
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchAnime(params: {
  query: string;
  genres: number[];
  status: string;
  minRating: number;
  enabled: boolean;
}) {
  const { query, genres, status, minRating, enabled } = params;

  const searchParams = new URLSearchParams();
  searchParams.set("limit", "24");
  if (query) searchParams.set("q", query);
  if (genres.length > 0) searchParams.set("genres", genres.join(","));
  if (status && status !== "all") searchParams.set("status", status);
  if (minRating > 0) searchParams.set("min_score", String(minRating));

  return useQuery<JikanResponse<Anime[]>>({
    queryKey: ["search-anime", query, genres, status, minRating],
    queryFn: () => jikanFetch(`${BASE_URL}/anime?${searchParams.toString()}`),
    enabled,
    staleTime: 2 * 60 * 1000,
  });
}

export function useAnimeDetail(id: number) {
  return useQuery<JikanResponse<Anime>>({
    queryKey: ["anime-detail", id],
    queryFn: () => jikanFetch(`${BASE_URL}/anime/${id}/full`),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}

export function useAnimeRecommendations(id: number) {
  return useQuery<JikanResponse<AnimeRecommendation[]>>({
    queryKey: ["anime-recommendations", id],
    queryFn: () => jikanFetch(`${BASE_URL}/anime/${id}/recommendations`),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
}
