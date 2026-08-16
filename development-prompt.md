# KalaiSuvadu — Static Architecture & Migration Plan

## Context
- **Business:** Wall mural and art studio website.
- **Goal:** $0/month cost, high visual design, zero server dependency, long-term stability.
- **Workflow:** Local Keystatic CMS (writes JSON) -> GitHub Pages (free hosting) -> YouTube/Instagram embeds (free video/posts) -> Cloudinary (free image storage).
- **Future-proofing:** If multi-device online access is needed later, code easily moves to Cloudflare Pages + Keystatic Cloud with no content changes.

---

## Technical Stack
- **Frontend:** Next.js 15 (Static Export / SSG)
- **CMS:** Keystatic (Local Mode, content stored as JSON in repo)
- **Styling:** Tailwind CSS (reusing your existing styling)
- **Media Hosting:**
  - YouTube (for time-lapses and videos)
  - Instagram (for reels, posts, and carousel grid galleries via embeds)
  - Cloudinary (free tier for direct portfolio/profile images)
- **Contact:** Direct WhatsApp, Instagram DM, and Mailto links (no third-party form handler)
- **Deployment:** GitHub Pages (via GitHub Actions)

---

## Migration Steps & Validation Flow

### Phase 1 — Config & Dependency Clean-up
1. Modify `next.config.ts` for static export (`output: 'export'`, `images: { unoptimized: true }`).
2. Clean `package.json` by removing Prisma, NextAuth, bcrypt, and Supabase client dependencies.
3. Install `@keystatic/core` and `@keystatic/next`.
4. Delete `/src/app/api` directory entirely.
5. Delete old `prisma/` folder and server-only configurations.
6. ⛔ **STOP HERE.** Verify project builds locally and old databases/APIs are successfully detached. Ask for validation.

### Phase 2 — Content Schema & Keystatic Configuration
1. Create `keystatic.config.ts` defining:
   - `projects` collection (title, description, category, work type, status: completed/upcoming/in-progress, coverImage, media list with types: image/youtube/instagram/instagram-reel/instagram-gallery, team relationships).
   - `team` collection (name, bio, specialization, profile image, instagram link).
   - `services` collection (name, description, image).
   - `brand` singleton (brand name, tagline, email, instagram, whatsapp).
   *(Note: Keystatic configuration uses plain URL string fields (`fields.text`) for all image properties to support manual copy-paste of Cloudinary/external delivery URLs directly, keeping the codebase free of cloud upload dependencies.)*
2. Create initial JSON data files in `/content` directory using previous seed data.
3. Initialize `src/lib/content.ts` to replace old Prisma database fetches with local JSON file readers.
4. ⛔ **STOP HERE.** Run Keystatic admin panel locally at `localhost:3000/keystatic`. Verify you can read and write JSON files. Ask for validation.

### Phase 3 — Public Page Rework & Embed System
1. **Cloudinary Integration Setup:**
   - **Credentials:** No API credentials or upload presets are configured or committed locally, keeping the setup $0/month and serverless.
   - **Workflow:** The artist uploads project images directly to Cloudinary (web dashboard or mobile app), copies the public delivery URL, and pastes it into the respective Keystatic fields (e.g. `coverImage`, `profileImage`).
   - **Delivery:** Plain `<img>` elements will consume these delivery URLs directly. Because next.config.ts sets `unoptimized: true`, the static export will safely render these external src links without requiring server-side optimization.
2. Create `<MediaEmbed>` component to parse and render:
   - YouTube videos (responsive iframe)
   - Instagram posts / reels / carousel galleries (responsive iframe embeds with script-driven size adjustments)
   - Cloudinary images
3. Modify public pages to import from `src/lib/content.ts`:
   - **Home:** Update features, add "Upcoming Projects" section.
   - **Portfolio:** Add status tabs (completed/upcoming/in-progress), use Client-side filtering.
   - **Project Detail:** Setup `generateStaticParams` for pre-rendering, render media gallery with `<MediaEmbed>` supporting full embedded Instagram posts/carousels instead of self-hosted galleries where applicable.
   - **Team & Services:** Swap database fetches for local JSON reads.
4. ⛔ **STOP HERE.** Test all public pages locally. Ensure embeds load, links work, and static generation builds with zero errors. Ask for validation.

### Phase 4 — Contact Page & GitHub Actions Setup
1. Update `/contact` page to feature direct links for WhatsApp (prefilled text), Instagram, and Email.
2. Remove any remaining form handlers and delete `contact-form.tsx`.
3. Create `.github/workflows/deploy.yml` for automatic build and deployment to GitHub Pages.
4. Setup CNAME configuration for custom domain mapping.
5. ⛔ **STOP HERE.** Build final project production build locally (`npm run build`). Check `out/` directory content. Ask for validation.

---

## Action Plan Verification
Ready to start. Let's begin Phase 1. Confirm below if we should proceed to Phase 1.