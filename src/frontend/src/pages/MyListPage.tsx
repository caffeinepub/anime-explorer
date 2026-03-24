import { AnimeCard } from "@/components/AnimeCard";
import { Navbar } from "@/components/Navbar";
import { useMyList } from "@/hooks/useMyList";
import { Bookmark } from "lucide-react";
import { motion } from "motion/react";

export function MyListPage() {
  const { list } = useMyList();

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(var(--background))" }}
      data-ocid="mylist.page"
    >
      <Navbar searchValue="" onSearch={() => {}} />

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: "oklch(var(--foreground))" }}
          >
            My List
          </h1>
          <p
            className="text-sm mb-8"
            style={{ color: "oklch(var(--text-muted))" }}
          >
            {list.length} {list.length === 1 ? "title" : "titles"} saved
          </p>
        </motion.div>

        {list.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-32 gap-6"
            data-ocid="mylist.empty_state"
          >
            <div
              className="rounded-full p-6"
              style={{ background: "oklch(var(--surface))" }}
            >
              <Bookmark
                className="h-12 w-12"
                style={{ color: "oklch(var(--brand-accent))" }}
              />
            </div>
            <div className="text-center">
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: "oklch(var(--foreground))" }}
              >
                Your list is empty
              </h2>
              <p
                className="text-sm max-w-sm"
                style={{ color: "oklch(var(--text-muted))" }}
              >
                Browse anime and click the bookmark icon to save titles to your
                personal list.
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {list.map((anime, i) => (
              <AnimeCard key={anime.mal_id} anime={anime} index={i} />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-16 border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-8">
          <p
            className="text-xs text-center"
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
      </footer>
    </div>
  );
}
