import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import DataDeletionForm from "./DataDeletionForm";
import DeletionScenariosAccordion from "./DeletionScenariosAccordion";

export const metadata: Metadata = {
  title: "Data Deletion — PlanO",
  description:
    "Ask PlanO to delete your account, personal information, or data received from connected Meta (Facebook/Instagram) or Google accounts. Last updated: October 18, 2026.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/data-deletion" },
};

export default function DataDeletionPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background pb-24 mt-8">
        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-xs text-ink-tertiary hover:text-primary transition-colors"
            >
              <ArrowLeft size={13} />
              Back to PlanO Home
            </Link>
          </div>

          {/* Hero Header */}
          <div className="mb-10 border-b border-border/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-primary-dark font-sans text-xs font-medium mb-3">
              <Shield size={13} className="text-primary" />
              <span>Data Privacy Act of 2012 (RA 10173) & Meta Platform Policy</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl text-ink font-light tracking-tight mb-3">
              PlanO — Data Deletion
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-sans text-xs text-ink-tertiary">
              <span className="font-semibold text-ink">Last updated: October 18, 2026</span>
              <span>•</span>
              <span>Lipa City, Batangas, Philippines</span>
              <span>•</span>
              <span>
                Contact:{" "}
                <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline">
                  privacy@planoevents.site
                </a>
              </span>
            </div>
          </div>

          <div className="space-y-10 text-ink leading-relaxed">
            {/* Introductory copy */}
            <p className="font-sans text-base sm:text-lg text-ink-secondary">
              Use this page to ask PlanO to delete your account, your personal information, or data we received from a connected Meta (Facebook/Instagram) account. Find the section that matches you.
            </p>

            {/* Sections Accordion */}
            <DeletionScenariosAccordion />

            {/* Request Form Section */}
            <section className="space-y-4 pt-4">
              <div>
                <h2 className="font-display text-2xl font-normal text-ink mb-1">
                  Request form
                </h2>
                <p className="font-sans text-sm text-ink-secondary">
                  Submit your details below to request permanent deletion of your data.
                </p>
              </div>
              <DataDeletionForm />
            </section>

            {/* After you confirm */}
            <section className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-4 shadow-2xs">
              <h2 className="font-display text-xl sm:text-2xl font-normal text-ink">
                After you confirm
              </h2>
              <ul className="space-y-2.5 font-sans text-sm sm:text-base text-ink-secondary">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Your access ends, your connected integrations are disconnected, future subscription charges stop, and your client portal links stop working as soon as we have confirmed the request.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span>Your data is deleted within 30 days. We email you when it is done.</span>
                </li>
              </ul>
            </section>

            {/* What we keep after deletion */}
            <section className="p-6 sm:p-8 rounded-2xl bg-surface border border-border space-y-4 shadow-2xs">
              <h2 className="font-display text-xl sm:text-2xl font-normal text-ink">
                What we keep after deletion
              </h2>
              <p className="font-sans text-sm sm:text-base text-ink-secondary">
                We keep only what the law requires or what protects you:
              </p>
              <ul className="space-y-2.5 font-sans text-sm sm:text-base text-ink-secondary list-disc pl-5">
                <li>
                  Invoices we have already issued, and their supporting records, for the period Philippine tax law requires.
                </li>
                <li>
                  A minimal record that a supplier asked not to be contacted or listed, so we don&rsquo;t contact them again.
                </li>
                <li>
                  A minimal log that a deletion happened: the date, internal account or record numbers, and the type of request, with no message, client, or supplier content.
                </li>
              </ul>
              <p className="font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed pt-2">
                Deleted data may remain in our hosting provider&rsquo;s backups until they are overwritten, which takes no longer than 30 days. It is not used for anything.
              </p>
              <p className="font-sans text-xs sm:text-sm text-ink-tertiary pt-2 border-t border-border/60">
                Questions? Email{" "}
                <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline">
                  privacy@planoevents.site
                </a>
                . Read our{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
