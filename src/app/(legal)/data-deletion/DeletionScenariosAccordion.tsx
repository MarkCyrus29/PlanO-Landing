"use client";

import Link from "next/link";
import { Shield, Calendar, UserCheck, HelpCircle } from "lucide-react";
import Accordion from "@/components/ui/Accordion";

const META_ICON = (
  <svg className="w-[18px] h-[18px] text-primary fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const items = [
  {
    icon: <UserCheck size={18} />,
    title: "I have a PlanO account",
    content: (
      <>
        <p className="font-sans text-sm text-ink-secondary leading-relaxed">
          The fastest way is inside the app: go to your account settings, choose <strong>Delete account</strong>, and enter your password (or a one-time code). We then email you, and we delete nothing until you reply to confirm.
        </p>
        <p className="font-sans text-xs text-ink-tertiary">
          If you can&rsquo;t log in, use the form below.
        </p>
      </>
    ),
  },
  {
    icon: META_ICON,
    title: "I connected a Meta (Facebook/Instagram) account",
    content: (
      <>
        <ul className="space-y-2 font-sans text-sm text-ink-secondary list-disc pl-5">
          <li>
            <strong>In PlanO:</strong> go to Settings → Integrations → Meta and choose <strong>Disconnect</strong>. This ends our access to your Meta account. It does not delete what we already hold. To ask us to delete the messages and media we imported, use the form below.
          </li>
          <li>
            <strong>From Facebook:</strong> removing PlanO from your Facebook connected apps ends our access, but it does not by itself delete what we already hold. To ask us to delete it, use the form below.
          </li>
        </ul>
        <p className="font-sans text-xs text-ink-tertiary">
          Briefs and inquiries you created in PlanO from those messages are your own records. They stay until you delete them or delete your account.
        </p>
      </>
    ),
  },
  {
    icon: <Calendar size={18} />,
    title: "I connected Google Calendar",
    content: (
      <p className="font-sans text-sm text-ink-secondary leading-relaxed">
        Go to Settings → Integrations → Google Calendar and choose <strong>Disconnect</strong>. This revokes PlanO&rsquo;s access and immediately deletes the Google-sourced data we hold. You can also remove PlanO&rsquo;s access in your Google Account under Security → Third-party access. Events PlanO already created on your calendar stay there.
      </p>
    ),
  },
  {
    icon: <Shield size={18} />,
    title: "I\u2019m a supplier (with or without a PlanO account)",
    content: (
      <p className="font-sans text-sm text-ink-secondary leading-relaxed">
        You don&rsquo;t need an account. Use the form below and choose &ldquo;I&rsquo;m a supplier,&rdquo; or write to{" "}
        <a href="mailto:suppliers@planoevents.site" className="text-primary hover:underline">
          suppliers@planoevents.site
        </a>
        . After we verify the request is yours, we stop contacting you, delete your shared profile within 30 days, and ask coordinators who hold private notes about you to remove your personal details. Read the full explanation in the{" "}
        <Link href="/supplier-data-notice" className="text-primary hover:underline font-medium">
          Supplier Data Notice
        </Link>
        .
      </p>
    ),
  },
  {
    icon: <HelpCircle size={18} />,
    title: "I\u2019m a client or guest of a coordinator",
    content: (
      <p className="font-sans text-sm text-ink-secondary leading-relaxed">
        Use the form below and choose &ldquo;I&rsquo;m a client or guest.&rdquo; The coordinator is responsible for your information, so we pass your request to them and help them act on it.
      </p>
    ),
  },
];

export default function DeletionScenariosAccordion() {
  return <Accordion items={items} allowMultiple />;
}
