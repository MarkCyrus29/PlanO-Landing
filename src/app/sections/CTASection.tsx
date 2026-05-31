"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Lock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type FormState = "idle" | "submitting" | "success" | "error";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const ref = useReveal();

  /* ── Load Turnstile widget ── */
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    let active = true; // track whether this effect instance is still mounted

    const renderWidget = () => {
      if (
        !active ||
        !turnstileRef.current ||
        !window.turnstile ||
        widgetIdRef.current
      )
        return;

      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(null),
        "error-callback": () => setTurnstileToken(null),
        theme: "light",
        size: "flexible",
      });
    };

    // If script is already loaded
    if (window.turnstile) {
      renderWidget();
    } else {
      // Only inject the script tag if it hasn't been added yet
      const existing = document.querySelector(
        'script[src*="challenges.cloudflare.com/turnstile"]'
      );
      if (existing) {
        // Script exists but turnstile object not ready yet — wait for it
        existing.addEventListener("load", () => setTimeout(renderWidget, 100));
      } else {
        const script = document.createElement("script");
        script.src =
          "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.onload = () => setTimeout(renderWidget, 100);
        document.head.appendChild(script);
      }
    }

    return () => {
      active = false;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // widget may already be gone — that's fine
        }
        widgetIdRef.current = null;
      }
      // Clear the container so a fresh mount can re-render cleanly
      if (turnstileRef.current) {
        turnstileRef.current.innerHTML = "";
      }
    };
  }, []);

  /* ── Reset turnstile after submission ── */
  const resetTurnstile = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      setTurnstileToken(null);
    }
  }, []);

  /* ── Submit handler ── */
  const handleSubmit = async () => {
    const trimmed = email.trim();
    if (!trimmed) return;

    // Basic client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      setFormState("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Turnstile check (only if configured)
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

  return (
    <section id="cta" className="bg-primary py-24 lg:py-32">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-2xl mx-auto px-6 text-center reveal-stagger"
      >
        <h2 className="reveal-fade-up font-display text-4xl lg:text-5xl font-light text-surface mb-6 leading-snug">
          Be part of the waitlist
          <br />
          for PlanO.
        </h2>

        {formState !== "success" ? (
          <>
            <div className="reveal-fade-up flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-4">
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

            {/* Turnstile widget */}
            {TURNSTILE_SITE_KEY && (
              <div className="reveal-fade-up flex justify-center mb-4">
                <div ref={turnstileRef} />
              </div>
            )}

            {/* Error message */}
            {formState === "error" && errorMessage && (
              <div className="flex items-center justify-center gap-2 text-amber-light font-sans text-sm mb-4 transition-opacity duration-300">
                <AlertCircle size={14} />
                <span>{errorMessage}</span>
              </div>
            )}
          </>
        ) : (
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
        )}

        <div className="reveal-fade-up flex items-center justify-center gap-2 font-sans text-xs text-surface/60">
          <Lock size={12} />
          <span>Your information is private and never shared with suppliers.</span>
        </div>
      </div>
    </section>
  );
}
