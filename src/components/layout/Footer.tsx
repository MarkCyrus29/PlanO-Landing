import { Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ScrollToTop } from "./ScrollToTop";

const footerLinks = ["Features", "How It Works", "For Coordinators", "FAQ"];
const sectionIds = ["#features", "#how-it-works", "#for-coordinators", "#faq"];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Data Deletion", href: "/data-deletion" },
];

export default function Footer() {
  return (
    <footer className="bg-ink py-8 border-t border-border/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Row: Brand, Nav & Contact */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Link href="#" className="relative w-24 h-12 block">
              <Image 
                src="/plano-w.svg" 
                alt="PlanO — AI Event Planning for Filipino Coordinators" 
                fill 
                className="object-contain md:object-left" 
              />
            </Link>
            <div className="flex flex-wrap justify-center gap-4 md:border-l md:border-border/20 md:pl-6">
              {footerLinks.map((link, i) => (
                <Link 
                  key={link} 
                  href={sectionIds[i]} 
                  className="font-sans text-xs text-ink-tertiary hover:text-surface transition-colors duration-150"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            <a 
              href="mailto:info@planoevents.site" 
              className="flex items-center gap-1.5 font-sans text-xs text-ink-tertiary hover:text-surface transition-colors duration-150"
            >
              <Mail size={14} />
              <span className="hidden sm:inline">info@planoevents.site</span>
            </a>
            <span className="flex items-center gap-1.5 font-sans text-xs text-ink-tertiary">
              <MapPin size={14} />
              <span className="hidden sm:inline">Built in Batangas 🇵🇭</span>
            </span>
            {/* Instagram — uncomment when account goes to soft-reveal
            <a
              href="https://instagram.com/planoevents"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-sans text-xs text-ink-tertiary hover:text-surface transition-colors duration-150"
            >
              <Instagram size={14} />
            </a>
            */}
          </div>
        </div>

        {/* Bottom Row: Copyright, Legal & Scroll */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-6 border-t border-border/10">
          <span className="font-mono text-xs text-ink-tertiary text-center md:text-left">
            © 2026 PlanO · Pre-launch · Philippines
          </span>
          
          <div className="flex items-center gap-4 sm:gap-6">
            {legalLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="font-sans text-xs text-ink-tertiary hover:text-surface transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
            <div className="w-px h-3 bg-border/20 hidden sm:block"></div>
            <ScrollToTop />
          </div>
        </div>

      </div>
    </footer>
  );
}
