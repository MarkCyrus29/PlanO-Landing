import { Square, ArrowRight } from "lucide-react";

const navLinks = ["Features", "How It Works", "For Coordinators", "About"];
const sectionIds = ["features", "how-it-works", "for-coordinators", "cta"];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logotype */}
        <a
        href="#"
          className="flex items-center gap-2 cursor-pointer"
        >
          <Square className="text-primary fill-primary" size={16} />
          <span className="font-display text-xl text-ink font-normal">
            PlanO
          </span>
        </a>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a

              href={`#${sectionIds[i]}`}
              key={link}
              className="font-sans text-sm text-ink-secondary hover:text-ink transition-colors duration-150"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#cta"
          className="bg-primary text-surface font-sans text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors duration-180 flex items-center gap-2"
        >
          Get Early Access
          <ArrowRight size={14} />
        </a>
      </nav>
    </header>
  );
}
