import { Lock } from "lucide-react";
import { RevealWrapper } from "../../components/ui/RevealWrapper";
import { CTAForm } from "./CTAForm";

export default function CTASection() {
  return (
    <section id="cta" className="bg-primary py-24 lg:py-32">
      <RevealWrapper className="max-w-2xl mx-auto px-6 text-center reveal-stagger">
        <h2 className="reveal-fade-up font-display text-4xl lg:text-5xl font-light text-surface mb-6 leading-snug">
          Be part of the waitlist
          <br />
          for PlanO.
        </h2>

        <div className="reveal-fade-up">
          <CTAForm />
        </div>

        <div className="reveal-fade-up flex items-center justify-center gap-2 font-sans text-xs text-surface/60 mt-4">
          <Lock size={12} />
          <span>Your information is private and never shared with suppliers.</span>
        </div>
      </RevealWrapper>
    </section>
  );
}
