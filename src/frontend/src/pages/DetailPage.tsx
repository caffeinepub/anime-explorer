import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnimeDetail, useAnimeRecommendations } from "@/hooks/useAnime";
import { useMyList } from "@/hooks/useMyList";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  ExternalLink,
  PlayCircle,
  Star,
  Tv,
} from "lucide-react";
import { motion } from "motion/react";

export function DetailPage() {
  const { id } = useParams({ from: "/anime/$id" });
  const navigate = useNavigate();
  const animeId = Number(id);

  const { data: detailData, isLoading, isError } = useAnimeDetail(animeId);
  const { data: recsData } = useAnimeRecommendations(animeId);
  const { add, remove, isInList } = useMyList();

  const anime = detailData?.data;
  const recommendations = recsData?.data?.slice(0, 6) ?? [];
  const saved = anime ? isInList(anime.mal_id) : false;

  if (isLoading) {
    return (
      <div className="min-h-screen" data-ocid="detail.loading_state">
        <div
          className="h-16 border-b border-border"
          style={{ background: "oklch(var(--header))" }}
        />
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <div className="flex gap-8">
            <Skeleton
              className="w-64 rounded-xl"
              style={{ aspectRatio: "2/3" }}
            />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-2/3 rounded-lg" />
              <Skeleton className="h-4 w-1/3 rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !anime) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        data-ocid="detail.error_state"
      >
        <p style={{ color: "oklch(var(--text-secondary))" }}>
          Failed to load anime details.
        </p>
      </div>
    );
  }

  const title = anime.title_english || anime.title;
  const imageUrl =
    anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;
  const statusLabel =
    anime.status === "Currently Airing"
      ? "Ongoing"
      : anime.status === "Finished Airing"
        ? "Completed"
        : anime.status;

  const handleMyList = () => {
    if (saved) {
      remove(anime.mal_id);
    } else {
      add(anime);
    }
  };

  const crunchyrollSearchUrl = `https://www.crunchyroll.com/search?q=${encodeURIComponent(title)}`;

  return (
    <div className="min-h-screen" data-ocid="detail.page">
      <header
        className="sticky top-0 z-50 border-b border-border"
        style={{ background: "oklch(var(--header))" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 h-16 flex items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground"
            style={{ color: "oklch(var(--text-secondary))" }}
            onClick={() => navigate({ to: "/" })}
            data-ocid="detail.button"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </button>
          <span
            className="text-xl font-bold tracking-widest uppercase ml-4"
            style={{ color: "oklch(var(--foreground))" }}
          >
            ANIMEFLIX
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row gap-8 mb-12"
        >
          <div className="shrink-0 w-full md:w-64">
            <img
              src={imageUrl}
              alt={title}
              className="w-full rounded-xl shadow-card object-cover"
              style={{ aspectRatio: "2/3" }}
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1
                className="text-3xl font-bold leading-tight mb-1"
                style={{ color: "oklch(var(--foreground))" }}
              >
                {title}
              </h1>
              {anime.title_english && anime.title_english !== anime.title && (
                <p
                  className="text-base"
                  style={{ color: "oklch(var(--text-secondary))" }}
                >
                  {anime.title}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {anime.score && (
                <div className="flex items-center gap-1.5">
                  <Star
                    className="h-5 w-5 fill-current"
                    style={{ color: "oklch(var(--star-gold))" }}
                  />
                  <span
                    className="font-bold text-lg"
                    style={{ color: "oklch(var(--foreground))" }}
                  >
                    {anime.score.toFixed(1)}
                  </span>
                  {anime.scored_by && (
                    <span
                      className="text-sm"
                      style={{ color: "oklch(var(--text-muted))" }}
                    >
                      ({anime.scored_by.toLocaleString()} votes)
                    </span>
                  )}
                </div>
              )}
              {anime.episodes && (
                <div className="flex items-center gap-1.5">
                  <Tv
                    className="h-4 w-4"
                    style={{ color: "oklch(var(--text-muted))" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    {anime.episodes} Episodes
                  </span>
                </div>
              )}
              {anime.duration && (
                <div className="flex items-center gap-1.5">
                  <Clock
                    className="h-4 w-4"
                    style={{ color: "oklch(var(--text-muted))" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    {anime.duration}
                  </span>
                </div>
              )}
              {anime.year && (
                <div className="flex items-center gap-1.5">
                  <Calendar
                    className="h-4 w-4"
                    style={{ color: "oklch(var(--text-muted))" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "oklch(var(--text-secondary))" }}
                  >
                    {anime.season
                      ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} `
                      : ""}
                    {anime.year}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                className="text-xs"
                style={{
                  background: "oklch(var(--brand-accent) / 0.2)",
                  color: "oklch(var(--brand-accent))",
                  border: "none",
                }}
              >
                {statusLabel}
              </Badge>
              {anime.type && (
                <Badge
                  className="text-xs"
                  style={{
                    background: "oklch(var(--chip-bg))",
                    color: "oklch(var(--chip-text))",
                    border: "none",
                  }}
                >
                  {anime.type}
                </Badge>
              )}
              {anime.source && (
                <Badge
                  className="text-xs"
                  style={{
                    background: "oklch(var(--chip-bg))",
                    color: "oklch(var(--chip-text))",
                    border: "none",
                  }}
                >
                  {anime.source}
                </Badge>
              )}
            </div>

            {anime.genres && anime.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((g) => (
                  <span
                    key={g.mal_id}
                    className="text-xs font-medium rounded-full px-3 py-1"
                    style={{
                      background: "oklch(var(--chip-bg))",
                      color: "oklch(var(--chip-text))",
                    }}
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {anime.studios && anime.studios.length > 0 && (
              <p
                className="text-sm"
                style={{ color: "oklch(var(--text-secondary))" }}
              >
                <span style={{ color: "oklch(var(--text-muted))" }}>
                  Studio:{" "}
                </span>
                {anime.studios.map((s) => s.name).join(", ")}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              {anime.trailer?.youtube_id && (
                <a
                  href={`https://www.youtube.com/watch?v=${anime.trailer.youtube_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{
                    background: "oklch(var(--brand-accent))",
                    color: "oklch(var(--foreground))",
                  }}
                  data-ocid="detail.button"
                >
                  <PlayCircle className="h-4 w-4" />
                  Watch Trailer
                </a>
              )}
              <a
                href={crunchyrollSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{
                  background: "#f47521",
                  color: "#ffffff",
                }}
                data-ocid="detail.crunchyroll_button"
              >
                <ExternalLink className="h-4 w-4" />
                Watch on Crunchyroll
              </a>
              <button
                type="button"
                onClick={handleMyList}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
                style={{
                  background: saved
                    ? "oklch(var(--brand-accent) / 0.15)"
                    : "oklch(var(--surface))",
                  color: saved
                    ? "oklch(var(--brand-accent))"
                    : "oklch(var(--text-secondary))",
                  border: saved
                    ? "1px solid oklch(var(--brand-accent) / 0.5)"
                    : "1px solid oklch(var(--border))",
                }}
                data-ocid="detail.toggle"
              >
                <Bookmark
                  className="h-4 w-4"
                  style={saved ? { fill: "oklch(var(--brand-accent))" } : {}}
                />
                {saved ? "Remove from List" : "Add to My List"}
              </button>
            </div>
          </div>
        </motion.div>

        {anime.trailer?.youtube_id && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="mb-12"
            data-ocid="detail.section"
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Official Trailer
            </h2>
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: "oklch(var(--surface))" }}
            >
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                  title={`${title} — Official Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full rounded-xl"
                  style={{ border: "none" }}
                />
              </div>
            </div>
          </motion.section>
        )}

        {anime.synopsis && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-12"
            data-ocid="detail.section"
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Synopsis
            </h2>
            <div
              className="rounded-xl p-6"
              style={{ background: "oklch(var(--surface))" }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(var(--text-secondary))" }}
              >
                {anime.synopsis}
              </p>
            </div>
          </motion.section>
        )}

        {recommendations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            data-ocid="detail.section"
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: "oklch(var(--foreground))" }}
            >
              Related Shows
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendations.map((rec, i) => (
                <motion.div
                  key={rec.entry.mal_id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="cursor-pointer rounded-xl overflow-hidden group"
                  style={{ background: "oklch(var(--card))" }}
                  onClick={() => navigate({ to: `/anime/${rec.entry.mal_id}` })}
                  data-ocid={`detail.item.${i + 1}`}
                >
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: "2/3" }}
                  >
                    <img
                      src={
                        rec.entry.images?.jpg?.large_image_url ||
                        rec.entry.images?.jpg?.image_url
                      }
                      alt={rec.entry.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-2">
                    <p
                      className="text-xs font-medium line-clamp-2"
                      style={{ color: "oklch(var(--foreground))" }}
                    >
                      {rec.entry.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
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
