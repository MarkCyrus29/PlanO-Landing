"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Search, Loader2, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const STEPS = ["Received", "Confirmed", "Deleting", "Completed"] as const;

export default function StatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const codeParam = searchParams.get("code");

  const [inputCode, setInputCode] = useState(codeParam || "");
  const [loading, setLoading] = useState(Boolean(codeParam));
  const [statusData, setStatusData] = useState<{
    step: string;
    lastChanged: string;
    code: string;
  } | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  const fetchStatus = async (codeToFetch: string) => {
    if (!codeToFetch.trim()) return;
    setLoading(true);
    setNotFound(false);
    setError("");

    try {
      const res = await fetch(`/api/deletion-status?code=${encodeURIComponent(codeToFetch.trim())}`);
      const data = await res.json();

      if (res.status === 404 || data.error === "We couldn't find that code.") {
        setNotFound(true);
        setStatusData(null);
      } else if (!res.ok) {
        setError(data.error || "Failed to load status.");
        setStatusData(null);
      } else {
        setStatusData(data);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [prevCodeParam, setPrevCodeParam] = useState(codeParam);
  if (codeParam !== prevCodeParam) {
    setPrevCodeParam(codeParam);
    setInputCode(codeParam || "");
  }

  useEffect(() => {
    if (codeParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchStatus(codeParam);
    }
  }, [codeParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputCode.trim().toUpperCase();
    if (!trimmed) return;
    router.push(`/data-deletion/status?code=${encodeURIComponent(trimmed)}`);
    fetchStatus(trimmed);
  };

  return (
    <div className="space-y-8">
      {/* Back link */}
      <div>
        <Link
          href="/data-deletion"
          className="inline-flex items-center gap-1.5 font-sans text-xs text-ink-tertiary hover:text-primary transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Data Deletion
        </Link>
      </div>

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-ink font-light tracking-tight mb-2">
          Request Status
        </h1>
        <p className="font-sans text-sm sm:text-base text-ink-secondary">
          Track the real-time progress of your data deletion request.
        </p>
      </div>

      {/* Search Input */}
      <form onSubmit={handleSearch} className="bg-surface rounded-2xl border border-border p-5 shadow-2xs">
        <label htmlFor="search-code-field" className="block font-sans text-xs font-semibold text-ink-tertiary uppercase tracking-wider mb-2">
          Confirmation Code
        </label>
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-tertiary">
              <Search size={15} />
            </div>
            <input
              id="search-code-field"
              type="text"
              placeholder="e.g. PLN-XXXX or META-TEST-2026"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border text-ink placeholder:text-ink-tertiary font-mono text-sm tracking-wider uppercase focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !inputCode.trim()}
            className="bg-primary text-surface font-sans text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 shadow-xs shrink-0"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : "Check status"}
          </button>
        </div>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="p-12 text-center space-y-3">
          <Loader2 size={24} className="animate-spin text-primary mx-auto" />
          <p className="font-sans text-xs text-ink-secondary">Looking up confirmation code…</p>
        </div>
      )}

      {/* Not Found */}
      {!loading && notFound && (
        <div className="bg-surface rounded-2xl border border-border p-8 shadow-xs text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-light flex items-center justify-center text-secondary mx-auto">
            <AlertCircle size={24} />
          </div>
          <h2 className="font-display text-xl text-ink font-normal">
            We couldn&rsquo;t find that code.
          </h2>
          <p className="font-sans text-sm text-ink-secondary max-w-md mx-auto">
            Please double-check the confirmation code and try again, or check the confirmation email sent to you.
          </p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="p-4 rounded-xl bg-amber-light/60 border border-secondary/30 text-ink font-sans text-sm flex items-center gap-2.5">
          <AlertCircle size={16} className="text-secondary shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Status Details */}
      {!loading && statusData && (
        <div className="bg-surface rounded-2xl border border-border p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
            <div>
              <span className="font-sans text-xs text-ink-tertiary uppercase tracking-wider block">
                Request Code
              </span>
              <p className="font-mono text-xl sm:text-2xl font-bold text-primary tracking-wider mt-1">
                {statusData.code}
              </p>
            </div>
            <div className="sm:text-right">
              <span className="font-sans text-xs text-ink-tertiary uppercase tracking-wider block">
                Date of Last Change
              </span>
              <p className="font-sans text-sm font-semibold text-ink mt-1 flex items-center sm:justify-end gap-1.5">
                <Clock size={14} className="text-primary" />
                {statusData.lastChanged}
              </p>
            </div>
          </div>

          {/* Stepper Display */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-normal text-ink">
              Current Progress
            </h2>

            {/* Desktop / Horizontal Stepper */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 relative pt-2">
              {STEPS.map((step, idx) => {
                const currentIdx = STEPS.indexOf(statusData.step as (typeof STEPS)[number]);
                const isPassed = currentIdx >= idx;
                const isCurrent = currentIdx === idx;

                return (
                  <div key={step} className="flex flex-col items-center text-center">
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-sans text-xs sm:text-sm font-bold transition-all mb-2 ${
                        isCurrent
                          ? "bg-primary text-surface ring-4 ring-primary-light shadow-xs"
                          : isPassed
                          ? "bg-primary/20 text-primary"
                          : "bg-surface border border-border text-ink-tertiary"
                      }`}
                    >
                      {isPassed ? <CheckCircle2 size={18} /> : idx + 1}
                    </div>
                    <span
                      className={`font-sans text-xs sm:text-sm ${
                        isCurrent
                          ? "font-bold text-ink"
                          : isPassed
                          ? "font-medium text-ink-secondary"
                          : "text-ink-tertiary"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Plain Words Representation */}
            <div className="mt-6 p-4 rounded-xl bg-background border border-border text-center font-sans text-sm text-ink-secondary">
              <span className="font-semibold text-ink">Status Path: </span>
              {STEPS.map((s, i) => (
                <span key={s}>
                  <span
                    className={
                      s === statusData.step
                        ? "text-primary font-bold underline decoration-primary underline-offset-4"
                        : "text-ink-tertiary"
                    }
                  >
                    {s}
                  </span>
                  {i < STEPS.length - 1 && <span className="mx-2 text-ink-tertiary">→</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="pt-4 border-t border-border/80">
            <p className="font-sans text-xs text-ink-tertiary leading-relaxed">
              *Notice: For privacy and security, this page displays only the current step and the date of the last change. No names, email addresses, or account details are ever displayed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
