import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import PainSection from "./components/PainSection";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import ForCoordinators from "./components/ForCoordinators";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

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
