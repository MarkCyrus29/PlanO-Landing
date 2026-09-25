import { Check, Quote } from "lucide-react";
import { RevealWrapper } from "../../components/ui/RevealWrapper";

const bullets = [
  "Taglish-aware — understands how real clients message",
  "Private supplier corpus — your list, no one else’s",
  "Margin-first matching — not just the cheapest option",
  "Export-ready briefs and quotes with PlanO branding",
];

export default function ForCoordinators() {
  return (
    <section id="for-coordinators" className="bg-primary-light py-24 lg:py-32">
      <RevealWrapper className="max-w-7xl mx-auto px-6 reveal-stagger">
        <p className="reveal-fade-up font-mono text-xs text-primary-dark uppercase tracking-widest mb-4">
          Built for the Philippine Events Industry
        </p>
        <h2 className="reveal-fade-up font-display text-3xl lg:text-4xl font-light text-ink mb-16 max-w-lg leading-snug">
          Who is PlanO for?
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 reveal-stagger">
          {/* Bullet points */}
          <div className="reveal-fade-up flex-1 space-y-5">
            <h3 className="font-sans text-lg font-semibold text-ink mb-2">Designed for coordinators who want:</h3>
            <ul className="space-y-5">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-primary" />
                  </div>
                  <span className="font-sans text-sm text-ink leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial card */}
          <div className="reveal-fade-up flex-1 max-w-md">
            <div className="bg-surface rounded-xl border border-border shadow-sm p-6">
              <Quote size={20} className="text-primary mb-4" />
              <p className="font-display text-lg text-ink italic leading-relaxed mb-5">
                &ldquo;No one has ever made this kind of tool for us before.&rdquo;
              </p>
              <p className="font-sans text-sm text-ink-tertiary mb-3">
                — Event Coordinator, Batangas
              </p>
            </div>
          </div>
        </div>
      </RevealWrapper>
    </section>
  );
}
