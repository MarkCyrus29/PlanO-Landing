import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Users, CheckCircle2, Eye, EyeOff, BadgeCheck, List } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import LegalTableOfContents from "@/components/legal/LegalTableOfContents";

export const metadata: Metadata = {
  title: "Supplier Data Notice — PlanO",
  description:
    "How PlanO holds and processes supplier information, your rights as a supplier, and how to see, correct, or remove your data — under the Data Privacy Act of 2012 (RA 10173).",
  robots: { index: true, follow: true },
  alternates: { canonical: "/supplier-data-notice" },
};

const tableOfContents = [
  { id: "why-heard", label: "Why you may have heard from us" },
  { id: "two-layers", label: "What we hold — two layers" },
  { id: "publicly-listed", label: "Becoming publicly listed" },
  { id: "your-choices", label: "See it, fix it, or remove it" },
  { id: "lawful-basis", label: "Why we are allowed to hold this" },
  { id: "your-rights", label: "Your rights under the law" },
  { id: "who-we-are", label: "Who we are" },
];

export default function SupplierDataNoticePage() {
  return (
    <>
      <Navigation />

      <main className="flex-1 bg-background pb-24 mt-8">
        <div className="max-w-6xl mx-auto px-6">
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
          <div className="mb-12 border-b border-border/80 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary/20 text-primary-dark font-sans text-xs font-medium mb-3">
              <Users size={13} className="text-primary" />
              <span>Supplier Data Notice · Version 0.7 · RA 10173</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl text-ink font-light tracking-tight mb-4">
              PlanO — Supplier Data Notice
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sticky TOC */}
            <LegalTableOfContents items={tableOfContents} />

            {/* Document Content */}
            <article className="lg:col-span-9 space-y-12">

              {/* Why you may have heard from us */}
              <section id="why-heard" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  Why you may have heard from us
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  PlanO is a workflow tool used by professional event coordinators in the Philippines. Coordinators keep private records of the suppliers they trust and work with. When several coordinators independently reference the same supplier, we may send that supplier a one-time email invitation to claim a profile on PlanO.
                </p>
                <div className="p-5 rounded-xl bg-primary-light/40 border border-primary/20 font-sans text-sm sm:text-base text-ink leading-relaxed">
                  <strong>If you received that invitation, it means multiple coordinators have referenced you as someone they work with.</strong> We do not tell you which coordinators, and we never share their rates, their clients, or anything from their private workspaces.
                </div>
              </section>

              {/* Two Layers */}
              <section id="two-layers" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  What information we hold about you, in two layers
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Your information on PlanO sits in two layers.
                </p>

                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-sans text-sm font-semibold text-ink">
                      <Eye size={16} className="text-primary shrink-0" />
                      <span>1. Shared business facts</span>
                    </div>
                    <p className="font-sans text-sm text-ink-secondary leading-relaxed pl-6">
                      Your business name, service category, service area, and publicly advertised prices. These come from the coordinators who work with you, and from public business details they reference. <strong className="text-ink">We do not scrape Facebook, Instagram, or other platforms.</strong> This layer is marked &ldquo;community-contributed and unverified until you claim it,&rdquo; so we don&rsquo;t represent it as accurate until you confirm it.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-surface border border-border space-y-2 shadow-xs">
                    <div className="flex items-center gap-2 font-sans text-sm font-semibold text-ink">
                      <EyeOff size={16} className="text-ink-tertiary shrink-0" />
                      <span>2. Each coordinator&rsquo;s private notes</span>
                    </div>
                    <p className="font-sans text-sm text-ink-secondary leading-relaxed pl-6">
                      The rate a coordinator personally negotiated with you, their remarks, their booking history. This is theirs, is never shown to other coordinators, and a privately negotiated rate is <strong className="text-ink">never</strong> placed on your shared profile.
                    </p>
                  </div>
                </div>

                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Until you claim your profile, it stays minimal and <strong className="text-ink">not public</strong> — not searchable or discoverable by coordinators who haven&rsquo;t added you. We do not show your logo until you claim your profile and add it yourself.
                </p>
              </section>

              {/* Publicly Listed */}
              <section id="publicly-listed" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  Becoming publicly listed is your choice, and it is verified
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Your profile becomes publicly discoverable only if you <strong className="text-ink">claim it, verify your identity, and choose to be listed</strong> — all three.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      icon: <List size={16} className="text-primary shrink-0 mt-0.5" />,
                      label: "Claim",
                      text: "Confirm the profile is yours, see what\u2019s on file, correct anything.",
                    },
                    {
                      icon: <BadgeCheck size={16} className="text-primary shrink-0 mt-0.5" />,
                      label: "Verify",
                      text: "Public listing needs a simple identity check (a business document or government ID, plus phone or GCash) so coordinators know you\u2019re really you. We use it only to confirm your identity.",
                    },
                    {
                      icon: <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />,
                      label: "List",
                      text: "Even after verifying, being discoverable is opt-in. You decide.",
                    },
                  ].map((step) => (
                    <div key={step.label} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border">
                      {step.icon}
                      <div className="font-sans text-sm text-ink-secondary leading-relaxed">
                        <strong className="text-ink">{step.label} —</strong> {step.text}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Until all three happen, nothing about you is shown to coordinators who didn&rsquo;t already add you.
                </p>
              </section>

              {/* Your Choices */}
              <section id="your-choices" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  See it, fix it, or remove it — your choice
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  You are in control of your information, whether or not you ever join PlanO:
                </p>

                <ul className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed list-disc pl-5">
                  <li>
                    <strong className="text-ink">Claim your profile.</strong> If you received an invitation, you can claim your profile through it, see exactly what&rsquo;s on file, and correct anything. You can also create your own PlanO supplier account and manage your profile directly.
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
                    <strong className="text-ink">Opt out or delete.</strong> Simply reply to our email, or contact us below, and we&rsquo;ll stop contacting you, remove your profile, or both — whatever you ask. We honor these requests promptly. (Where you ask us to delete personal identifiers, we remove them; general business facts already known in the market may remain as non-identifying information.)
                  </li>
                </ul>

                <div className="p-4 rounded-xl bg-surface border border-border font-sans text-sm text-ink-secondary">
                  To do any of these, reply to our invitation email or write to{" "}
                  <a href="mailto:suppliers@planoevents.site" className="text-primary hover:underline font-medium">
                    suppliers@planoevents.site
                  </a>
                  .
                </div>
              </section>

              {/* Lawful Basis */}
              <section id="lawful-basis" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  Why we are allowed to hold this
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  You may be wondering how we can hold anything about you when you never signed up. Here is the honest answer.
                </p>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  For the shared business facts, we rely on what the law calls <strong className="text-ink">legitimate interest</strong> — the recognised basis that lets a business hold ordinary business information without asking permission first, as long as it is fair and you keep your rights. Coordinators need to remember which suppliers they trust and what those suppliers do. That is a real and ordinary business need, and there is no less intrusive way to meet it.
                </p>

                <div className="space-y-3">
                  <p className="font-sans text-sm font-semibold text-ink">
                    Three things keep this fair, and we hold ourselves to all of them:
                  </p>
                  {[
                    {
                      title: "We keep it to business facts.",
                      body: "Your business name, what you do, where you work, and prices you already advertise publicly. Not your age, your civil status, your religion, or any government ID. Those categories need your consent, so we simply do not put them on an unclaimed profile.",
                    },
                    {
                      title: "We do not make you public.",
                      body: "Nothing about you is shown to coordinators who did not already add you until you claim, verify, and choose to be listed.",
                    },
                    {
                      title: "You can say no.",
                      body: "Object or ask us to delete, and we act on it. Legitimate interest is not a way around your rights; it exists alongside them.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-surface border border-border font-sans text-sm text-ink-secondary leading-relaxed">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <p>
                        <strong className="text-ink">{item.title}</strong> {item.body}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  We rely on your <strong className="text-ink">consent</strong> for one thing only: making your profile publicly discoverable. That is always your choice, and you can withdraw it.
                </p>
              </section>

              {/* Rights */}
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
                    className="text-primary hover:underline"
                  >
                    privacy.gov.ph
                  </a>
                  ). This notice and the choices above are how we make those rights easy to use.
                </p>
              </section>

              {/* Who we are */}
              <section id="who-we-are" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  Who we are
                </h2>
                <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 font-sans text-sm text-ink-secondary">
                  <p className="font-semibold text-ink text-base">PlanO Events</p>
                  <p>Lipa City, Philippines</p>
                  <p>
                    Data privacy:{" "}
                    <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline">
                      privacy@planoevents.site
                    </a>
                    {" · "}Suppliers:{" "}
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
