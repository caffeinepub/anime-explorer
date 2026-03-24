export function SkeletonCard() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "oklch(var(--card))" }}
    >
      <div
        className="w-full"
        style={{
          aspectRatio: "2/3",
          background:
            "linear-gradient(90deg, oklch(0.13 0 0) 25%, oklch(0.18 0 0) 50%, oklch(0.13 0 0) 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.8s infinite linear",
        }}
      />
      <div className="p-3 space-y-2">
        <div
          className="h-3 rounded-full w-3/4"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.16 0 0) 25%, oklch(0.21 0 0) 50%, oklch(0.16 0 0) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.8s infinite linear",
          }}
        />
        <div
          className="h-3 rounded-full w-1/2"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.16 0 0) 25%, oklch(0.21 0 0) 50%, oklch(0.16 0 0) 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.8s infinite linear",
          }}
        />
      </div>
    </div>
  );
}
