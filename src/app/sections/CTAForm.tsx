"use client";

import { useState, useRef, useCallback } from "react";
import { Lock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type FormState = "idle" | "submitting" | "success" | "error";

export function CTAForm() {
  const [email, setEmail] = useState("");
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

  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!trimmed) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setFormState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setFormState("error");
      setErrorMessage("Please complete the verification.");
      return;
    }

    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          turnstileToken: turnstileToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormState("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
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

  const isSubmitting = formState === "submitting";

  if (formState === "success") {
    return (
      <div className="bg-surface/10 border border-surface/20 rounded-xl p-6 max-w-md mx-auto mb-6 transform transition-all duration-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle2 size={20} className="text-surface" />
          <p className="font-sans text-base text-surface font-medium">
            You&rsquo;re on the list!
          </p>
        </div>
        <p className="font-sans text-sm text-surface/70">
          We&rsquo;ll reach out when your spot is ready.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-4">
        <input
          id="cta-email-input"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (formState === "error") {
              setFormState("idle");
              setErrorMessage("");
            }
          }}
          onKeyDown={(e) => e.key === "Enter" && !isSubmitting && handleSubmit()}
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-lg bg-surface/10 border border-surface/20 text-surface placeholder:text-surface/50 font-sans text-sm focus:outline-none focus:border-surface transition-colors disabled:opacity-50"
          aria-label="Email address"
        />
        <button
          id="cta-submit-button"
          onClick={handleSubmit}
          disabled={isSubmitting || !email.trim()}
          className="w-full sm:w-auto whitespace-nowrap bg-surface text-primary font-sans text-sm font-semibold px-6 py-3 rounded-lg hover:bg-primary-light transition-colors duration-180 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Joining…
            </>
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </div>

      {TURNSTILE_SITE_KEY && (
        <div className="flex justify-center mb-4">
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
        <div className="flex items-center justify-center gap-2 text-amber-light font-sans text-sm mb-4 transition-opacity duration-300">
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}
    </>
  );
}
