import { Square, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navLinks = ["Features", "How It Works", "For Coordinators", "FAQ"];
const sectionIds = ["features", "how-it-works", "for-coordinators", "faq"];

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logotype */}
        <Link
        href="#"
          className="flex items-start gap-2 cursor-pointer relative w-40 h-14"
        >
          <Image 
          src="/plano-bk.svg"
          alt="PlanO — AI Event Planning for Filipino Coordinators"
          fill
          priority
          sizes="160px"
          className="object-contain"
          />
          {/* <Image 
          src="/temp.svg"
          alt="PlanO"
          width={100}
          height={100}
          className="w-20 h-20"
          />
          <span className="font-display text-xl text-ink font-normal">
            PlanO
          </span> */}
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link

              href={`#${sectionIds[i]}`}
              key={link}
              className="font-sans text-sm text-ink-secondary hover:text-ink transition-colors duration-150"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="#cta"
          className="bg-primary text-surface font-sans text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-all   flex items-center gap-2"
        >
          Join the Waitlist
          <ArrowRight size={14} />
        </Link>
      </nav>
    </header>
  );
}
