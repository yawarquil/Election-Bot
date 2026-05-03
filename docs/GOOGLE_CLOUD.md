# Google Cloud Integration

The Election Guide Assistant is designed to run natively on Google Cloud. This
document describes how each Google Cloud service is used, where the
configuration lives in this repository, and how to operate the service.

## Services in use

| Service                  | Purpose                                      | Where it is configured                                |
| ------------------------ | -------------------------------------------- | ----------------------------------------------------- |
| **Cloud Run**            | Stateless HTTP runtime for the Next.js app  | `deploy/cloud-run-service.yaml`, GitHub Actions      |
| **Artifact Registry**    | Container image storage (Docker)             | `.github/workflows/deploy-cloud-run.yml`              |
| **Cloud Build**          | CI pipeline alternative to GitHub Actions    | `cloudbuild.yaml`                                     |
| **Cloud Logging**        | Structured application logs                  | `lib/google-cloud/logger.ts`                          |
| **Cloud Monitoring**     | Uptime and latency on `/api/health`          | Configured via Cloud Run health probes                |
| **Workload Identity Federation** | Keyless auth from GitHub Actions    | `google-github-actions/auth` step in the workflow     |
| **Google Analytics (GA4)** | Opt-in privacy-first usage analytics       | `lib/google-cloud/analytics.ts`, `components/shell/Analytics.tsx` |
| **Google Fonts**         | Typography (Inter, Instrument Serif, JetBrains Mono) | `app/layout.tsx`                              |

## Deployment targets

- **Project**: `election-495213`
- **Region**: `asia-south1`
- **Cloud Run service**: `election-guide-assistant`
- **Artifact Registry repository**: `election-guide-assistant`

## Deploy via GitHub Actions (recommended)

Pushes to `main` or `master` trigger
`.github/workflows/deploy-cloud-run.yml` which:

1. Installs dependencies with `npm ci`
2. Runs unit tests (`npm test`)
3. Builds the production Next.js bundle (`npm run build`)
4. Authenticates to Google Cloud via **Workload Identity Federation**
5. Ensures the Artifact Registry repository exists
6. Builds and pushes the container image to Artifact Registry
7. Deploys the revision to Cloud Run with `--allow-unauthenticated`

Required GitHub repository secrets:

- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT` (e.g. `github-cloud-run-deployer@election-495213.iam.gserviceaccount.com`)

## Deploy via Cloud Build

`cloudbuild.yaml` provides an equivalent pipeline that runs entirely inside
Google Cloud. Trigger it with:

```bash
gcloud builds submit --config cloudbuild.yaml \
  --substitutions=_REGION=asia-south1,_SERVICE=election-guide-assistant
```

## Declarative Cloud Run service

`deploy/cloud-run-service.yaml` is a `serving.knative.dev/v1` resource that
fully describes the Cloud Run runtime (scaling, CPU, memory, env vars,
startup and liveness probes). Apply it with:

```bash
gcloud run services replace deploy/cloud-run-service.yaml \
  --region=asia-south1 --project=election-495213
```

## Health and observability

The service exposes a deterministic health endpoint at `GET /api/health`
that returns `service`, `revision`, `region`, `project`, `requestId`, and
`timestamp`. Cloud Run uses this for startup and liveness probes as
defined in `deploy/cloud-run-service.yaml`.

Every request to this endpoint emits a structured **Cloud Logging**
entry via `lib/google-cloud/logger.ts`. Entries follow the official
[structured logging schema](https://cloud.google.com/logging/docs/structured-logging),
including severity, trace correlation
(`logging.googleapis.com/trace`), and label fields for fast filtering
in the Cloud Logging Explorer.

## Analytics (GA4)

`lib/google-cloud/analytics.ts` provides a thin wrapper over `gtag` and
`components/shell/Analytics.tsx` injects the snippet only when
`NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. Local development and
self-hosted forks ship with zero tracking, and the integration
defaults to privacy-safe consent flags (ad storage denied by default).

## Local development

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`. To mimic Cloud Run locally:

```bash
docker build -t election-guide-assistant .
docker run -p 8080:8080 election-guide-assistant
```
