# Live CyberGRC routing - 10 November 2026

Keep the landing website at `https://www.novrgrc.com/` on Vercel. Its marketing
routes, including `/platform`, `/framework`, `/solutions`, `/security`, `/about`,
`/contact` and `/demo`, remain landing routes.

The active root `vercel.json` and matching `ops/vercel.cybergrc.json` proxy only the application routes and its
API, private uploads and separately named `cybergrc-assets` to the dedicated
Contabo origin. `/platform/subscriptions` is an app route; `/platform` is not.
The origin's DNS, certificate, independent clean database and health checks were
verified before this configuration was published. Public sign-in/MFA cookie and
CSRF checks passed, followed by owner-authenticated production acceptance.

Configured DNS record: `cybergrc-origin.novrgrc.com` to `173.212.234.101`.
Do not change existing www, apex, NCC or email DNS records for this route.

External rewrites preserve the public URL:
https://vercel.com/docs/routing/rewrites

The origin must return private, no-store for authentication, API responses
and private files. Verify cookie/CSRF propagation and maximum-size uploads
through Vercel before relying on large-file workflows; production upload/download
round trips and size acceptance remain an explicit operational follow-up.
Real-client-IP attribution across the public rewrite also needs a trusted-proxy
design check: do not blindly trust arbitrary incoming forwarding headers.

Use ordinary full-navigation anchors for /sign-in, not the landing SPA's
React Router links. Application and marketing routes are separate SPAs.
