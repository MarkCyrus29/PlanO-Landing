import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle2, ArrowUpRight } from "lucide-react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import LegalTableOfContents from "@/components/legal/LegalTableOfContents";

export const metadata: Metadata = {
  title: "Privacy Policy — PlanO",
  description:
    "How PlanO handles personal information in line with the Philippine Data Privacy Act of 2012 (RA 10173), NPC issuances, and Google and Meta platform requirements.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
};

const tableOfContents = [
  { id: "short-version", label: "The short version" },
  { id: "who-we-are", label: "1. Who we are" },
  { id: "information-we-collect", label: "2. The information we collect" },
  { id: "how-we-use-information", label: "3. How we use information & lawful basis" },
  { id: "sensitive-information", label: "3a. Sensitive personal information" },
  { id: "private-workspace-data", label: "4. Private workspace data (two layers)" },
  { id: "supplier-profiles", label: "5. Supplier profiles model" },
  { id: "sub-processors", label: "6. Who we share information with" },
  { id: "notifying-suppliers", label: "7. Notifying referenced suppliers" },
  { id: "your-rights", label: "8. Your rights under RA 10173" },
  { id: "cross-border", label: "9. Cross-border transfers" },
  { id: "data-retention", label: "10. Data retention" },
  { id: "deleting-your-data", label: "11. Deleting your data" },
  { id: "cookies", label: "12. Cookies" },
  { id: "security", label: "13. Security" },
  { id: "children", label: "14. Children" },
  { id: "changes", label: "15. Changes to this Policy" },
  { id: "contact", label: "16. Contact" },
];

