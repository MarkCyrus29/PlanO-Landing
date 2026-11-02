import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, FileText, AlertTriangle, User, CalendarDays, Store, Users } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import DataDeletionForm from "./DataDeletionForm";

export const metadata: Metadata = {
  title: "Data Deletion Request — PlanO",
  description:
    "Ask PlanO to delete your account, your personal information, your supplier profile, or data received from a connected Meta (Facebook/Instagram) account, in line with RA 10173.",
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
              Use this page to ask PlanO to delete your account, your personal information, or data we received from a connected Meta (Facebook/Instagram) account. Find the section that matches you.
            </p>
          </div>

          {/* Main Content Flow */}
          <div className="space-y-8">
            {/* Who are you? */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-surface/80 rounded-2xl border border-border p-6 text-xs font-sans text-ink-secondary space-y-3">
                <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                  <User size={16} className="text-primary shrink-0" />
                  <span className="text-sm">I have a PlanO account</span>
                </div>
                <p className="leading-relaxed">
                  The fastest way is inside the app: go to your account settings, choose <strong>Delete account</strong>, and enter your password (or a one-time code). We then email you, and we delete nothing until you reply to confirm. If you can&rsquo;t log in, use the form below.
                </p>
              </div>

              <div className="bg-surface/80 rounded-2xl border border-border p-6 text-xs font-sans text-ink-secondary space-y-3">
                <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                  <AlertTriangle size={16} className="text-secondary shrink-0" />
                  <span className="text-sm">I connected a Meta (Facebook/Instagram) account</span>
                </div>
                <p className="leading-relaxed">
                  <strong>In PlanO:</strong> go to Settings → Integrations → Meta and choose <strong>Disconnect</strong>. This ends our access to your Meta account. It does not delete what we already hold. To ask us to delete the messages and media we imported, use the form below.
                </p>
                <p className="leading-relaxed">
                  <strong>From Facebook:</strong> removing PlanO from your Facebook connected apps ends our access, but it does not by itself delete what we already hold. To ask us to delete it, use the form below.
                </p>
                <p className="leading-relaxed">
                  Briefs and inquiries you created in PlanO from those messages are your own records. They stay until you delete them or delete your account.
                </p>
              </div>

              <div className="bg-surface/80 rounded-2xl border border-border p-6 text-xs font-sans text-ink-secondary space-y-3">
                <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                  <CalendarDays size={16} className="text-primary shrink-0" />
                  <span className="text-sm">I connected Google Calendar</span>
                </div>
                <p className="leading-relaxed">
                  Go to Settings → Integrations → Google Calendar and choose <strong>Disconnect</strong>. This revokes PlanO&rsquo;s access and immediately deletes the Google-sourced data we hold. You can also remove PlanO&rsquo;s access in your Google Account under Security → Third-party access. Events PlanO already created on your calendar stay there.
                </p>
              </div>

              <div className="bg-surface/80 rounded-2xl border border-border p-6 text-xs font-sans text-ink-secondary space-y-3">
                <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                  <Store size={16} className="text-primary shrink-0" />
                  <span className="text-sm">I&rsquo;m a supplier (with or without a PlanO account)</span>
                </div>
                <p className="leading-relaxed">
                  You don&rsquo;t need an account. Use the form below and tell us you&rsquo;re a supplier and your business name, or write to{" "}
                  <a href="mailto:suppliers@planoevents.site" className="text-primary hover:underline">
                    suppliers@planoevents.site
                  </a>
                  . After we verify the request is yours, we stop contacting you, delete your shared profile within 30 days, and ask coordinators who hold private notes about you to remove your personal details. Read the full explanation in the{" "}
                  <Link href="/supplier-data-notice" className="text-primary hover:underline">
                    Supplier Data Notice
                  </Link>
                  .
                </p>
              </div>

              <div className="bg-surface/80 rounded-2xl border border-border p-6 text-xs font-sans text-ink-secondary space-y-3 md:col-span-2">
                <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                  <Users size={16} className="text-primary shrink-0" />
                  <span className="text-sm">I&rsquo;m a client or guest of a coordinator</span>
                </div>
                <p className="leading-relaxed">
                  Use the form below and tell us you&rsquo;re a client or guest. The coordinator is responsible for your information, so we pass your request to them and help them act on it.
                </p>
              </div>
            </div>

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
                      You confirm it&rsquo;s you
                    </p>
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed mt-1">
                      We email the address you gave and ask you to reply to confirm the request is yours. We delete nothing until you reply.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center font-sans text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink">
                      Access ends right away
                    </p>
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed mt-1">
                      Once confirmed, your access ends, your connected integrations are disconnected, future subscription charges stop, and your client portal links stop working.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center font-sans text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-ink">
                      Deleted within 30 days
                    </p>
                    <p className="font-sans text-xs text-ink-secondary leading-relaxed mt-1">
                      Your data is deleted within 30 days of confirmation. We email you when it is done.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Side-by-side Informational Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* What we keep after deletion */}
              <div className="bg-surface/80 rounded-2xl border border-border p-6 text-xs font-sans text-ink-secondary space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                    <FileText size={16} className="text-primary shrink-0" />
                    <span className="text-sm">What we keep after deletion</span>
                  </div>
                  <p className="leading-relaxed mb-2">
                    We keep only what the law requires or what protects you:
                  </p>
                  <ul className="list-disc pl-4 space-y-1.5 leading-relaxed">
                    <li>
                      Invoices we have already issued, and their supporting records, for the period Philippine tax law requires (§10 of our{" "}
                      <Link href="/privacy#data-retention" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                      ).
                    </li>
                    <li>A minimal record that a supplier asked not to be contacted or listed, so we don&rsquo;t contact them again.</li>
                    <li>
                      A minimal log that a deletion happened: the date, internal account or record numbers, and the type of request, with no message, client, or supplier content.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Backups and questions */}
              <div className="bg-surface/80 rounded-2xl border border-border p-6 text-xs font-sans text-ink-secondary space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-ink font-semibold mb-2">
                    <Shield size={16} className="text-primary shrink-0" />
                    <span className="text-sm">Backups and questions</span>
                  </div>
                  <p className="leading-relaxed">
                    Deleted data may remain in our hosting provider&rsquo;s backups until they are overwritten, which takes no longer than 30 days. It is not used for anything.
                  </p>
                  <p className="leading-relaxed mt-2">
                    Questions? Email{" "}
                    <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline">
                      privacy@planoevents.site
                    </a>
                    . Read our{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
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
