import { Suspense } from "react";
import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import StatusContent from "./StatusContent";

export const metadata: Metadata = {
  title: "Data Deletion Request Status — PlanO",
  description: "Check the current status of your PlanO data deletion request.",
  robots: { index: false, follow: false },
};

export default function StatusPage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background pb-24 mt-8">
        <div className="max-w-3xl mx-auto px-6">
          <Suspense
            fallback={
              <div className="p-12 text-center text-ink-tertiary font-sans text-sm">
                Loading request status…
              </div>
            }
          >
            <StatusContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
