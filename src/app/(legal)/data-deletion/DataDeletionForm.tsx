"use client";

import { useState, useRef, useCallback } from "react";
import { Loader2, CheckCircle2, AlertCircle, ShieldAlert, ArrowRight, RefreshCw } from "lucide-react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type FormState = "idle" | "submitting" | "success" | "error";

export default function DataDeletionForm() {
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const resetTurnstile = useCallback(() => {
    if (turnstileRef.current) {
      turnstileRef.current.reset();
    }
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setFormState("error");
      setErrorMessage("Please provide your account email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setFormState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setFormState("error");
      setErrorMessage("Please complete the bot verification.");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/data-deletion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          notes: notes.trim(),
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormState("error");
        setErrorMessage(data.error || "Failed to submit request. Please try again.");
        resetTurnstile();
        return;
      }

      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMessage("Network error. Please check your connection and try again.");
      resetTurnstile();
    }
  };

  const handleReset = () => {
    setEmail("");
    setNotes("");
    setFormState("idle");
    setErrorMessage("");
    resetTurnstile();
  };

  const isSubmitting = formState === "submitting";

  if (formState === "success") {
    return (
      <div className="bg-surface rounded-2xl border border-border p-8 shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-5">
          <CheckCircle2 size={24} />
        </div>
        <h2 className="font-display text-2xl font-light text-ink mb-2">
          Request Received
        </h2>
        <p className="font-sans text-sm text-ink-secondary leading-relaxed mb-6">
          We have registered your deletion request for <strong className="text-ink font-semibold">{email}</strong> and dispatched a notification to our compliance team.
        </p>

        <div className="bg-amber-light/40 border border-secondary/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <ShieldAlert size={18} className="text-secondary mt-0.5 shrink-0" />
            <div className="font-sans text-xs sm:text-sm text-ink space-y-1">
              <p className="font-semibold text-ink">Action Required to Complete Deletion:</p>
              <p className="text-ink-secondary">
                To prevent fraudulent deletion, we have sent a confirmation email to <strong>{email}</strong>. 
                Please reply to that message to verify your identity. We will not wipe your data until you reply to confirm ownership.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-2 font-sans text-xs font-medium text-primary hover:text-primary-dark transition-colors"
        >
          <RefreshCw size={13} />
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="account-email"
            className="block font-sans text-sm font-medium text-ink mb-1.5"
          >
            Account Email Address <span className="text-primary font-normal">(Required)</span>
          </label>
          <input
            id="account-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="coordinator@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (formState === "error") {
                setFormState("idle");
                setErrorMessage("");
              }
            }}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-ink placeholder:text-ink-tertiary font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
          />
          <p className="font-sans text-xs text-ink-tertiary mt-1.5">
            The email address associated with your PlanO account or waitlist entry.
          </p>
        </div>

        <div>
          <label
            htmlFor="additional-notes"
            className="block font-sans text-sm font-medium text-ink mb-1.5"
          >
            Anything else we should know? <span className="text-ink-tertiary font-normal">(Optional)</span>
          </label>
          <textarea
            id="additional-notes"
            name="notes"
            rows={4}
            placeholder="e.g., Please disconnect connected Facebook/Instagram page, delete pending registration, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-3 rounded-xl bg-background border border-border text-ink placeholder:text-ink-tertiary font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 resize-y"
          />
        </div>

        {TURNSTILE_SITE_KEY && (
          <div className="flex justify-center pt-1">
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken(null)}
              onExpire={() => setTurnstileToken(null)}
              options={{
                theme: "light",
                size: "flexible",
              }}
              ref={turnstileRef}
            />
          </div>
        )}

        {formState === "error" && errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-light/60 border border-secondary/30 text-ink font-sans text-sm">
            <AlertCircle size={16} className="text-secondary shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="w-full bg-primary text-surface font-sans text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-primary-dark active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Processing Request…
            </>
          ) : (
            <>
              Request Data Deletion
              <ArrowRight size={15} />
            </>
          )}
        </button>

        <div className="pt-2 border-t border-border/60">
          <p className="font-sans text-xs text-ink-secondary leading-relaxed italic">
            *Security Notice: To ensure you are the actual owner of this account, we will send a confirmation link to the email address provided above. We will not wipe your data until you reply to confirm ownership. Once confirmed, your data will be permanently deleted within 30 days.
          </p>
        </div>
      </div>
    </form>
  );
}
