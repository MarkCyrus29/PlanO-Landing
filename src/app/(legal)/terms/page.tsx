import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Shield } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import LegalTableOfContents from "@/components/legal/LegalTableOfContents";

export const metadata: Metadata = {
  title: "Terms of Service — PlanO",
  description:
    "Terms of Service governing the use of the PlanO AI event brief and supplier coordination platform, including Data Processing Terms under RA 10173.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/terms" },
};

const tableOfContents = [
  { id: "agreement", label: "1. Agreement to these Terms" },
  { id: "service", label: "2. The Service" },
  { id: "eligibility", label: "3. Eligibility and accounts" },
  { id: "customer-data", label: "4. Your data & data of others" },
  { id: "supplier-accounts", label: "4e. Supplier account holders" },
  { id: "dpa-terms", label: "4f. Data Processing Terms" },
  { id: "ai-features", label: "5. AI-assisted features & accuracy" },
  { id: "acceptable-use", label: "6. Acceptable use" },
  { id: "third-parties", label: "7. Third-party services" },
  { id: "billing", label: "8. Subscriptions & payments" },
  { id: "invoicing-tax", label: "8a. Invoicing & tax details" },
  { id: "ip", label: "9. Intellectual property" },
  { id: "ai-ownership", label: "9a. Ownership of AI outputs" },
  { id: "disclaimers", label: "10. Disclaimer of warranties" },
  { id: "liability", label: "11. Limitation of liability" },
  { id: "indemnity", label: "12. Indemnification" },
  { id: "termination", label: "13. Term and termination" },
  { id: "changes", label: "14. Changes to these Terms" },
  { id: "governing-law", label: "15. Governing law & disputes" },
  { id: "contact", label: "16. Contact" },
];