export default function PrivacyPage() {
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
              <Shield size={13} className="text-primary" />
              <span>Data Privacy Act of 2012 (RA 10173) Compliant</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl text-ink font-light tracking-tight mb-4">
              PlanO — Privacy Policy
            </h1>
            <div className="flex flex-wrap items-center gap-3 font-sans text-xs text-ink-tertiary">
              <span>Sole Proprietorship · Lipa City, Batangas, Philippines</span>
              <span>•</span>
              <span>DPO: <a href="mailto:dpo@planoevents.site" className="text-primary hover:underline">dpo@planoevents.site</a></span>
              <span>•</span>
              <span>Effective: Pre-launch 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Table of contents sticky sidebar on large screens */}
            <LegalTableOfContents items={tableOfContents} />

            {/* Document Content */}
            <article className="lg:col-span-9 prose-legal space-y-12">
              {/* The Short Version */}
              <section
                id="short-version"
                className="bg-surface rounded-2xl border-2 border-primary/30 p-6 sm:p-8 shadow-xs"
              >
                <div className="flex items-center gap-2 text-primary font-display font-medium text-xl sm:text-2xl mb-4">
                  <Shield size={22} className="shrink-0" />
                  <h2>The short version (plain language)</h2>
                </div>
                <div className="space-y-3.5 font-sans text-sm sm:text-base text-ink leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                    <span>We collect only what we need to run PlanO and make it better.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                    <span><strong>We never sell your data, and we never rent it.</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                    <span>
                      Your private supplier list, your tie-up rates, and who&rsquo;s in your workspace stay <strong>visible only to you</strong>. Our staff do not access or use your tie-up rates.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                    <span>Our AI runs on Google&rsquo;s paid enterprise tier — your data is never used to train Google&rsquo;s models.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                    <span>We use trusted service providers (for AI, hosting, and payments) and we tell you who they are.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                    <span>
                      Event details often include information the law treats as sensitive, so your client&rsquo;s consent matters — and we give you the wording to collect it, so you don&rsquo;t have to write it yourself.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-primary mt-1 shrink-0" />
                    <span>You can access, correct, or delete your data anytime.</span>
                  </div>
                </div>
                <p className="mt-6 pt-4 border-t border-border/70 font-sans text-xs text-ink-tertiary">
                  The full details are below. This summary is for convenience and does not replace it.
                </p>
              </section>

              {/* Section 1 */}
              <section id="who-we-are" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  1. Who we are
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  This Privacy Policy explains how <strong>PlanO Events, a sole proprietorship in Lipa City, Philippines [DTI registration in progress]</strong> (&ldquo;PlanO,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) handles personal information, in line with the Data Privacy Act of 2012 (RA 10173), its Implementing Rules and Regulations, and issuances of the National Privacy Commission (NPC).
                </p>
                <div className="p-4 rounded-xl bg-surface border border-border inline-block font-sans text-xs sm:text-sm text-ink">
                  <strong>Data Protection Officer:</strong>{" "}
                  <a href="mailto:dpo@planoevents.site" className="text-primary hover:underline">
                    dpo@planoevents.site
                  </a>
                </div>
              </section>

              {/* Section 2 */}
              <section id="information-we-collect" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  2. The information we collect
                </h2>
                <div className="space-y-4 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <p>
                    <strong className="text-ink font-semibold">a. Waitlist information.</strong> The email address you submit on our website, used only to send you updates about PlanO.
                  </p>
                  <p>
                    <strong className="text-ink font-semibold">b. Account information.</strong> When you create an account: your name, work email, business details, and login credentials.
                  </p>
                  <p>
                    <strong className="text-ink font-semibold">c. Onboarding and usage information.</strong> During setup we may collect operational details about your business (for example, events per week, busy and slow months, typical inquiry volume) and how you use the Service. Some of this is stored for our internal product and analytics purposes to improve PlanO and is not necessarily displayed back to you.
                  </p>
                  <p>
                    <strong className="text-ink font-semibold">c-1. Incomplete signup information.</strong> If you begin creating an account but do not complete payment, we keep the account details you entered (such as your name and email) in a pending state so you can return and finish, and so we can send you a reminder to complete signup. See Sections 3 and 5b.
                  </p>
                  <p>
                    <strong className="text-ink font-semibold">g. Tax and invoicing details (optional).</strong> If you want a BIR-compliant service invoice for your subscription, you can give us your registered business name, Taxpayer Identification Number (TIN), registered business address, and a finance or accounts-payable email. Providing these is entirely optional — the Service works without them — and we use them <strong>only</strong> to prepare, issue, and keep records of your invoices. We do not use them for marketing, profiling, or any other purpose. If you are a sole proprietor, note that your TIN and registered details are also personal information about you, and they are held under the same protections as everything else in this Policy. See §10 for how long invoicing records are kept.
                  </p>
                  <p>
                    <strong className="text-ink font-semibold">d. Customer Data you provide.</strong> As a coordinator, you input information to run your workflow, including the personal information of your own clients and suppliers (names, contact details, message contents, event details, supplier categories, and pricing). For this information, <strong>you are the controller and PlanO is your processor</strong> — we process it on your instructions to provide the Service.
                  </p>
                  <p>
                    <strong className="text-ink font-semibold">e. Connected messaging data (Meta).</strong> If you connect a Meta (Facebook/Instagram) account, we access and process the message threads and related data you authorize, solely to provide the Service to you.
                  </p>
                  <p>
                    <strong className="text-ink font-semibold">f. Connected calendar data (Google) — optional.</strong> If you choose to connect Google Calendar, we access your calendar to read your availability and to write events for booked discovery calls. This integration is entirely optional. We request the minimum access needed and you can disconnect at any time. See Section 6a for how we handle Google user data.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="how-we-use-information" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  3. How we use information, and our lawful basis
                </h2>
                <div className="overflow-x-auto rounded-xl border border-border shadow-xs">
                  <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse bg-surface">
                    <thead>
                      <tr className="bg-primary-light/50 border-b border-border text-ink font-semibold">
                        <th className="py-3 px-4 sm:px-6">Purpose</th>
                        <th className="py-3 px-4 sm:px-6">Lawful basis (RA 10173)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60 text-ink-secondary">
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">Send waitlist/launch updates</td>
                        <td className="py-3 px-4 sm:px-6">Your consent</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">Provide and operate the Service</td>
                        <td className="py-3 px-4 sm:px-6">Performance of our contract with you</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">Process your Customer Data</td>
                        <td className="py-3 px-4 sm:px-6">On your instructions, as your processor</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">
                          Process client event details that qualify as sensitive personal information (see §3a)
                        </td>
                        <td className="py-3 px-4 sm:px-6">
                          Consent obtained by you from your client, specific to the purpose and prior to processing (RA 10173 §13(a)); PlanO processes only as your processor
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">Schedule calls via your connected calendar (if enabled)</td>
                        <td className="py-3 px-4 sm:px-6">Performance of our contract with you</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">Secure the Service, prevent abuse</td>
                        <td className="py-3 px-4 sm:px-6">Our legitimate interests</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">
                          Improve the Service using internal analytics and de-identified patterns
                        </td>
                        <td className="py-3 px-4 sm:px-6">
                          Our legitimate interests, in a way that does not identify any individual
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">Notify suppliers referenced by coordinators (Section 7)</td>
                        <td className="py-3 px-4 sm:px-6">Our legitimate interests, balanced against supplier rights</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">Remind you to complete an incomplete signup (Section 5b)</td>
                        <td className="py-3 px-4 sm:px-6">Our legitimate interests</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">Collect your tax and invoicing details (§2g)</td>
                        <td className="py-3 px-4 sm:px-6">Your consent, given at the point you provide them</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">
                          Issue and retain BIR-compliant invoices and books of account
                        </td>
                        <td className="py-3 px-4 sm:px-6">
                          Legal obligation (National Internal Revenue Code and BIR regulations)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 sm:px-6 text-ink">Comply with law</td>
                        <td className="py-3 px-4 sm:px-6">Legal obligation</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="font-sans text-sm font-semibold text-ink pt-2">
                  We do not sell your personal information, and we do not share it for others&rsquo; independent use.
                </p>
              </section>

              {/* Section 3a */}
              <section id="sensitive-information" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  3a. Sensitive personal information in client event details
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Event work involves categories that RA 10173 §3(l) treats as sensitive personal information — including marital status, age, and religious affiliation. A wedding brief will ordinarily contain at least one of these, and event details may also reference a child celebrant or minors attending.
                </p>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  This matters because sensitive personal information cannot be processed on the basis of legitimate interest. Under §13, processing is prohibited unless a narrow exception applies, and the applicable one here is the data subject&rsquo;s consent, specific to the purpose and given before processing.
                </p>
                <p className="font-sans text-sm sm:text-base text-ink font-medium">How we handle this:</p>
                <ul className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed list-disc pl-5">
                  <li>
                    <strong className="text-ink">You obtain the consent, not us.</strong> Your client is your client. As controller, you are responsible for informing them and obtaining their consent for their event details to be processed by a service provider like PlanO. Your Terms of Service §4b sets out this obligation.
                  </li>
                  <li>
                    <strong className="text-ink">We give you the wording.</strong> PlanO provides ready-made notice and consent text inside the intake and brief flow so you do not have to draft it. Using it is how you meet §4b in practice.
                  </li>
                  <li>
                    <strong className="text-ink">We minimize what we hold.</strong> We do not store raw message threads beyond what is needed to produce and maintain your brief, and we keep only the fields the brief requires.
                  </li>
                  <li>
                    <strong className="text-ink">We never use it for our own purposes.</strong> Client event details are processed solely to provide the Service to you. They are not used for analytics, product training, or any purpose you have not instructed.
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="private-workspace-data" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  4. How your private workspace data is handled (the two-layer model)
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  We separate two kinds of information and treat them differently:
                </p>
                <ul className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed list-disc pl-5">
                  <li>
                    <strong className="text-ink">Your private relational data</strong> — which suppliers you use, your negotiated tie-up rates, and who is in your workspace — is visible only to you within your workspace. It is not shared with other coordinators or with your clients, and we do not use it to identify you to anyone outside the platform.
                  </li>
                  <li>
                    <strong className="text-ink">De-identified, aggregate signals</strong> — for example, that a supplier category is referenced often across the network — may be used to improve discovery and platform quality in a way that never traces back to you or to your specific relationship with any supplier.
                  </li>
                </ul>
                <div className="p-4 rounded-xl bg-surface border border-primary/20 font-sans text-sm text-ink-secondary leading-relaxed">
                  <strong className="text-ink">Your tie-up rates specifically.</strong> Your negotiated tie-up rates are stored within your workspace solely to power your own private view. Our staff do not access or use them in normal operations. Access may occur only where strictly necessary for maintenance, security, debugging, or data migration, by authorized personnel, and never to share, sell, or commercialize them.
                </div>
              </section>

              {/* Section 5 */}
              <section id="supplier-profiles" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  5. Supplier profiles — the two-layer model
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Supplier information sits in two layers. All of it comes from coordinators — <strong>we do not scrape Facebook, Instagram, or other platforms.</strong>
                </p>
                <div className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <p>
                    <strong className="text-ink">Layer 1 — shared business facts.</strong> Business name, service category, service area, and publicly advertised pricing. <strong>PlanO is the controller</strong> for this layer. It is marked community-contributed and unverified until the supplier claims it.
                  </p>
                  <p>
                    <strong className="text-ink">Layer 2 — each coordinator&rsquo;s private record.</strong> A coordinator&rsquo;s negotiated rate, notes, and booking history. <strong>The coordinator is the controller and PlanO is their processor.</strong> It is visible only to that coordinator, never shown to others, and a negotiated rate is never placed on the shared layer.
                  </p>
                  <p>
                    Personal identifiers — a supplier&rsquo;s personal name, personal mobile, or personal social account — <strong>do not cross workspaces on the shared layer.</strong> They stay in the private layer, or wait for the supplier&rsquo;s own claim and consent.
                  </p>
                  <p>
                    <strong className="text-ink">Our lawful basis for the shared layer.</strong> Many Philippine suppliers are sole proprietors, so their business details can also be personal information. We therefore do not rely on the argument that business facts fall outside the law. We rely instead on legitimate interest under RA 10173 §12(f) — our interest, and coordinators&rsquo; interest, in maintaining accurate records of the suppliers they work with. We keep this narrow, and the limits below are what keep it fair. We keep the shared layer strictly to business-facing fields, which is what keeps this layer clear of the sensitive categories described in §3a, where legitimate interest would not be available. We do not rely on consent for this layer; consent applies only at the point a supplier claims and lists a profile.
                  </p>
                </div>
                <ul className="space-y-2 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed list-disc pl-5">
                  <li>An unclaimed profile is not public and not discoverable by coordinators who did not add the supplier. We do not show a supplier&rsquo;s logo before they claim it.</li>
                  <li>A profile becomes public only if the supplier claims it, verifies their identity, and opts in (Section 5a).</li>
                  <li>
                    Suppliers can see, correct, object to, or delete their information whether or not they have claimed a profile. In the private phase, a request about one coordinator&rsquo;s private record goes to that coordinator; requests about the shared layer, and all requests after a claim, are handled by PlanO. See the Supplier Data Notice and Section 8.
                  </li>
                </ul>

                <div className="pt-4 space-y-4">
                  <h3 className="font-display text-xl font-normal text-ink">
                    5a. Supplier verification and accounts
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                    Suppliers may hold their own PlanO account, whether they claim an existing profile or sign up directly.
                  </p>
                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                    Before a profile is publicly listed, the supplier completes an identity check — a business document or government ID, plus a phone or GCash confirmation. We use this only to confirm identity and protect coordinators from impostors.
                  </p>
                </div>

                <div className="pt-4 space-y-4">
                  <h3 className="font-display text-xl font-normal text-ink">
                    5b. Recovering incomplete signups
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                    If you start signing up but do not complete payment, we keep what you entered so you can finish, and we may email you a reminder. You can ask us to delete a pending account anytime via{" "}
                    <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline">
                      privacy@planoevents.site
                    </a>
                    , and we delete pending accounts left inactive after 90 days.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="sub-processors" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  6. Who we share information with (sub-processors)
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  We share information only with service providers that help us run PlanO, under appropriate safeguards:
                </p>
                <ul className="space-y-2.5 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed list-disc pl-5">
                  <li>
                    <strong className="text-ink">AI provider (Google)</strong> — our AI features run on Google&rsquo;s Gemini models through a single, paid Google Cloud project. See Section 6a for what this means for your data;
                  </li>
                  <li>
                    <strong className="text-ink">Hosting/infrastructure</strong> (Vercel and our database provider) — to store and serve the Service;
                  </li>
                  <li>
                    <strong className="text-ink">Payment</strong> (PayMongo, our payment gateway; PlanO is the seller of record) — to process subscription payments;
                  </li>
                  <li>
                    <strong className="text-ink">Meta</strong> — only as needed to operate the messaging integration you connect;
                  </li>
                  <li>
                    <strong className="text-ink">Google</strong> — also used, separately, to operate the optional calendar integration you connect.
                  </li>
                </ul>
                <p className="font-sans text-sm sm:text-base text-ink font-medium">
                  We do not allow these providers to use your information for their own unrelated purposes.
                </p>

                <div className="pt-4 space-y-4">
                  <h3 className="font-display text-xl font-normal text-ink">
                    6a. AI provider — no training on your data
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                    PlanO runs its AI features on Google&rsquo;s paid enterprise tier under the Google Cloud Data Processing Addendum. Under those terms, your prompts and the data we process for you are <strong>not used to train Google&rsquo;s models</strong>, and we do not use any free or consumer-tier AI service anywhere in the Service. If we change AI providers or add another one, we will update this Policy and the sub-processor list in §6 before the change takes effect.
                  </p>
                </div>

                <div className="pt-4 space-y-4">
                  <h3 className="font-display text-xl font-normal text-ink">
                    6b. Google user data — Limited Use (Calendar)
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                    For the separate, optional Google Calendar integration, PlanO&rsquo;s use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including its Limited Use requirements. We use Google Calendar data only to provide the scheduling features you enable, we do not use it for advertising, we do not sell it, and we do not allow humans to read it except where you explicitly request support, where required for security or to comply with law, or in aggregated, de-identified form.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="notifying-suppliers" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  7. Notifying suppliers referenced by coordinators
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  As PlanO grows, when a supplier has been independently added by several different coordinators, we may send that supplier a one-time email invitation to claim a profile on PlanO.
                </p>
                <ul className="space-y-2.5 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed list-disc pl-5">
                  <li>
                    This invitation is <strong>coordinator-anonymized</strong>: it tells the supplier that several coordinators have referenced them, but it does not name which coordinators, and it never discloses any coordinator&rsquo;s rates, client details, or workspace contents. (The supplier is identified to themselves on their own profile; what stays hidden is the identity of the coordinators who vouched.)
                  </li>
                  <li>
                    We rely on our legitimate interest in connecting vouched-for professionals to a tool that benefits them, balanced against supplier rights.
                  </li>
                  <li>
                    Every invitation explains how to opt out, object, or request deletion — a supplier can simply reply to the email. We honor those requests promptly and keep a minimal suppression record so we do not contact them again.
                  </li>
                  <li>Supplier outreach is conducted by email only.</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section id="your-rights" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  8. Your rights under the Data Privacy Act
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  You have the right to be informed, to object to processing, to access your personal information, to correct it, to erasure or blocking, to data portability, to damages, and to lodge a complaint with the National Privacy Commission. To exercise any of these, contact{" "}
                  <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline font-medium">
                    privacy@planoevents.site
                  </a>
                  . We will respond within the period required by law. These rights are available to coordinators, clients whose data is processed, and suppliers (including those with unclaimed profiles).
                </p>
              </section>

              {/* Section 9 */}
              <section id="cross-border" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  9. Cross-border transfers
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Some service providers process data outside the Philippines. Our AI provider does so under the Google Cloud Data Processing Addendum (Section 6a), which bars training on your data. Hosting and calendar providers process abroad under their own terms. For all cross-border transfers, we take the steps RA 10173 requires to ensure comparable protection, including contractual safeguards. By using the Service, you are informed of these transfers.
                </p>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <strong className="text-ink">Client event details cross the border too.</strong> Producing your brief means sending client message content to our AI provider outside the Philippines, and that content can include the sensitive categories described in §3a. We remain accountable for it under RA 10173 §21 wherever it is processed.
                </p>
              </section>

              {/* Section 10 */}
              <section id="data-retention" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  10. Data retention
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  We keep personal information only as long as needed for the purposes above or as required by law. Waitlist emails are kept until you ask us to delete them. Account and Customer Data are kept for the life of your account and deleted or returned within 30 days of account closure, except where law requires longer retention.
                </p>
                <div className="p-4 rounded-xl bg-surface border border-border font-sans text-sm text-ink-secondary leading-relaxed">
                  <strong className="text-ink">Invoicing records.</strong> Once we have issued an invoice using your tax details, that invoice and its supporting records must be kept for the period Philippine tax law requires, which is generally ten years for books of account and supporting documents under BIR rules. This means that if you later withdraw your consent or ask us to delete your billing profile, we will stop using your details for any future invoice and remove them from your active billing profile, but we cannot delete invoices already issued — retaining those is a legal obligation, not a choice.
                </div>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Unclaimed supplier profiles are deleted on a valid request from the supplier; after an opt-out we retain only a minimal suppression record so we do not re-contact them, and we may retain anonymized, aggregate signals that do not identify any individual.
                </p>
              </section>

              {/* Section 11 */}
              <section id="deleting-your-data" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  11. Deleting your data
                </h2>
                <div className="space-y-3 font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  <p>
                    <strong className="text-ink">Account deletion:</strong> Request deletion of your account and associated personal information by emailing{" "}
                    <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline">
                      privacy@planoevents.site
                    </a>{" "}
                    or using the in-app deletion option.
                  </p>
                  <p>
                    <strong className="text-ink">Meta data deletion:</strong> If you connected a Meta account, you can disconnect it in-app at any time. To request deletion of message data we processed, follow the instructions at{" "}
                    <Link
                      href="/data-deletion"
                      className="text-primary font-medium hover:underline inline-flex items-center gap-1"
                    >
                      planoevents.site/data-deletion
                      <ArrowUpRight size={13} />
                    </Link>
                    .
                  </p>
                  <p>
                    <strong className="text-ink">Google Calendar:</strong> You can disconnect Google Calendar in-app at any time, which stops further access. You may request deletion of any calendar-derived data we hold via{" "}
                    <a href="mailto:privacy@planoevents.site" className="text-primary hover:underline">
                      privacy@planoevents.site
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* Section 12 */}
              <section id="cookies" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  12. Cookies
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  At this time, PlanO uses only essential cookies needed to operate the Service (for example, to keep you signed in). We do not currently run third-party analytics or advertising cookies. Before we introduce any non-essential cookies (such as analytics), we will update this Policy, post a cookie notice, and obtain consent where the law requires it.
                </p>
              </section>

              {/* Section 13 */}
              <section id="security" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  13. Security
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  We use reasonable technical and organizational measures to protect personal information, including access controls and encryption in transit. No system is perfectly secure; we will notify affected data subjects and the NPC of a personal data breach as required by law.
                </p>
              </section>

              {/* Section 14 */}
              <section id="children" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  14. Children
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  PlanO is a business tool for professional event coordinators. It is not directed at children, children are not our users, and no part of the Service is designed for or made available to them. We do not knowingly collect the personal information of minors as account holders. Because children do not access the Service, the age-appropriate notice requirements that apply to products and services likely to be accessed by children are not applicable to PlanO.
                </p>
                <div className="p-4 rounded-xl bg-surface border border-border font-sans text-sm text-ink-secondary leading-relaxed">
                  <strong className="text-ink">Minors inside client event data.</strong> Event work can still involve minors — a child celebrant, children in a wedding party, or a guest list. Where your event details reference a minor, you remain the controller and are responsible for the consent of a parent or guardian, on the same basis as §3a. PlanO holds only what your brief requires, never uses it for any purpose beyond providing the Service to you, and applies the same protections as for any other sensitive information. Penalties under the Data Privacy Act are heightened where a violation affects minors, and we handle this data accordingly.
                </div>
              </section>

              {/* Section 15 */}
              <section id="changes" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  15. Changes to this Policy
                </h2>
                <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
                  We may update this Policy. We will post the new version with a revised &ldquo;Last updated&rdquo; date and, for material changes, give reasonable notice. Where a change materially alters the purpose for which already-collected personal information is used, we will seek fresh consent where the law requires it rather than relying on notice alone.
                </p>
              </section>

              {/* Section 16 */}
              <section id="contact" className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-ink">
                  16. Contact
                </h2>
                <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 font-sans text-sm text-ink-secondary">
                  <p className="font-semibold text-ink text-base">PlanO Events</p>
                  <p>Lipa City, Philippines</p>
                  <p>
                    Privacy / DPO:{" "}
                    <a href="mailto:dpo@planoevents.site" className="text-primary hover:underline">
                      dpo@planoevents.site
                    </a>{" "}
                    · General:{" "}
                    <a href="mailto:info@planoevents.site" className="text-primary hover:underline">
                      info@planoevents.site
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
