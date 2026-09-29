import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, FileText, AlertTriangle } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import DataDeletionForm from "./DataDeletionForm";

export const metadata: Metadata = {
  title: "Data Deletion Request — PlanO",
  description:
    "Submit a request to permanently delete your PlanO account, customer records, and connected Meta (Facebook/Instagram) platform data in compliance with RA 10173.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/data-deletion" },
};

export default function DataDeletionPage() {
  return (
    <>
      <Navigation />

      <main className="flex-1 bg-background pb-20 mt-8">
        <div className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-sans text-xs text-ink-tertiary hover:text-primary transition-colors"
            >
              <ArrowLeft size={13} />
              Back to PlanO Home
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-primary-dark font-sans text-xs font-medium mb-3">
              <Shield size={13} className="text-primary" />
              <span>Data Subject Rights · RA 10173 & Meta Platform Policy</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-ink font-light tracking-tight mb-3">
              Data Deletion Request
            </h1>
            <p className="font-sans text-base text-ink-secondary max-w-2xl leading-relaxed">
              If you wish to delete your PlanO account, your personal information, or any data collected from connected Meta accounts (Facebook/Instagram), please submit a request below.
            </p>
          </div>

          {/* Main Content Flow */}
          <div className="space-y-8">
            {/* Form Section */}
            <DataDeletionForm />

            {/* What happens next? */}
            <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-2xs">
              <h3 className="font-display text-xl font-normal text-ink mb-6">
                What happens next?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center font-sans text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink">
                      Ownership Verification
                    </p>
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed mt-1">
                      We send an authorization link to your submitted email address. Reply or confirm to prove account control.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center font-sans text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink">
                      Disconnect & Unlink
                    </p>
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed mt-1">
                      Connected Meta tokens and calendar permissions are immediately revoked and disconnected from our systems.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center font-sans text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink">
                      Permanent Erasure
                    </p>
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed mt-1">
                      Your workspace, briefs, and client data are permanently expunged within 30 days of confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side-by-side Informational Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Legal Notes & Invoicing Exception */}
              <div className="bg-surface/80 rounded-2xl border border-border p-6 text-xs font-sans text-ink-secondary space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                    <FileText size={16} className="text-primary shrink-0" />
                    <span className="text-sm">Tax & Invoicing Records Retention</span>
                  </div>
                  <p className="leading-relaxed">
                    Under the National Internal Revenue Code and BIR regulations, official service invoices and books of account must be retained for the statutory 10-year audit period (§10 of our{" "}
                    <Link href="/privacy#data-retention" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    ). We remove tax information from active billing, but cannot erase past tax invoices.
                  </p>
                </div>
              </div>

              {/* Meta direct disconnection instructions */}
              <div className="bg-surface/80 rounded-2xl border border-border p-6 text-xs font-sans text-ink-secondary space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                    <AlertTriangle size={16} className="text-secondary shrink-0" />
                    <span className="text-sm">Direct Meta Removal</span>
                  </div>
                  <p className="leading-relaxed">
                    You can also revoke PlanO’s permissions directly from your Facebook or Instagram profile at any time by going to <strong>Settings & Privacy &gt; Settings &gt; Business Integrations</strong>, selecting PlanO, and clicking <em>Remove</em>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
