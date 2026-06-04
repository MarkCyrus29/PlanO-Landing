import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Trash2 } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Data Deletion — PlanO",
  description: "Request data deletion from PlanO. Coming at launch.",
  robots: { index: false, follow: false },
};

export default function DataDeletionPage() {
  return (
    <>
      <Navigation />
    <main className="flex-1 bg-background flex items-center justify-center px-6 py-12">
      <div className="max-w-md text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6">
          <Trash2 size={24} className="text-primary" />
        </div>
        <h1 className="font-display text-3xl font-light text-ink mb-3">
          Data Deletion
        </h1>
        <p className="font-sans text-sm text-ink-secondary mb-8 leading-relaxed">
          Our data deletion process will be available at launch. In the
          meantime, you can email{" "}
          <a
            href="mailto:info@planoevents.site"
            className="text-primary hover:text-primary-dark transition-colors duration-150 underline"
          >
            info@planoevents.site
          </a>{" "}
          to request removal of your information.
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
