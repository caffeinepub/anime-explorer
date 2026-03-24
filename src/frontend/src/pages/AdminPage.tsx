import { Clock, Eye, Lock, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const VISIT_KEY = "animeflix_total_visits";
const LAST_VISIT_KEY = "animeflix_last_visit";
const FIRST_VISIT_KEY = "animeflix_first_visit";

export function AdminPage() {
  const [visitCount, setVisitCount] = useState(0);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const [firstVisit, setFirstVisit] = useState<string | null>(null);

  useEffect(() => {
    const count = Number.parseInt(localStorage.getItem(VISIT_KEY) || "0", 10);
    const last = localStorage.getItem(LAST_VISIT_KEY);
    const first = localStorage.getItem(FIRST_VISIT_KEY);
    setVisitCount(count);
    setLastVisit(last);
    setFirstVisit(first);
  }, []);

  const formatDate = (iso: string | null) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Header badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10"
      >
        <Lock className="w-3.5 h-3.5 text-primary" />
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">
          Admin Only
        </span>
      </motion.div>

      {/* Main stats card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        data-ocid="admin.card"
        className="w-full max-w-md bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/60 to-transparent" />

        <div className="p-8">
          {/* Total visits hero */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 mb-4">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-2">
              Total Visits
            </p>
            <motion.p
              key={visitCount}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              data-ocid="admin.visit_count"
              className="text-7xl font-black tabular-nums text-foreground leading-none"
            >
              {visitCount.toLocaleString()}
            </motion.p>
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-6" />

          {/* Meta stats */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  First Visit
                </p>
                <p className="text-sm text-foreground font-medium mt-0.5">
                  {formatDate(firstVisit)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Last Visit
                </p>
                <p className="text-sm text-foreground font-medium mt-0.5">
                  {formatDate(lastVisit)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 pb-6">
          <p className="text-xs text-muted-foreground text-center">
            Visits tracked locally on this device
          </p>
        </div>
      </motion.div>
    </div>
  );
}
