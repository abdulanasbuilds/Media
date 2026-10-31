# PRESSRA Multi-Page Mirror TODO

## Existing PRESSRA homepage
- [x] Preserve the original homepage visual composition and editorial content while extending the site structure.
- [x] Keep the existing native implementation iframe-free and responsive.

## Multi-page structure
- [x] Add route-aware homepage, latest, category, and article pages using the existing PRESSRA content system.
- [x] Expand `/manus-routes.json` to cover homepage, listings, category pages, article pages, and video routes.
- [x] Keep Pressra navigation links as real page routes instead of hash-only anchors.

## Video page
- [x] Add a native `/video` page based on https://inkvora.framer.website/video without using an iframe or page embed.
- [x] Recreate the Inkvora-style dark header, featured video split layout, play controls, All Videos grid, newsletter, footer, and responsive behavior.
- [x] Add video-detail-like paths under `/video/:slug` that preserve the video page experience.

## Validation and delivery
- [x] Run the production build successfully after the multi-page changes.
- [x] Inspect desktop and mobile renders for both `/` and `/video`.
- [ ] Push the updated multi-page implementation to the managed and GitHub remotes.
