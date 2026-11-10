# Prepared CyberGRC routing - not a live cutover

Keep the landing website at `https://www.novrgrc.com/` on Vercel. Its marketing
routes, including `/platform`, `/framework`, `/solutions`, `/security`, `/about`,
`/contact` and `/demo`, remain landing routes.

The prepared `vercel.cybergrc.json` proxies only the application routes and its
API, private uploads and separately named `cybergrc-assets` to the dedicated
Contabo origin. `/platform/subscriptions` is an app route; `/platform` is not.
Do not replace `vercel.json` or publish this configuration until the origin's
DNS, certificate, database, health and browser acceptance are verified.

Required new DNS record: `cybergrc-origin.novrgrc.com` to `173.212.234.101`.
Do not change existing www, apex, NCC or email DNS records for this route.

External rewrites preserve the public URL:
https://vercel.com/docs/routing/rewrites

The origin must return private, no-store for authentication, API responses
and private files. Verify cookie/CSRF propagation and maximum-size uploads
through Vercel before release; local builds are not that evidence.

Use ordinary full-navigation anchors for /sign-in, not the landing SPA's
React Router links. Application and marketing routes are separate SPAs.
