export default function Loading() {
  return (
    <div className="flex-1 min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Simple pulse animation for loading */}
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="font-sans text-sm text-ink-tertiary animate-pulse">
          Loading PlanO...
        </p>
      </div>
    </div>
  );
}
