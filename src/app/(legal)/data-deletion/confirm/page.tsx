import { Suspense } from "react";
import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ConfirmContent from "./ConfirmContent";

export const metadata: Metadata = {
  title: "Confirm Data Deletion — PlanO",
  description: "Confirm your PlanO account and data deletion request.",
  robots: { index: false, follow: false },
};

export default function ConfirmPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background pb-24 mt-8">
        <div className="max-w-2xl mx-auto px-6">
          <Suspense
            fallback={
              <div className="p-12 text-center text-ink-tertiary font-sans text-sm">
                Loading confirmation details…
              </div>
            }
          >
            <ConfirmContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
