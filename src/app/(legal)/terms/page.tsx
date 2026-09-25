import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

export const metadata: Metadata = {
  title: "Terms of Service — PlanO",
  description: "PlanO Terms of Service. Coming at launch.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
          <Navigation />
          
          
    <main className="flex-1 bg-background flex items-center justify-center px-6 py-12">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6">
          <FileText size={24} className="text-primary" />
        </div>
        <h1 className="font-display text-3xl font-light text-ink mb-3">
          Terms of Service
        </h1>
        <p className="font-sans text-sm text-ink-secondary mb-8 leading-relaxed">
          Our terms of service are being finalized and will be published at
          launch. We&rsquo;re building PlanO to serve coordinators fairly and
          transparently.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-sans text-sm text-primary hover:text-primary-dark transition-colors duration-150"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>
      </div>
    </main>
    <Footer />
  </>
  );
}
