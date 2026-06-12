import Navigation from "../components/layout/Navigation";
import Hero from "./sections/Hero";
import PainSection from "./sections/PainSection";
import Features from "./sections/Features";
import HowItWorks from "./sections/HowItWorks";
import ForCoordinators from "./sections/ForCoordinators";
import FAQSection from "./sections/FAQSection";
import CTASection from "./sections/CTASection";
import Footer from "../components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <PainSection />
        <Features />
        <HowItWorks />
        <ForCoordinators />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

