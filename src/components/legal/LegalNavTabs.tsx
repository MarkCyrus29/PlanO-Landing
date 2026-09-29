import Link from "next/link";
import { Shield, FileText, Trash2, Users } from "lucide-react";

interface LegalNavTabsProps {
  current: "privacy" | "terms" | "data-deletion" | "supplier-data-notice";
}

const tabs = [
  {
    id: "privacy",
    label: "Privacy Policy",
    href: "/privacy",
    icon: Shield,
  },
  {
    id: "terms",
    label: "Terms of Service",
    href: "/terms",
    icon: FileText,
  },
  {
    id: "data-deletion",
    label: "Data Deletion",
    href: "/data-deletion",
    icon: Trash2,
  },
  {
    id: "supplier-data-notice",
    label: "Supplier Data Notice",
    href: "/supplier-data-notice",
    icon: Users,
  },
];

export default function LegalNavTabs({ current }: LegalNavTabsProps) {
  return (
    <div className="w-full border-b border-border/80 bg-surface/50 backdrop-blur-xs mb-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-3 no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === current;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-sans text-xs sm:text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? "bg-primary-light text-primary-dark font-semibold shadow-2xs"
                    : "text-ink-secondary hover:text-ink hover:bg-border/40"
                }`}
              >
                <Icon size={14} className={isActive ? "text-primary" : "text-ink-tertiary"} />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
