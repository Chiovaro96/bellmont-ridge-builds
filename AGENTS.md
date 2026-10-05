<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Serve the Bellmont Ridge logo from `public/bellmont-ridge-logo.png` (referenced as `/bellmont-ridge-logo.png`) — the CDN asset URL 404s on the user's custom domain, so branding must be self-hosted.
- Send estimate-form submissions by email through Resend from a validated server function using the runtime `RESEND_API_KEY` secret, with no database dependency — the site is hosted on an external Cloudflare Worker without backend credentials.
