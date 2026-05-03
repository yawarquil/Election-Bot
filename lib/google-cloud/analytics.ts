/**
 * Google Analytics (GA4) integration helpers.
 *
 * This module is a thin, dependency-free wrapper around the `gtag` API.
 * Production builds only activate analytics when `NEXT_PUBLIC_GA_MEASUREMENT_ID`
 * is set in the environment, so local development and open-source forks
 * ship with zero tracking by default.
 *
 * @see https://developers.google.com/analytics/devguides/collection/ga4
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const isAnalyticsEnabled = () =>
  Boolean(GA_MEASUREMENT_ID) && typeof window !== "undefined";

type GtagCommand = "config" | "event" | "consent" | "set";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: GtagCommand, ...args: unknown[]) => void;
  }
}

/**
 * Records a GA4 page_view event. Called after client-side route changes.
 */
export function trackPageView(url: string): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/**
 * Records an arbitrary GA4 custom event with optional parameters.
 * Keep event names snake_case per GA4 conventions.
 */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag?.("event", name, params);
}

/**
 * Applies a privacy-first default consent state. Storage is denied until
 * the user opts in, which keeps the site compliant with stricter privacy
 * regimes without additional configuration.
 */
export function initConsentDefaults(): void {
  if (!isAnalyticsEnabled()) return;
  window.gtag?.("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
}
