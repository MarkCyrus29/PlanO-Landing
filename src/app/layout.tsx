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
  title: "PlanO — AI Event Briefs & Supplier Matching for Coordinators",
  description:
    "PlanO turns messy client chats into professional event briefs and finds the right suppliers for your budget, instantly. Built for event coordinators in the Philippines.",
  keywords: [
    "PlanO",
    "event brief generator",
    "supplier matching",
    "event coordinator software",
    "AI event planning",
    "Philippines event coordinator",
    "wedding coordinator app",
    "Taglish event planning",
    "event planning tool",
    "Filipino event coordinator",
  ],
  authors: [{ name: "PlanO" }],
  creator: "PlanO",
  publisher: "PlanO",
  alternates: {
    canonical: "https://planoevents.site",
  },
  openGraph: {
    title: "PlanO — AI Event Briefs & Supplier Matching",
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
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlanO — AI Event Briefs & Supplier Matching",
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
};

/* ── JSON-LD Structured Data ── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PlanO",
  url: "https://planoevents.site",
  logo: "https://planoevents.site/plano-bk.svg",
  description:
    "AI-powered event brief generator and supplier matching platform for Filipino event coordinators.",
  foundingDate: "2026",
  areaServed: {
    "@type": "Country",
    name: "Philippines",
  },
  sameAs: [],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PlanO",
  url: "https://planoevents.site",
  description:
    "AI-powered event brief generator and supplier matching for Filipino event coordinators.",
};

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PlanO",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered event coordination platform that converts messy client chats into structured event briefs and matches coordinators with the right suppliers based on budget, location, and margin.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    description: "Join the waitlist for early access",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
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
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${dmMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareAppSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
