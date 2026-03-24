import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, Search, Tv2, User } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
  searchValue: string;
}

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Browse", to: "/" },
  { label: "Trending", to: "/" },
  { label: "My List", to: "/my-list" },
];

export function Navbar({ onSearch, searchValue }: NavbarProps) {
  const [inputValue, setInputValue] = useState(searchValue);
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(inputValue);
      navigate({ to: "/" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border"
      style={{ background: "oklch(var(--header))" }}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-6 px-6">
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <Tv2
            className="h-6 w-6"
            style={{ color: "oklch(var(--brand-accent))" }}
          />
          <span
            className="text-xl font-bold tracking-widest uppercase"
            style={{ color: "oklch(var(--foreground))" }}
          >
            ANIMEFLIX
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              data-ocid="nav.link"
              className="text-sm font-medium transition-colors"
              style={{ color: "oklch(var(--text-secondary))" }}
              activeOptions={{ exact: true }}
              activeProps={{
                style: {
                  color: "oklch(var(--brand-accent))",
                  borderBottom: "2px solid oklch(var(--brand-accent))",
                  paddingBottom: "2px",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1 max-w-sm mx-auto">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "oklch(var(--text-muted))" }}
            />
            <Input
              placeholder="Search anime, characters…"
              className="pl-9 rounded-full border-border h-9 text-sm"
              style={{
                background: "oklch(var(--input))",
                color: "oklch(var(--foreground))",
              }}
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              data-ocid="nav.search_input"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto shrink-0">
          <button
            type="button"
            className="p-2 rounded-full transition-colors hover:bg-surface"
            style={{ color: "oklch(var(--text-secondary))" }}
            data-ocid="nav.button"
          >
            <Bell className="h-5 w-5" />
          </button>
          <div
            className="flex items-center gap-1.5 cursor-pointer"
            data-ocid="nav.button"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback
                className="text-xs font-semibold"
                style={{
                  background: "oklch(var(--brand-accent))",
                  color: "oklch(var(--foreground))",
                }}
              >
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <ChevronDown
              className="h-4 w-4"
              style={{ color: "oklch(var(--text-muted))" }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
