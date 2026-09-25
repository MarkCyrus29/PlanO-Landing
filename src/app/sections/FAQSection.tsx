import { ChevronDown } from "lucide-react";
import { RevealWrapper } from "../../components/ui/RevealWrapper";

const faqs = [
  {
    question: "What is PlanO?",
    answer:
      "PlanO is an AI-powered event planning tool built for Filipino event coordinators. It converts messy client messages — including Taglish — into structured event briefs in seconds and matches coordinators with the right suppliers based on budget, location, and margin preferences.",
  },
  {
    question: "How does PlanO create event briefs?",
    answer:
      "Paste a client message from Messenger, Viber, SMS, or any platform. PlanO's AI reads it — typos, Taglish, and all — and extracts a structured event brief with fields like event type, date, guest count, budget, and venue. It also flags missing details and drafts follow-up questions for you.",
  },
  {
    question: "How does supplier matching work?",
    answer:
      "PlanO matches you with suppliers from your private database. It filters by distance from the venue and price within the client's budget, and optimizes for your profit margin — not just the cheapest option. Your supplier list is private and never shared with other coordinators.",
  },
  {
    question: "How do I get access to PlanO?",
    answer:
      "PlanO is currently rolling out access to waitlist members. Sign up for the waitlist and we'll notify you when your spot is ready.",
  },
  {
    question: "Who is PlanO for?",
    answer:
      "PlanO is built specifically for freelance and independent event coordinators in the Philippines — wedding coordinators, corporate event planners, and debut organizers who manage client inquiries across multiple messaging platforms.",
  },
  {
    question: "Does PlanO understand Taglish?",
    answer:
      "Yes. PlanO's AI is designed to understand Taglish (Tagalog-English mixed language), including informal chat-style messages with abbreviations, typos, and colloquial expressions commonly used in Filipino conversations.",
  },
  {
    question: "Is my supplier list private?",
    answer:
      "Absolutely. Your supplier database in PlanO is private and encrypted. No other coordinator can see your supplier list, pricing, or margin settings. PlanO is not a marketplace — it's your personal coordination tool.",
  },
  {
    question: "When will PlanO launch?",
    answer:
      "PlanO is currently rolling out access in waves to waitlist members. Join the waitlist to be notified when your spot is ready.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="bg-background py-24 lg:py-32">
      <RevealWrapper className="max-w-3xl mx-auto px-6 reveal-stagger">
        <p className="reveal-fade-up font-mono text-xs text-ink-tertiary uppercase tracking-widest mb-4">
          Frequently Asked Questions
        </p>
        <h2 className="reveal-fade-up font-display text-3xl lg:text-4xl font-light text-ink mb-12 leading-snug">
          Got questions?{" "}
          <span className="font-semibold text-primary">We have answers.</span>
        </h2>

        <div className="space-y-3 reveal-stagger">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group reveal-fade-up bg-surface border border-border/80 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer">
                <span className="font-sans text-sm font-semibold text-ink group-hover:text-primary transition-colors duration-150">
                  {faq.question}
                </span>
                <ChevronDown
                  size={16}
                  className="text-ink-tertiary shrink-0 transition-transform duration-300 group-open:rotate-180"
                />
              </summary>
              <div className="px-6 pb-5 font-sans text-sm text-ink-secondary leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </RevealWrapper>
    </section>
  );
}
