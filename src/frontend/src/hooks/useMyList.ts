import type { Anime } from "@/types/anime";
import { useEffect, useState } from "react";

const STORAGE_KEY = "animeflix_mylist";

export function useMyList() {
  const [list, setList] = useState<Anime[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  const add = (anime: Anime) => {
    setList((prev) => {
      if (prev.some((a) => a.mal_id === anime.mal_id)) return prev;
      return [...prev, anime];
    });
  };

  const remove = (id: number) => {
    setList((prev) => prev.filter((a) => a.mal_id !== id));
  };

  const isInList = (id: number) => list.some((a) => a.mal_id === id);

  return { list, add, remove, isInList };
}
