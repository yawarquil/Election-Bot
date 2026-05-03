import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/google-cloud/analytics";

/**
 * Injects the Google Analytics (GA4) snippet only when a measurement id
 * is configured via `NEXT_PUBLIC_GA_MEASUREMENT_ID`. In all other cases
 * this component renders nothing, so local and self-hosted deployments
 * ship with zero tracking.
 */
export function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            send_page_view: true
          });
        `}
      </Script>
    </>
  );
}
