import type { Metadata } from "next";
import { Inter, Fraunces, DM_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://planoevents.site"),
  title: "PlanO | AI Event Brief Generator & Supplier Matching — Philippines",
  description:
    "PlanO turns messy client chats into professional event briefs and finds the right suppliers for your budget, instantly. Built for event coordinators in the Philippines.",
  keywords: [
    "PlanO Events Philippines",
    "PlanO events PH",
    "event brief generator Philippines",
    "supplier matching Manila",
    "event coordinator software Philippines",
    "AI event planning",
    "Philippines event coordinator",
    "wedding coordinator app",
    "Taglish event planning",
    "Filipino event coordinator",
    "not Plano Texas events",
    "plano events",
    "PlanO Events"
  ],
  authors: [{ name: "PlanO Events Philippines" }],
  creator: "PlanO",
  publisher: "PlanO",
  alternates: {
    languages: {
      "en-PH": "https://planoevents.site",
    },
  },
  openGraph: {
    title: "PlanO — AI Event Briefs & Supplier Matching | Philippines",
    description:
      "Turn messy client chats into professional event briefs and match with the right suppliers. Built for Filipino event coordinators.",
    url: "https://planoevents.site",
    siteName: "PlanO",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PlanO — AI-Powered Event Planning for Filipino Coordinators",
        type: "image/png",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlanO — AI Event Briefs & Supplier Matching | Philippines",
    description:
      "Turn messy client chats into professional event briefs. Built for Filipino coordinators.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "4-q1UWk1-roZtgNQWxu-aMKS0ajxNneMz9Q0V6cOMEs",
  },
};

/* ── JSON-LD Structured Data ── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://planoevents.site/#organization",
      name: "PlanO",
      url: "https://planoevents.site",
      logo: {
        "@type": "ImageObject",
        url: "https://planoevents.site/plano-bk.svg",
      },
      description:
        "AI-powered event coordination platform that converts client messages into structured event briefs and matches Filipino coordinators with the right suppliers.",
      foundingDate: "2026",
      areaServed: [
        { "@type": "Country", name: "Philippines" },
        { "@type": "City", name: "Lipa" },
        { "@type": "City", name: "Batangas" }
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@planoevents.site",
        contactType: "customer support",
      },
      sameAs: [
        "https://www.instagram.com/planoevents/",
        "https://www.facebook.com/planoevents.ph",
        "https://www.linkedin.com/company/planoevents"
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://planoevents.site/#website",
      name: "PlanO Events Philippines",
      url: "https://planoevents.site",
      publisher: { "@id": "https://planoevents.site/#organization" },
      description:
        "AI-powered event coordination platform for Filipino event planners and coordinators. (Serving the Philippines, not Plano Texas).",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://planoevents.site/#app",
      name: "PlanO",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI-powered event coordination platform that converts messy client chats into structured event briefs and matches coordinators with the right suppliers based on budget, location, and margin.",
      author: { "@id": "https://planoevents.site/#organization" },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        price: "0",
        priceCurrency: "PHP",
        description: "Join the waitlist for early access",
      },
      featureList: [
        "AI event brief extraction from Taglish messages",
        "Private supplier database and matching",
        "Margin-optimized supplier recommendations",
        "Missing information detection and follow-up question generation",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://planoevents.site/#webpage",
      url: "https://planoevents.site",
      name: "PlanO | AI Event Brief Generator & Supplier Matching — Philippines",
      isPartOf: { "@id": "https://planoevents.site/#website" },
      about: { "@id": "https://planoevents.site/#app" },
      description:
        "PlanO turns messy client chats into professional event briefs and finds the right suppliers for your budget, instantly. Built for event coordinators in the Philippines.",
    },
    {
      "@type": "FAQPage",
      "@id": "https://planoevents.site/#faq",
      isPartOf: { "@id": "https://planoevents.site/#webpage" },
      mainEntity: [
        {
          "@type": "Question",
          name: "What is PlanO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PlanO is an AI-powered event planning tool built for Filipino event coordinators. It converts messy client messages — including Taglish — into structured event briefs in seconds and matches coordinators with the right suppliers based on budget, location, and margin preferences.",
          },
        },
        {
          "@type": "Question",
          name: "How does PlanO create event briefs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PlanO uses AI to read client messages from Messenger, Viber, or SMS, including Taglish text. It automatically extracts event details like event type, date, guest count, budget, and venue into a structured brief. It also flags missing information and suggests follow-up questions.",
          },
        },
        {
          "@type": "Question",
          name: "How does supplier matching work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PlanO matches coordinators with suppliers from their private database, filtered by distance from the venue and price within the client budget. It optimizes for your profit margin, not just the cheapest option. Your supplier list is private and never shared with other coordinators.",
          },
        },
        {
          "@type": "Question",
          name: "How do I get access to PlanO?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PlanO is currently rolling out access to waitlist members. Sign up at planoevents.site and we'll notify you when your spot is ready.",
          },
        },
        {
          "@type": "Question",
          name: "Who is PlanO for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PlanO is built specifically for freelance and independent event coordinators in the Philippines — wedding coordinators, corporate event planners, and debut organizers who manage client inquiries across multiple messaging platforms.",
          },
        },
        {
          "@type": "Question",
          name: "Does PlanO understand Taglish?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. PlanO's AI is designed to understand Taglish (Tagalog-English mixed language), including informal chat-style messages with abbreviations, typos, and colloquial expressions commonly used in Filipino Messenger and Viber conversations.",
          },
        },
        {
          "@type": "Question",
          name: "Is my supplier list private?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Your supplier database in PlanO is private and encrypted. No other coordinator can see your supplier list, pricing, or margin settings. PlanO is not a marketplace — it's your personal coordination tool.",
          },
        },
        {
          "@type": "Question",
          name: "When will PlanO launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PlanO is currently rolling out access in waves to waitlist members. Join the waitlist at planoevents.site to be notified when your spot is ready.",
          },
        }
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://planoevents.site",
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": "https://planoevents.site/#howto",
      name: "How to create an event brief with PlanO",
      description:
        "Three steps to go from a raw client inquiry to a ready-to-send supplier quote using PlanO.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Paste or upload the inquiry",
          text: "Copy a client message from Messenger, Viber, or SMS, or upload a screenshot. PlanO accepts Taglish messages.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Review the AI-extracted brief",
          text: "PlanO extracts event details like date, guest count, budget, and venue. Review the fields and flag any corrections.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Generate a matched supplier quote",
          text: "PlanO matches suppliers from your private database filtered by distance and budget, optimized for your margin.",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-PH"
      className={`${inter.variable} ${fraunces.variable} ${dmMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
