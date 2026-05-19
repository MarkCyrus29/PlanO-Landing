import Navigation from "../components/layout/Navigation";
import Hero from "./sections/Hero";
import PainSection from "./sections/PainSection";
import Features from "./sections/Features";
import HowItWorks from "./sections/HowItWorks";
import ForCoordinators from "./sections/ForCoordinators";
import CTASection from "./sections/CTASection";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <PainSection />
        <Features />
        <HowItWorks />
        <ForCoordinators />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
