import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Users, Eye, EyeOff } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import LegalTableOfContents from "@/components/legal/LegalTableOfContents";

export const metadata: Metadata = {
  title: "Supplier Data Notice — PlanO",
  description:
    "How PlanO holds and processes supplier information, your rights as a supplier, and how to see, correct, or remove your data under RA 10173. Last updated: November 1, 2026.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/supplier-data-notice" },
};

const tableOfContents = [
  { id: "why-heard", label: "Why you may have heard from us" },
  { id: "two-layers", label: "What we hold — two layers" },
  { id: "publicly-listed", label: "Becoming publicly listed is verified" },
  { id: "your-choices", label: "See it, fix it, or remove it" },
  { id: "information-removed", label: "If you want your information removed" },
  { id: "lawful-basis", label: "Why we are allowed to hold this" },
  { id: "your-rights", label: "Your rights under the law" },
  { id: "who-we-are", label: "Who we are" },
];

export default function SupplierNoticePage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background pb-24 mt-8">
        <div className="max-w-6xl mx-auto px-6">
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

          {/* Hero Header */}
          <div className="mb-12 border-b border-border/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-primary-dark font-sans text-xs font-medium mb-3">
              <Users size={13} className="text-primary" />
              <span>Supplier Data Notice · RA 10173 Compliant</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl text-ink font-light tracking-tight mb-3">
              PlanO — Supplier Data Notice
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-sans text-xs text-ink-tertiary">
              <span className="font-semibold text-ink">Last updated: November 1, 2026</span>
              <span>•</span>
              <span>Sole Proprietorship · Lipa City, Batangas, Philippines</span>
              <span>•</span>
              <span>
                Suppliers:{" "}
                <a href="mailto:suppliers@planoevents.site" className="text-primary hover:underline">
                  suppliers@planoevents.site
                </a>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Table of contents sticky sidebar */}
            <LegalTableOfContents items={tableOfContents} />

            {/* Document Content */}
            <article className="lg:col-span-9 space-y-12 text-ink">
              {/* Section 1: Why you may have heard from us */}
              <section id="why-heard" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  Why you may have heard from us
                </h2>
                <div className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <p>
                    PlanO is a workflow tool used by professional event coordinators in the Philippines. Coordinators keep private records of the suppliers they trust and work with. When several coordinators independently reference the same supplier, we may send that supplier a one-time email invitation to claim a profile on PlanO.
                  </p>
                  <p>
                    <strong>If you received that invitation, it means multiple coordinators have referenced you as someone they work with.</strong> The invitation tells you how many. Once you claim your profile, you can see which coordinators added you. We never share their rates, their clients, or anything from their private workspaces.
                  </p>
                </div>
              </section>

              {/* Section 2: Two Layers */}
              <section id="two-layers" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  What information we hold about you, in two layers
                </h2>
                <div className="space-y-4 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <p>
                    Your information on PlanO sits in two layers.
                  </p>
                  <div className="space-y-3">
                    <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-sans text-sm font-semibold text-ink">
                        <Eye size={16} className="text-primary shrink-0" />
                        <span>1. Shared business facts</span>
                      </div>
                      <p className="font-sans text-sm text-ink-secondary leading-relaxed pl-6">
                        Your business name, service category, service area, and publicly advertised prices. These come from the coordinators who work with you, and from public business details they reference. We do not scrape Facebook, Instagram, or other platforms. This layer is marked &ldquo;community-contributed and unverified until you claim it,&rdquo; so we don&rsquo;t represent it as accurate until you confirm it.
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-2xs">
                      <div className="flex items-center gap-2 font-sans text-sm font-semibold text-ink">
                        <EyeOff size={16} className="text-ink-tertiary shrink-0" />
                        <span>2. Each coordinator&rsquo;s private notes</span>
                      </div>
                      <p className="font-sans text-sm text-ink-secondary leading-relaxed pl-6">
                        The rate a coordinator personally negotiated with you, their remarks, their booking history. This is theirs, is never shown to other coordinators, and a privately negotiated rate is never placed on your shared profile.
                      </p>
                    </div>
                  </div>
                  <p>
                    Until you claim your profile, it stays minimal and not public — not searchable or discoverable by coordinators who haven&rsquo;t added you. We do not show your logo until you claim your profile and add it yourself.
                  </p>
                </div>
              </section>

              {/* Section 3: Publicly listed */}
              <section id="publicly-listed" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  Becoming publicly listed is your choice, and it is verified
                </h2>
                <div className="space-y-4 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <p>
                    Your profile becomes publicly discoverable only if you claim it, verify your identity, and choose to be listed — all three.
                  </p>
                  <ul className="space-y-3 list-disc pl-5">
                    <li>
                      <strong className="text-ink">Claim</strong> — confirm the profile is yours, see what&rsquo;s on file, correct anything.
                    </li>
                    <li>
                      <strong className="text-ink">Verify</strong> — public listing needs a simple identity check (a business document or government ID, plus phone or GCash) so coordinators know you&rsquo;re really you. We use it only to confirm your identity. We delete the document as soon as the check is done and keep only the result and the date.
                    </li>
                    <li>
                      <strong className="text-ink">List</strong> — even after verifying, being discoverable is opt-in. You decide.
                    </li>
                  </ul>
                  <p>
                    Until all three happen, nothing about you is shown to coordinators who didn&rsquo;t already add you.
                  </p>
                </div>
              </section>

              {/* Section 4: Your choices */}
              <section id="your-choices" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  See it, fix it, or remove it — your choice
                </h2>
                <div className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <p>
                    You are in control of your information, whether or not you ever join PlanO:
                  </p>
                  <ul className="space-y-2.5 list-disc pl-5">
                    <li>
                      <strong className="text-ink">Claim your profile.</strong> If you received an invitation, you can claim your profile through it, see exactly what&rsquo;s on file, see which coordinators added you, and correct anything. You can also create your own PlanO supplier account and manage your profile directly.
                    </li>
                    <li>
                      <strong className="text-ink">Join directly.</strong> You don&rsquo;t have to wait for an invitation. You can sign up as a supplier from our website whenever you&rsquo;d like.
                    </li>
                    <li>
                      <strong className="text-ink">Leave it as is.</strong> You don&rsquo;t have to do anything. Your profile stays minimal and private to the coordinators who added you.
                    </li>
                    <li>
                      <strong className="text-ink">Correct it.</strong> Tell us about anything that&rsquo;s wrong or outdated and we&rsquo;ll fix it. Because the shared layer is community-contributed, correcting it is exactly what claiming is for.
                    </li>
                    <li>
                      <strong className="text-ink">Opt out or delete.</strong> Contact us (details below) and we&rsquo;ll stop contacting you, remove your profile, or both, whatever you ask. The next section explains exactly what happens.
                    </li>
                  </ul>
                  <p>
                    To do any of these, reply to our invitation email or write to{" "}
                    <a href="mailto:suppliers@planoevents.site" className="text-primary hover:underline font-medium">
                      suppliers@planoevents.site
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* Section 5: If you want your information removed */}
              <section id="information-removed" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  If you want your information removed
                </h2>
                <div className="space-y-4 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <p>
                    You don&rsquo;t need a PlanO account, and you don&rsquo;t need to know which coordinators hold information about you.
                  </p>
                  <ul className="space-y-3 list-disc pl-5">
                    <li>
                      <strong className="text-ink">Ask.</strong> Reply to our invitation email, write to{" "}
                      <a href="mailto:suppliers@planoevents.site" className="text-primary hover:underline">
                        suppliers@planoevents.site
                      </a>
                      , or use the form at{" "}
                      <Link href="/data-deletion" className="text-primary hover:underline font-medium">
                        planoevents.site/data-deletion
                      </Link>
                      .
                    </li>
                    <li>
                      <strong className="text-ink">We check it&rsquo;s you.</strong> We contact you using the details we hold for your business and ask you to confirm the request. If we hold none, we&rsquo;ll ask for a simple way to show the request comes from the business, such as a message from the business&rsquo;s own page. We don&rsquo;t ask for a government ID for this.
                    </li>
                    <li>
                      <strong className="text-ink">We stop contacting you</strong> as soon as we verify the request.
                    </li>
                    <li>
                      <strong className="text-ink">We delete your shared profile</strong>, including any verification document we still hold, within 30 days.
                    </li>
                    <li>
                      <strong className="text-ink">We ask the coordinators who hold private notes about you to remove your personal details.</strong> They have 14 days. A coordinator you have actually worked with may keep their own business record (for example, a booking history they need for their own accounts) in their private workspace. If a coordinator doesn&rsquo;t respond, we remove your personal identifiers from their record ourselves. Whatever a coordinator keeps stays private: it is never shown to anyone else, never used to rebuild a shared profile, and never counted toward invitations.
                    </li>
                    <li>
                      <strong className="text-ink">We keep only a minimal record that you opted out,</strong> just enough to recognize you so we don&rsquo;t add you back or contact you again, plus anonymous totals that cannot identify you.
                    </li>
                  </ul>
                  <p className="font-sans text-xs sm:text-sm text-ink-tertiary">
                    <strong className="text-ink">What we can&rsquo;t do:</strong> recall messages or documents a coordinator has already sent to their own clients or suppliers, or delete records held outside PlanO.
                  </p>
                </div>
              </section>

              {/* Section 6: Lawful basis */}
              <section id="lawful-basis" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  Why we are allowed to hold this
                </h2>
                <div className="space-y-4 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <p>
                    You may be wondering how we can hold anything about you when you never signed up. Here is the honest answer.
                  </p>
                  <p>
                    For the shared business facts, we rely on what the law calls legitimate interest — the recognised basis that lets a business hold ordinary business information without asking permission first, as long as it is fair and you keep your rights. Coordinators need to remember which suppliers they trust and what those suppliers do. That is a real and ordinary business need, and there is no less intrusive way to meet it.
                  </p>
                  <p className="font-semibold text-ink">
                    Three things keep this fair, and we hold ourselves to all of them:
                  </p>
                  <ul className="space-y-3 list-disc pl-5">
                    <li>
                      <strong className="text-ink">We keep it to business facts.</strong> Your business name, what you do, where you work, and prices you already advertise publicly. Not your age, your civil status, your religion, or any government ID. Those categories need your consent, so we simply do not put them on an unclaimed profile.
                    </li>
                    <li>
                      <strong className="text-ink">We do not make you public.</strong> Nothing about you is shown to coordinators who did not already add you until you claim, verify, and choose to be listed.
                    </li>
                    <li>
                      <strong className="text-ink">You can say no.</strong> Object or ask us to delete, and we act on it. Legitimate interest is not a way around your rights; it exists alongside them.
                    </li>
                  </ul>
                  <p>
                    We rely on your consent for one thing only: making your profile publicly discoverable. That is always your choice, and you can withdraw it.
                  </p>
                </div>
              </section>

              {/* Section 7: Rights */}
              <section id="your-rights" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  Your rights under the law
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Under the Data Privacy Act of 2012 (RA 10173), you have the right to be informed, to access and correct your information, to object to its processing, to have it erased or blocked, and to complain to the National Privacy Commission (
                  <a
                    href="https://privacy.gov.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    privacy.gov.ph
                  </a>
                  ). This notice and the choices above are how we make those rights easy to use.
                </p>
              </section>

              {/* Section 8: Who we are */}
              <section id="who-we-are" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  Who we are
                </h2>
                <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 font-sans text-sm text-ink-secondary">
                  <p className="font-semibold text-ink text-base">
                    <strong>PLANOEVENTS INFORMATION TECHNOLOGY SOLUTIONS</strong> (PlanO Events) · Lipa City, Batangas, Philippines
                  </p>
                  <p>
                    Data privacy matters:{" "}
                    <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline">
                      privacy@planoevents.site
                    </a>{" "}
                    · Suppliers:{" "}
                    <a href="mailto:suppliers@planoevents.site" className="text-primary hover:underline">
                      suppliers@planoevents.site
                    </a>
                  </p>
                  <p>
                    Data Protection Officer:{" "}
                    <a href="mailto:dpo@planoevents.site" className="text-primary hover:underline">
                      dpo@planoevents.site
                    </a>
                  </p>
                  <p className="pt-2 text-xs text-ink-tertiary">
                    National Privacy Commission:{" "}
                    <a
                      href="https://privacy.gov.ph"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      privacy.gov.ph
                    </a>
                  </p>
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
