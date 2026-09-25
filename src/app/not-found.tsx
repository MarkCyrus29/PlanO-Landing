import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex-1 bg-background flex flex-col items-center justify-center px-6 py-24 min-h-[60vh]">
      <div className="max-w-md text-center">
        <h1 className="font-display text-6xl font-light text-primary mb-4">
          404
        </h1>
        <h2 className="font-sans text-xl font-semibold text-ink mb-3">
          Page Not Found
        </h2>
        <p className="font-sans text-sm text-ink-secondary mb-8 leading-relaxed">
          The page you are looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-sm font-medium text-surface bg-primary px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-150 shadow-sm"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
