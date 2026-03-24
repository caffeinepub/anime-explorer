import { AnimeCard } from "@/components/AnimeCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Navbar } from "@/components/Navbar";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useSearchAnime, useTopAnime } from "@/hooks/useAnime";
import type { Anime, FilterState, SortOption } from "@/types/anime";
import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_FILTERS: FilterState = {
  genres: [],
  status: "all",
  minRating: 0,
};

const SKELETON_KEYS = Array.from({ length: 20 }, (_, i) => `skeleton-${i}`);

export function BrowsePage() {
  const [rawQuery, setRawQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = useCallback((q: string) => {
    setRawQuery(q);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedQuery(q);
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const hasActiveSearch =
    debouncedQuery.length > 0 ||
    filters.genres.length > 0 ||
    filters.status !== "all" ||
    filters.minRating > 0;

  const topAnimeQuery = useTopAnime();
  const searchQuery = useSearchAnime({
    query: debouncedQuery,
    genres: filters.genres,
    status: filters.status,
    minRating: filters.minRating,
    enabled: hasActiveSearch,
  });

  const activeQuery = hasActiveSearch ? searchQuery : topAnimeQuery;
  const isLoading = activeQuery.isLoading;
  const isError = activeQuery.isError;

  let animeList: Anime[] = activeQuery.data?.data ?? [];

  if (sortBy === "rating") {
    animeList = [...animeList].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
  }

  const sectionTitle = debouncedQuery
    ? `Search Results for: "${debouncedQuery}"`
    : filters.genres.length > 0 ||
        filters.status !== "all" ||
        filters.minRating > 0
      ? "Filtered Results"
      : "Top Anime";

  return (
    <div className="min-h-screen" data-ocid="browse.page">
      <Navbar onSearch={handleSearch} searchValue={rawQuery} />

      <main className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="flex gap-6">
          <div className="hidden lg:block w-56 shrink-0">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <motion.h1
                key={sectionTitle}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold"
                style={{ color: "oklch(var(--foreground))" }}
              >
                {sectionTitle}
              </motion.h1>

              <div
                className="flex items-center gap-1 text-sm"
                data-ocid="browse.tab"
              >
                <span style={{ color: "oklch(var(--text-muted))" }}>
                  Sort By:
                </span>
                {(["default", "rating"] as SortOption[]).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className="px-3 py-1 rounded-md font-medium capitalize transition-colors"
                    style={{
                      color:
                        sortBy === opt
                          ? "oklch(var(--brand-accent))"
                          : "oklch(var(--text-secondary))",
                      background:
                        sortBy === opt
                          ? "oklch(var(--brand-accent) / 0.12)"
                          : "transparent",
                    }}
                    onClick={() => setSortBy(opt)}
                    data-ocid={`browse.${opt}.tab`}
                  >
                    {opt === "default" ? "Default" : "Rating"}
                  </button>
                ))}
              </div>
            </div>

            {isError && (
              <div
                className="flex items-center gap-3 rounded-xl p-6 mb-6"
                style={{ background: "oklch(var(--surface))" }}
                data-ocid="browse.error_state"
              >
                <AlertCircle
                  className="h-5 w-5"
                  style={{ color: "oklch(var(--brand-accent))" }}
                />
                <p style={{ color: "oklch(var(--text-secondary))" }}>
                  Failed to load anime. Please try again later.
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
              {isLoading
                ? SKELETON_KEYS.map((k) => <SkeletonCard key={k} />)
                : animeList.map((anime, i) => (
                    <AnimeCard key={anime.mal_id} anime={anime} index={i} />
                  ))}
            </div>

            {!isLoading && !isError && animeList.length === 0 && (
              <div
                className="flex flex-col items-center justify-center py-24 text-center"
                data-ocid="browse.empty_state"
              >
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: "oklch(var(--foreground))" }}
                >
                  No anime found
                </p>
                <p
                  className="text-sm"
                  style={{ color: "oklch(var(--text-muted))" }}
                >
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="mt-16 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <nav
              className="flex flex-wrap gap-x-6 gap-y-2 text-xs"
              style={{ color: "oklch(var(--text-muted))" }}
            >
              {[
                "About Us",
                "Contact",
                "FAQ",
                "Terms of Service",
                "Privacy Policy",
              ].map((link) => (
                <span
                  key={link}
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  {link}
                </span>
              ))}
            </nav>
            <p
              className="text-xs"
              style={{ color: "oklch(var(--text-muted))" }}
            >
              © {new Date().getFullYear()}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Built with ♥ using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
