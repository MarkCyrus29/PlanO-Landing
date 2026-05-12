
import { Square, ArrowUp } from "lucide-react";

const footerLinks = ["Features", "How It Works", "For Coordinators", "About"];
const sectionIds = ["features", "how-it-works", "for-coordinators", "cta"];

export default function Footer() {

  return (
    <footer className="bg-ink py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logotype */}
          <div className="flex items-center gap-2">
            <Square className="text-primary fill-primary" size={14} />
            <span className="font-display text-lg text-surface font-normal">PlanO</span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link, i) => (
              <a
                key={link}
                href={sectionIds[i]}
                className="font-sans text-xs text-ink-tertiary hover:text-surface transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Scroll to top */}
          <a
            href="#"
            className="text-ink-tertiary hover:text-surface transition-colors duration-150"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/20 pt-6">
          <p className="font-mono text-xs text-ink-tertiary text-center">
            © 2026 PlanO · Pre-launch · Philippines
          </p>
        </div>
      </div>
    </footer>
  );
}
