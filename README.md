# Redirects • [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/maacpiash/redirects/deploy.yaml?style=flat-square&logo=github&label=deploy)](https://github.com/maacpiash/redirects/actions/workflows/deploy.yaml) [![Deployed on Cloudflare Workers](https://img.shields.io/badge/platform-Workers-F38020?style=flat-square&logo=cloudflare)](https://pia.sh) ![Status: in progress](https://img.shields.io/badge/status-in%20progress-green?logo=git&style=flat-square) ![PRs welcome](https://img.shields.io/badge/PRs-Welcome-3DA639?style=flat-square&logo=opensourceinitiative)

Redirect from a shortened URL to the actual destination URL.

## Features

- [x] Redirect URL by KV look up
- [x] Add or update URLs via basic/JWT auth

## Architecture

The application runs entirely on Cloudflare. It achieves global availability via Cloudflare Workers and KV, the distributed key-value data storage, both running on the edge.

## Run locally

First, create a KV namespace for production and another one for local development:

```bash
npx wrangler kv:namespace create KV_NS # prod, use with `id`
npx wrangler kv:namespace create KV_NS-dev --preview # dev, use with `preview_id`
```

Then, copy the values from the terminal and paste them in the `kv_namespaces` section in `wrangler.toml` file. Finally, run `bun run dev:cf`.

For user auth, set the `AUTH_USERNAME` AND `AUTH_PASSWORD` with the following commands:

```bash
npx wrangler secret put AUTH_USERNAME
npx wrangler secret put AUTH_PASSWORD
```

## Deploy

If you have a Cloudflare account, you can deploy by running `bun run deploy`.