export default function TermsPage() {
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
              <FileText size={13} className="text-primary" />
              <span>Binding Agreement & Data Processing Terms</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl text-ink font-light tracking-tight mb-4">
              PlanO — Terms of Service
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-sans text-xs text-ink-tertiary">
              <span>Sole Proprietorship · Lipa City, Philippines</span>
              <span>•</span>
              <span>Contact: <a href="mailto:info@planoevents.site" className="text-primary hover:underline">info@planoevents.site</a></span>
              <span>•</span>
              <span>Effective: Pre-launch 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Table of contents sticky sidebar on large screens */}
            <LegalTableOfContents items={tableOfContents} />

            {/* Document Content */}
            <article className="lg:col-span-9 prose-legal space-y-12">
              {/* Section 1 */}
              <section id="agreement" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  1. Agreement to these Terms
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  These Terms of Service (&ldquo;Terms&rdquo;) are a binding agreement between you (&ldquo;you,&rdquo; &ldquo;your,&rdquo; or &ldquo;Coordinator&rdquo;) and <strong>PlanO Events, a sole proprietorship in Lipa City, Philippines [DTI registration in progress]</strong> (&ldquo;PlanO,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
                </p>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  By checking the &ldquo;I agree&rdquo; box, clicking &ldquo;Create account,&rdquo; or otherwise accessing or using the PlanO platform (the &ldquo;Service&rdquo;), you confirm that you have read, understood, and agree to be bound by these Terms and by our{" "}
                  <Link href="/privacy" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </Link>
                  , which is incorporated here by reference. If you do not agree, do not use the Service.
                </p>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  If you are accepting these Terms on behalf of a business, you represent that you are authorized to bind that business.
                </p>
              </section>

              {/* Section 2 */}
              <section id="service" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  2. The Service
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  PlanO is a software platform that helps professional event coordinators in the Philippines capture, structure, and manage client inquiries and supplier information, including AI-assisted extraction of structured event briefs, AI-assisted drafting of quotes and replies, and optional scheduling of discovery calls. The specific features available depend on your subscription tier.
                </p>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  We may change, add, or remove features over time. We will give reasonable notice of material changes that reduce core functionality.
                </p>
              </section>

              {/* Section 3 */}
              <section id="eligibility" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  3. Eligibility and accounts
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  You must be at least 18 years old and capable of entering into a binding contract under Philippine law. You are responsible for the accuracy of your account information, for keeping your credentials secure, and for all activity under your account. Notify us promptly at{" "}
                  <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline">
                    privacy@planoevents.site
                  </a>{" "}
                  of any unauthorized use.
                </p>
              </section>

              {/* Section 4 */}
              <section id="customer-data" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  4. Your data and the data of others (important)
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  The Service lets you input, upload, and process information, including personal information of your own clients and suppliers (for example, names, contact details, supplier categories and pricing, and the contents of client messages). This is called &ldquo;Customer Data.&rdquo;
                </p>
                <p className="font-sans text-sm sm:text-base text-ink font-medium">
                  You represent and warrant that:
                </p>
                <ul className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed list-disc pl-5">
                  <li>
                    <strong className="text-ink">a.</strong> You have the right and a lawful basis under the Data Privacy Act of 2012 (RA 10173) to collect that Customer Data and to input it into the Service for processing;
                  </li>
                  <li>
                    <strong className="text-ink">b.</strong> You have given the necessary notices to, and obtained the necessary consent from, your clients and other data subjects for their information to be processed by a service provider like PlanO. You acknowledge that event details ordinarily include <strong>sensitive personal information</strong> under RA 10173 §3(l) — marital status, age, and religious affiliation are all sensitive categories, and event details may reference minors — and that for sensitive personal information the law requires consent that is specific to the purpose and obtained before processing. PlanO supplies ready-made notice and consent wording inside the intake and brief flow; using it is how you meet this obligation in practice.
                  </li>
                  <li>
                    <strong className="text-ink">c.</strong> You are entitled to share the supplier information you input. PlanO holds it in two layers (see the Privacy Policy and Supplier Data Notice): a shared layer of business facts (name, category, service area, reference pricing) and a private layer that is yours alone (your negotiated rate, notes, booking history). Your private layer is never shown to other coordinators, and a supplier&rsquo;s profile is not discoverable by coordinators who did not add them until the supplier claims and lists it. You confirm you have a genuine working relationship with each supplier you add, and suppliers may review, correct, or delete their information;
                  </li>
                  <li>
                    <strong className="text-ink">d.</strong> You will use the Service in compliance with all applicable Philippine laws.
                  </li>
                </ul>
                <div className="p-4 rounded-xl bg-surface border border-primary/20 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  As between you and PlanO, <strong>you are the personal information controller of your Customer Data and PlanO acts as your personal information processor</strong>, processing Customer Data only on your documented instructions and as described in our Privacy Policy. You agree to indemnify and hold PlanO harmless from any claim arising out of your failure to have a lawful basis for the Customer Data you input. The terms governing that processing are set out in <strong>§4f (Data Processing Terms)</strong> below, which forms part of these Terms; no separate addendum needs to be signed.
                </div>

                <div id="supplier-accounts" className="pt-4 space-y-4">
                  <h3 className="font-display text-xl font-normal text-ink">
                    4e. Supplier account holders
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                    A supplier may hold their own PlanO account, by claiming a coordinator-created profile or signing up directly, and agrees to these Terms as they apply to suppliers. Before public listing, the supplier verifies their identity (a business document or government ID plus phone/GCash), which PlanO collects only to confirm identity and protect coordinators from impostors. PlanO is the controller for the shared business-facts layer and the coordinator&rsquo;s processor for the private layer. Public listing requires the supplier to claim, verify, and opt in.
                  </p>
                </div>

                <div id="dpa-terms" className="pt-6 space-y-4">
                  <div className="p-6 rounded-2xl bg-surface border-2 border-border shadow-xs space-y-4">
                    <div className="flex items-center gap-2 text-ink font-display text-xl">
                      <Shield size={20} className="text-primary" />
                      <h3>4f. Data Processing Terms</h3>
                    </div>
                    <p className="font-sans text-sm text-ink-secondary leading-relaxed">
                      This section governs PlanO&rsquo;s processing of Customer Data on your behalf and forms part of these Terms. It is accepted when you accept these Terms; there is nothing separate to sign.
                    </p>
                    <div className="space-y-3 font-sans text-xs sm:text-sm text-ink-secondary leading-relaxed border-t border-border pt-4">
                      <p>
                        <strong className="text-ink">i. Roles.</strong> You are the personal information controller. PlanO is your personal information processor under RA 10173 §14.
                      </p>
                      <p>
                        <strong className="text-ink">ii. Scope and instructions.</strong> PlanO processes Customer Data only to provide the Service and only on your instructions, which are given through your use of the Service and these Terms. We do not process Customer Data for our own purposes, and we do not use your Customer Data or your tie-up rates to train models, build public datasets, or generate revenue from anyone but you.
                      </p>
                      <p>
                        <strong className="text-ink">iii. Confidentiality.</strong> Everyone with access to Customer Data is bound by confidentiality. Staff access occurs only where strictly necessary for maintenance, security, debugging, or migration, as described in the Privacy Policy.
                      </p>
                      <p>
                        <strong className="text-ink">iv. Security.</strong> PlanO maintains reasonable technical and organisational measures appropriate to the risk, including access controls and encryption in transit, as described in the Privacy Policy §13.
                      </p>
                      <p>
                        <strong className="text-ink">v. Sub-processors.</strong> PlanO engages the sub-processors listed in the Privacy Policy §6 (AI, hosting, payments, and the integrations you connect). Each is bound by terms no less protective than these. We will give reasonable notice before adding or replacing a sub-processor that processes Customer Data, and you may terminate if you object.
                      </p>
                      <p>
                        <strong className="text-ink">vi. Assisting you with data subject requests.</strong> If your client or supplier contacts you to access, correct, object to, or delete their information, PlanO will provide reasonable assistance and the tooling to act on it. If they contact us directly about data in your workspace, we will direct them to you and notify you.
                      </p>
                      <p>
                        <strong className="text-ink">vii. Breach notification.</strong> PlanO will notify you without undue delay after becoming aware of a personal data breach affecting your Customer Data, with the information you reasonably need to meet your own obligations to affected data subjects and to the National Privacy Commission.
                      </p>
                      <p>
                        <strong className="text-ink">viii. Return and deletion.</strong> On termination you may export your Customer Data. We delete or return it within the period stated in the Privacy Policy §10, except where law requires longer retention.
                      </p>
                      <p>
                        <strong className="text-ink">ix. Records and cooperation.</strong> PlanO maintains records of its processing and will cooperate reasonably with a lawful NPC inquiry or with your own reasonable compliance review, subject to confidentiality and to the security of other coordinators&rsquo; data.
                      </p>
                      <p>
                        <strong className="text-ink">x. Duration.</strong> These Data Processing Terms apply for as long as PlanO processes Customer Data for you, and the confidentiality and deletion obligations survive termination.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section id="ai-features" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  5. AI-assisted features and accuracy (important)
                </h2>
                <div className="p-4 rounded-xl bg-amber-light/40 border border-secondary/30 font-sans text-sm text-ink-secondary leading-relaxed">
                  <p className="text-ink font-medium mb-1">
                    PlanO uses artificial intelligence to extract, summarize, suggest, and draft content. AI output can be incomplete, inaccurate, or wrong.
                  </p>
                </div>
                <ul className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed list-disc pl-5">
                  <li>
                    <strong className="text-ink">a. AI output is a draft, not a decision.</strong> You are solely responsible for reviewing, verifying, and approving any AI-generated brief, quote, price, reply, or recommendation before relying on or acting on it, and before any of it is sent to a client or supplier.
                  </li>
                  <li>
                    <strong className="text-ink">b.</strong> PlanO does not guarantee the accuracy, completeness, or fitness for any purpose of AI output.
                  </li>
                  <li>
                    <strong className="text-ink">c.</strong> PlanO is a workflow tool. It does not provide professional, legal, financial, or pricing advice, and it does not make commitments to your clients on your behalf.
                  </li>
                </ul>
              </section>

              {/* Section 6 */}
              <section id="acceptable-use" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  6. Acceptable use
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  You agree not to: use the Service for any unlawful purpose; upload data you have no right to upload; attempt to reverse-engineer, scrape, or disrupt the Service; resell or sublicense the Service without our written consent; or use the Service to send spam or unsolicited messages in violation of law or platform rules (including Meta&rsquo;s policies).
                </p>
              </section>

              {/* Section 7 */}
              <section id="third-parties" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  7. Third-party services
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  The Service integrates with third parties, including Meta (Facebook/Instagram messaging), Google (Calendar, optional; and our AI provider), AI model providers, hosting providers, and our payment gateway. Your use of those integrations is also subject to the third parties&rsquo; own terms.
                </p>
                <ul className="space-y-2.5 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed list-disc pl-5">
                  <li>
                    When you connect a Meta account, you authorize PlanO to access and process message data from that account solely to provide the Service to you.
                  </li>
                  <li>
                    When you optionally connect Google Calendar, you authorize PlanO to read your availability and create calendar events for booked calls, solely to provide the scheduling feature. PlanO&rsquo;s use of Google data follows the Google API Services User Data Policy, including its Limited Use requirements, as described in our Privacy Policy.
                  </li>
                </ul>
                <p className="font-sans text-sm sm:text-base text-ink font-medium">
                  You can disconnect any integration at any time.
                </p>
              </section>

              {/* Section 8 */}
              <section id="billing" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  8. Subscriptions, billing, and payments
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Paid tiers are billed by PlanO directly, using <strong>PayMongo</strong> as our payment gateway to process payments (for example, card and GCash). <strong>PlanO is the seller of record.</strong> Prices are stated in PHP and are exclusive of applicable taxes as indicated at checkout, and PlanO issues the corresponding official receipt or invoice as required under Philippine law. Billing, renewal, refunds, and cancellation follow the process presented at checkout and described in this Section. Your use of the payment feature is also subject to PayMongo&rsquo;s applicable terms. Founding/CAB rates, where offered, are governed by your separate CAB Membership Agreement.
                </p>

                <div id="invoicing-tax" className="pt-4 space-y-4">
                  <h3 className="font-display text-xl font-normal text-ink">
                    8a. Invoicing and your tax details
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                    PlanO issues a BIR-registered service invoice for each subscription payment. If you need that invoice to carry your business details so your accountant can book the subscription as a business expense, you may optionally provide your registered business name, TIN, registered business address, and a finance email in your billing profile. By providing them you confirm you are authorised to do so and consent to their use solely for issuing and recording your invoices, as described in the Privacy Policy §2g.
                  </p>
                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                    You are responsible for the accuracy of these details. We issue invoices from what you give us, and a corrected invoice can only be issued in line with BIR rules. Invoices may be delivered as a scanned or electronic copy; the registered invoice is the compliance document regardless of how it reaches you. Because tax law requires us to keep issued invoices and supporting records, you can remove your billing details from future invoices at any time, but invoices already issued cannot be deleted (Privacy Policy §10).
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="ip" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  9. Intellectual property
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  PlanO and its software, design, and content are owned by us and protected under the Intellectual Property Code of the Philippines (RA 8293) and other laws. We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service during your subscription. You retain all rights to your Customer Data. You grant us a limited license to host and process your Customer Data only to provide and improve the Service, consistent with our Privacy Policy.
                </p>

                <div id="ai-ownership" className="pt-4 space-y-4">
                  <h3 className="font-display text-xl font-normal text-ink">
                    9a. What the AI makes for you is yours
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                    When PlanO&rsquo;s AI generates content for you — a draft brief, quote, reply, or event timeline — that output is yours to use, keep, edit, and own, as between you and PlanO. We do not claim ownership of it. (Our ability to use anonymized, de-identified patterns to improve the Service, described in our Privacy Policy, is separate and does not affect your ownership of the output created for you.)
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="disclaimers" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  10. Disclaimer of warranties
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement, to the fullest extent permitted by law. We do not warrant that the Service will be uninterrupted, error-free, or secure.
                </p>
              </section>

              {/* Section 11 */}
              <section id="liability" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  11. Limitation of liability
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  To the fullest extent permitted by Philippine law, PlanO will not be liable for any indirect, incidental, special, consequential, or exemplary damages, or for lost profits, lost data, or business interruption, arising out of or related to the Service. Our total aggregate liability for any claim will not exceed the amount you paid us in the three (3) months before the event giving rise to the claim. Nothing in these Terms excludes liability that cannot be excluded under Philippine law.
                </p>
              </section>

              {/* Section 12 */}
              <section id="indemnity" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  12. Indemnification
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  You agree to indemnify and hold harmless PlanO and its team from claims, damages, and expenses arising out of your Customer Data, your use of the Service, or your breach of these Terms.
                </p>
              </section>

              {/* Section 13 */}
              <section id="termination" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  13. Term and termination
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  These Terms apply while you use the Service. You may stop using the Service and close your account at any time. We may suspend or terminate your access for breach of these Terms or applicable law. On termination, your right to use the Service ends; data handling on termination is described in our Privacy Policy and in §4f (Data Processing Terms).
                </p>
              </section>

              {/* Section 14 */}
              <section id="changes" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  14. Changes to these Terms
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  We may update these Terms. If a change is material, we will give reasonable notice (for example, by email or in-app) before it takes effect, and where the law requires it, your continued use after the effective date constitutes acceptance. We keep a record of the version of the Terms you accepted and the date you accepted them.
                </p>
              </section>

              {/* Section 15 */}
              <section id="governing-law" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  15. Governing law and disputes
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  These Terms are governed by the laws of the Republic of the Philippines. The parties will first attempt to resolve any dispute amicably before pursuing formal action.
                </p>
              </section>

              {/* Section 16 */}
              <section id="contact" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  16. Contact
                </h2>
                <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 font-sans text-sm text-ink-secondary">
                  <p className="font-semibold text-ink text-base">PlanO Events</p>
                  <p>[Registered address, Lipa City, Philippines]</p>
                  <p>
                    Email:{" "}
                    <a href="mailto:info@planoevents.site" className="text-primary hover:underline">
                      info@planoevents.site
                    </a>
                  </p>
                  <p>
                    Data privacy matters:{" "}
                    <a href="mailto:dpo@planoevents.site" className="text-primary hover:underline">
                      dpo@planoevents.site
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
