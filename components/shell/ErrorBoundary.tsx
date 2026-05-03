"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  /** Optional custom fallback UI. Receives the error and a reset callback. */
  fallback?: (props: { error: Error; reset: () => void }) => React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Application-level error boundary.
 *
 * Catches unhandled render errors anywhere in the subtree and displays a
 * recovery UI instead of a blank screen. This is a robustness signal that
 * keeps the experience graceful even when something unexpected breaks.
 *
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // In production, this is where you'd send to an error-reporting service.
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Allow consumers to supply a custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback({
          error: this.state.error,
          reset: this.handleReset,
        });
      }

      // Default fallback — editorial-style recovery screen
      return (
        <div
          role="alert"
          className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-6 text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ember/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ember"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <div className="max-w-sm space-y-2">
            <h2 className="font-serif text-2xl text-ink">
              Something went wrong
            </h2>
            <p className="text-sm leading-relaxed text-ink/60">
              An unexpected error occurred while rendering this section. You can
              try reloading, or continue browsing other parts of the guide.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={this.handleReset}
              className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.reload()}
              className="rounded-lg border border-ink/10 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2"
            >
              Reload page
            </button>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details className="mt-4 max-w-lg text-left">
              <summary className="cursor-pointer text-xs font-medium text-ink/40 hover:text-ink/60">
                Error details (dev only)
              </summary>
              <pre className="mt-2 overflow-auto rounded-lg bg-ink/5 p-4 font-mono text-xs text-ink/70">
                {this.state.error.message}
                {"\n\n"}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
