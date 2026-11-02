"use client";

import { useState, useRef, useCallback } from "react";
import { Loader2, CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from "lucide-react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const ROLE_OPTIONS = [
  "A coordinator or supplier with a PlanO account",
  "A supplier without an account",
  "A client or guest of a coordinator",
  "Joined the waitlist only",
] as const;

export default function DataDeletionForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string>(ROLE_OPTIONS[0]);
  const [businessName, setBusinessName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [devConfirmUrl, setDevConfirmUrl] = useState<string | null>(null);

  const turnstileRef = useRef<TurnstileInstance>(null);

  const isSupplierRole =
    role === "A supplier without an account" ||
    role === "A coordinator or supplier with a PlanO account";

  const resetTurnstile = useCallback(() => {
    if (turnstileRef.current) {
      turnstileRef.current.reset();
    }
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage("Email address is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (isSupplierRole && role === "A supplier without an account" && !businessName.trim()) {
      setErrorMessage("Business name is required for suppliers.");
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrorMessage("Please complete the bot verification.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/deletion-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmedEmail,
          role,
          businessName: isSupplierRole ? businessName.trim() : undefined,
          message: message.trim() || undefined,
          turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Failed to submit request. Please try again.");
        resetTurnstile();
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
      if (data.devConfirmUrl) {
        setDevConfirmUrl(data.devConfirmUrl);
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setRole(ROLE_OPTIONS[0]);
    setBusinessName("");
    setMessage("");
    setIsSubmitted(false);
    setErrorMessage("");
    setDevConfirmUrl(null);
    resetTurnstile();
  };

  if (isSubmitted) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
        <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-4">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-normal text-ink mb-3">
          Confirmation link sent
        </h3>
        {/* Exact message mandated by Step 2 */}
        <p className="font-sans text-base text-ink leading-relaxed mb-6 font-medium">
          If we have a record for this email, we&rsquo;ve sent a confirmation link. It works for 7 days.
        </p>
        <p className="font-sans text-xs text-ink-secondary leading-relaxed mb-6">
          The email contains a link that opens a page explaining what will be deleted and prompts you to confirm. For your security and privacy, data is only deleted after you press the button on that page.
        </p>

        {devConfirmUrl && (
          <div className="mb-6 p-4 rounded-xl bg-primary-light/50 border border-primary/20 text-xs font-mono break-all">
            <span className="text-primary font-bold block mb-1">Local / Dev Quick Link:</span>
            <a href={devConfirmUrl} className="text-primary underline">
              {devConfirmUrl}
            </a>
          </div>
        )}

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          <RefreshCw size={13} />
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
      <div className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="del-email" className="block font-sans text-sm font-semibold text-ink mb-1.5">
            Your email address <span className="text-primary font-normal">(Required)</span>
          </label>
          <input
            id="del-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-ink placeholder:text-ink-tertiary font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
          />
        </div>

        {/* Role Dropdown */}
        <div>
          <label htmlFor="del-role" className="block font-sans text-sm font-semibold text-ink mb-1.5">
            I am… <span className="text-primary font-normal">(Required)</span>
          </label>
          <select
            id="del-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-ink font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
          >
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Business Name Field (Conditional for suppliers) */}
        {isSupplierRole && (
          <div className="transition-all duration-200">
            <label htmlFor="del-business-name" className="block font-sans text-sm font-semibold text-ink mb-1.5">
              Business name{" "}
              {role === "A supplier without an account" ? (
                <span className="text-primary font-normal">(Required for suppliers)</span>
              ) : (
                <span className="text-ink-tertiary font-normal">(Required only for suppliers)</span>
              )}
            </label>
            <input
              id="del-business-name"
              type="text"
              required={role === "A supplier without an account"}
              placeholder="Your registered business or brand name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-ink placeholder:text-ink-tertiary font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50"
            />
          </div>
        )}

        {/* Optional message */}
        <div>
          <label htmlFor="del-message" className="block font-sans text-sm font-semibold text-ink mb-1.5">
            Anything else we should know? <span className="text-ink-tertiary font-normal">(Optional)</span>
          </label>
          <textarea
            id="del-message"
            rows={3}
            placeholder="Additional context or specific details about your request"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-ink placeholder:text-ink-tertiary font-sans text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all disabled:opacity-50 resize-y"
          />
        </div>

        {TURNSTILE_SITE_KEY && (
          <div className="flex justify-center pt-1">
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={(token) => setTurnstileToken(token)}
              onError={() => setTurnstileToken(null)}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: "light", size: "flexible" }}
              ref={turnstileRef}
            />
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-light/60 border border-secondary/30 text-ink font-sans text-xs sm:text-sm">
            <AlertCircle size={15} className="text-secondary shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="w-full sm:w-auto bg-primary text-surface font-sans text-sm font-semibold px-6 py-3 rounded-xl hover:bg-primary-dark active:scale-[0.99] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xs"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending request…
            </>
          ) : (
            <>
              Send request
              <ArrowRight size={14} />
            </>
          )}
        </button>

        <p className="font-sans text-xs text-ink-tertiary leading-relaxed pt-3 border-t border-border/60 italic">
          What happens next: we email the address above and ask you to reply to confirm the request is yours. We delete nothing until you reply. For your privacy, we show the same message whether or not we have a record for that email address.
        </p>
      </div>
    </form>
  );
}
