# Redirects

Redirect from a shortened URL to the actual destination URL.

## Features

- [x] Redirect URL by KV look up
- [ ] Add or update URLs via basic/JWT auth

## Architecture

The application runs entirely on Cloudflare. It achieves global availability via Cloudflare Workers and KV, the distributed key-value data storage, both running on the edge.

## Run locally

First, create a KV namespace for production and another one for local development:

```bash
npx wrangler kv:namespace create KV_NS # prod, use with `id`
npx wrangler kv:namespace create KV_NS-dev --preview # dev, use with `preview_id`
```

Then, copy the values from the terminal and paste them in the `kv_namespaces` section in `wrangler.toml` file. Finally, run `bun run dev:cf`.

## Deploy

If you have a Cloudflare account, you can deploy by running `bun run deploy`.
