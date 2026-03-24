import { useMyList } from "@/hooks/useMyList";
import type { Anime } from "@/types/anime";
import { useNavigate } from "@tanstack/react-router";
import { Bookmark, Star } from "lucide-react";
import { motion } from "motion/react";

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

export function AnimeCard({ anime, index = 0 }: AnimeCardProps) {
  const navigate = useNavigate();
  const { add, remove, isInList } = useMyList();
  const saved = isInList(anime.mal_id);
  const displayGenres = anime.genres?.slice(0, 3) ?? [];
  const title = anime.title_english || anime.title;
  const imageUrl =
    anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;

  const statusLabel =
    anime.status === "Currently Airing"
      ? "Ongoing"
      : anime.status === "Finished Airing"
        ? "Completed"
        : anime.status;

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      remove(anime.mal_id);
    } else {
      add(anime);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="group cursor-pointer rounded-xl overflow-hidden"
      style={{ background: "oklch(var(--card))" }}
      onClick={() => navigate({ to: `/anime/${anime.mal_id}` })}
      data-ocid={`anime.item.${index + 1}`}
    >
      {/* Cover Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
          loading="lazy"
        />
        {/* Bookmark button */}
        <button
          type="button"
          onClick={handleBookmark}
          className="absolute top-2 right-2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
          style={{
            background: "rgba(10,10,12,0.80)",
            color: saved
              ? "oklch(var(--brand-accent))"
              : "oklch(var(--text-secondary))",
          }}
          data-ocid={`anime.toggle.${index + 1}`}
          aria-label={saved ? "Remove from My List" : "Add to My List"}
        >
          <Bookmark
            className="h-4 w-4"
            style={saved ? { fill: "oklch(var(--brand-accent))" } : {}}
          />
        </button>
        {/* Rating badge */}
        {anime.score && (
          <div
            className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full px-2 py-0.5"
            style={{
              background: "rgba(10,10,12,0.85)",
              backdropFilter: "blur(4px)",
            }}
          >
            <Star
              className="h-3 w-3 fill-current"
              style={{ color: "oklch(var(--star-gold))" }}
            />
            <span
              className="text-xs font-semibold"
              style={{ color: "oklch(var(--foreground))" }}
            >
              {anime.score.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Text block */}
      <div className="p-3 space-y-1.5">
        <h3
          className="text-sm font-semibold leading-snug line-clamp-2"
          style={{ color: "oklch(var(--foreground))" }}
        >
          {title}
        </h3>

        {/* Genre pills */}
        {displayGenres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {displayGenres.map((g) => (
              <span
                key={g.mal_id}
                className="text-[10px] font-medium rounded-full px-2 py-0.5"
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

        {/* Meta */}
        <p
          className="text-[11px]"
          style={{ color: "oklch(var(--text-muted))" }}
        >
          {anime.episodes ? `${anime.episodes} Eps` : "? Eps"} •{" "}
          {statusLabel || "Unknown"}
        </p>
      </div>
    </motion.article>
  );
}
