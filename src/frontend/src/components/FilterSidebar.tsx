import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { FilterState } from "@/types/anime";
import { GENRE_MAP } from "@/types/anime";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Ongoing", value: "airing" },
  { label: "Completed", value: "complete" },
];

const RATING_OPTIONS = [
  { label: "Any Rating", value: 0 },
  { label: "7+ ★", value: 7 },
  { label: "8+ ★", value: 8 },
  { label: "9+ ★", value: 9 },
];

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="space-y-2">
      <button
        type="button"
        className="flex w-full items-center justify-between text-sm font-semibold"
        style={{ color: "oklch(var(--foreground))" }}
        onClick={() => setOpen((p) => !p)}
      >
        {title}
        {open ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {open && <div className="space-y-2">{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  filters,
  onFiltersChange,
}: FilterSidebarProps) {
  const toggleGenre = (id: number) => {
    const genres = filters.genres.includes(id)
      ? filters.genres.filter((g) => g !== id)
      : [...filters.genres, id];
    onFiltersChange({ ...filters, genres });
  };

  return (
    <aside
      className="rounded-xl p-4 space-y-5 shadow-panel"
      style={{ background: "oklch(var(--surface))" }}
      data-ocid="filters.panel"
    >
      <h2
        className="text-base font-bold"
        style={{ color: "oklch(var(--foreground))" }}
      >
        Filters
      </h2>

      <div className="h-px" style={{ background: "oklch(var(--border))" }} />

      <FilterGroup title="Genre">
        {Object.entries(GENRE_MAP).map(([name, id]) => (
          <div key={id} className="flex items-center gap-2">
            <Checkbox
              id={`genre-${id}`}
              checked={filters.genres.includes(id)}
              onCheckedChange={() => toggleGenre(id)}
              className="border-border"
              data-ocid="filters.checkbox"
            />
            <Label
              htmlFor={`genre-${id}`}
              className="text-sm cursor-pointer"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              {name}
            </Label>
          </div>
        ))}
      </FilterGroup>

      <div className="h-px" style={{ background: "oklch(var(--border))" }} />

      <FilterGroup title="Status">
        {STATUS_OPTIONS.map((opt) => (
          <div key={opt.value} className="flex items-center gap-2">
            <Checkbox
              id={`status-${opt.value}`}
              checked={filters.status === opt.value}
              onCheckedChange={() =>
                onFiltersChange({ ...filters, status: opt.value })
              }
              className="border-border"
              data-ocid="filters.checkbox"
            />
            <Label
              htmlFor={`status-${opt.value}`}
              className="text-sm cursor-pointer"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              {opt.label}
            </Label>
          </div>
        ))}
      </FilterGroup>

      <div className="h-px" style={{ background: "oklch(var(--border))" }} />

      <FilterGroup title="Rating">
        {RATING_OPTIONS.map((opt) => (
          <div key={opt.value} className="flex items-center gap-2">
            <Checkbox
              id={`rating-${opt.value}`}
              checked={filters.minRating === opt.value}
              onCheckedChange={() =>
                onFiltersChange({ ...filters, minRating: opt.value })
              }
              className="border-border"
              data-ocid="filters.checkbox"
            />
            <Label
              htmlFor={`rating-${opt.value}`}
              className="text-sm cursor-pointer"
              style={{ color: "oklch(var(--text-secondary))" }}
            >
              {opt.label}
            </Label>
          </div>
        ))}
      </FilterGroup>

      {(filters.genres.length > 0 ||
        filters.status !== "all" ||
        filters.minRating > 0) && (
        <button
          type="button"
          className="w-full text-xs font-medium py-2 rounded-lg transition-colors"
          style={{
            background: "oklch(var(--brand-accent) / 0.15)",
            color: "oklch(var(--brand-accent))",
          }}
          onClick={() =>
            onFiltersChange({ genres: [], status: "all", minRating: 0 })
          }
          data-ocid="filters.button"
        >
          Reset Filters
        </button>
      )}
    </aside>
  );
}
