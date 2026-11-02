"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, CheckCircle2, ShieldAlert, Loader2, ArrowRight } from "lucide-react";

export default function ConfirmContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [checking, setChecking] = useState(() => Boolean(token));
  const [isValid, setIsValid] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(() =>
    token ? "" : "This link has expired or was already used. Please submit the form again."
  );

  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }

    let ignore = false;

    // Verify token validity without performing any deletion
    fetch(`/api/deletion-requests/confirm?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        if (ignore) return;
        setChecking(false);
        if (data.valid) {
          setIsValid(true);
        } else {
          setIsValid(false);
          setInvalidMessage(data.error || "This link has expired or was already used. Please submit the form again.");
        }
      })
      .catch(() => {
        if (ignore) return;
        setChecking(false);
        setIsValid(false);
        setInvalidMessage("This link has expired or was already used. Please submit the form again.");
      });

    return () => {
      ignore = true;
    };
  }, [token]);

  const handleConfirm = async () => {
    if (!token) return;
    setConfirming(true);
    setConfirmError("");

    try {
      const res = await fetch("/api/deletion-requests/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setConfirmError(data.error || "This link has expired or was already used. Please submit the form again.");
        setConfirming(false);
        return;
      }

      setConfirmed(true);
      setConfirmationCode(data.code);
    } catch {
      setConfirmError("Network error. Please try again.");
    } finally {
      setConfirming(false);
    }
  };

  if (checking) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-8 text-center space-y-4 shadow-xs">
        <Loader2 size={24} className="animate-spin text-primary mx-auto" />
        <p className="font-sans text-sm text-ink-secondary">
          Verifying your confirmation link…
        </p>
      </div>
    );
  }

  // If confirmed
  if (confirmed && confirmationCode) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-10 shadow-xs space-y-6">
        <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <CheckCircle2 size={26} />
        </div>
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-light text-ink mb-2">
            Deletion Confirmed
          </h1>
          <p className="font-sans text-base text-ink leading-relaxed font-medium">
            Your access has ended. Deletion will be complete within 30 days. We&rsquo;ll email you when it&rsquo;s done.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-primary-light/50 border border-primary/20 space-y-2">
          <span className="font-sans text-xs text-ink-tertiary uppercase tracking-wider block">
            Your Confirmation Code
          </span>
          <p className="font-mono text-xl sm:text-2xl font-bold text-primary tracking-wider">
            {confirmationCode}
          </p>
          <p className="font-sans text-xs text-ink-secondary">
            Keep this code to track the progress of your deletion request at any time.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-4">
          <Link
            href={`/data-deletion/status?code=${encodeURIComponent(confirmationCode)}`}
            className="bg-primary text-surface font-sans text-sm font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            Check status page
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-border font-sans text-sm text-ink-secondary hover:text-ink hover:bg-surface/80 transition-all text-center"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  // If token is invalid or expired
  if (!isValid) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-10 shadow-xs space-y-6">
        <div className="w-12 h-12 rounded-xl bg-amber-light flex items-center justify-center text-secondary">
          <AlertCircle size={26} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-light text-ink mb-2">
            Link Expired or Already Used
          </h1>
          <p className="font-sans text-base text-ink-secondary leading-relaxed">
            {invalidMessage}
          </p>
        </div>
        <div>
          <Link
            href="/data-deletion"
            className="inline-flex items-center gap-2 bg-primary text-surface font-sans text-sm font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-xs"
          >
            <ArrowLeft size={15} />
            Submit a new request
          </Link>
        </div>
      </div>
    );
  }

  // Valid token awaiting user confirmation click
  return (
    <div className="space-y-6">
      <div className="mb-2">
        <Link
          href="/data-deletion"
          className="inline-flex items-center gap-1.5 font-sans text-xs text-ink-tertiary hover:text-primary transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Data Deletion
        </Link>
      </div>

      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-10 shadow-xs space-y-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-light border border-secondary/20 text-ink font-sans text-xs font-medium w-fit">
          <ShieldAlert size={14} className="text-secondary" />
          <span>Step 3 of 5 · Action Required</span>
        </div>

        <div>
          <h1 className="font-display text-2xl sm:text-4xl text-ink font-light tracking-tight mb-3">
            Confirm Data Deletion
          </h1>
          <p className="font-sans text-sm sm:text-base text-ink-secondary leading-relaxed">
            Please review the details below before confirming. Deleting only begins when you press the button.
          </p>
        </div>

        {/* What will happen */}
        <div className="space-y-4 border-t border-border pt-6">
          <h2 className="font-display text-lg font-normal text-ink">
            What will happen:
          </h2>
          <ul className="space-y-3 font-sans text-sm text-ink-secondary list-disc pl-5">
            <li>
              <strong>Access ends now:</strong> Your account will be closed and any connected integrations (Meta, Google) will be disconnected immediately.
            </li>
            <li>
              <strong>Data deleted within 30 days:</strong> All your customer data, inquiries, briefs, messages, and uploaded files will be permanently erased.
            </li>
            <li>
              <strong>What we keep:</strong> Invoices already issued (retained for statutory periods required by Philippine tax law under BIR rules), a minimal suppression record so suppliers who asked to be removed are not re-contacted, and a minimal log of the deletion with no personal details.
            </li>
          </ul>
        </div>

        {confirmError && (
          <div className="p-4 rounded-xl bg-amber-light/60 border border-secondary/30 text-ink font-sans text-sm flex items-start gap-2.5">
            <AlertCircle size={16} className="text-secondary shrink-0 mt-0.5" />
            <span>{confirmError}</span>
          </div>
        )}

        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleConfirm}
            disabled={confirming}
            className="w-full sm:w-auto bg-primary text-surface font-sans text-sm font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-dark active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs"
          >
            {confirming ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Processing Deletion…
              </>
            ) : (
              "Confirm deletion"
            )}
          </button>
          <Link
            href="/data-deletion"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-border text-center font-sans text-sm text-ink-secondary hover:text-ink transition-colors"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
