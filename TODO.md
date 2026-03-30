# Meridian Growth Advisory — Gap Analysis & Fix Log

## Completed Fixes

### Critical Bugs Fixed

- [x] **Kurdish language code `ckb` → `kr`** — PRD mandates KR throughout. Updated in types, AppContext, translations, Navigation, CSS, and all component references.
- [x] **Kurdish metadata wrong** — Name changed from "Kurdish" → "Kurdish Sorani", nativeName from "کوردی" → "کوردی سۆرانی" per PRD spec.
- [x] **Achievement values incorrect** — Arabic item1 had "28 سوقًا" (should be "4 أسواق"), item2 had "340 شبكة" (should be "32"). English had same error. Kurdish had same error. All fixed.
- [x] **Kurdish translation key mismatch: coverageText** — Kurdish used `coverageText` while code reads `coverageValue`. Fixed to `coverageValue`.
- [x] **Kurdish services CTA structure mismatch** — Kurdish used nested `cta: { text, button }` but code reads flat `ctaText` / `ctaButton`. Fixed to flat keys.
- [x] **Hero achievements not using translation system** — Hardcoded Arabic/English ternary instead of `getTranslation()`. Now uses translation keys for all 3 languages plus item3/item4 conditional rendering.
- [x] **Industries section heading hardcoded** — Used `currentLanguage === 'ar'` ternary, excluded Kurdish. Now uses translation-based `industriesHeading` variable.
- [x] **Nav language switcher hack** — Hardcoded `lang.code === 'ckb' ? 'Kr'` removed; now uses `lang.code.toUpperCase()` which produces "KR" natively.
- [x] **AdminLayout blue background** — Main content area had `bg-[#58a1da]` clashing with dark theme. Removed.

### Font & Styling Fixes

- [x] **Google Fonts not loaded** — PRD requires Noto Naskh Arabic (AR/KR) and Inter (EN). Added `@import` in index.css.
- [x] **Wrong font families** — Arabic used generic system fonts, Kurdish used "Noto Sans Arabic" (wrong). Both now use "Noto Naskh Arabic". English now uses "Inter".
- [x] **CSS lang selector** — Changed `[lang="ckb"]` to `[lang="kr"]`. Added `[lang="en"]` selector.

### GitHub Export Preparation

- [x] **Vite config** — Removed `miaodaDevPlugin` dependency. Clean standalone config.
- [x] **Package.json** — Removed `miaoda-auth-react`, `miaoda-sc-plugin`, `@typescript/native-preview`. Fixed `vite` to standard package. Updated scripts to standard `dev`/`build`/`preview`/`lint`.
- [x] **Platform files removed** — Deleted `.rules/`, `sgconfig.yml`, `vite.config.dev.ts`, `pnpm-workspace.yaml`, platform `.env`.
- [x] **Dead code removed** — Removed unused `SamplePage.tsx`, `NotFound.tsx`, `AuthContext.tsx`, `RouteGuard.tsx`.
- [x] **README rewritten** — Professional GitHub-ready documentation with setup instructions, project structure, tech stack.
- [x] **.gitignore updated** — Added `.env` and `.env.local` patterns.
- [x] **.env.example created** — Documents optional environment variables.
- [x] **pnpm-lock.yaml removed** — Users will generate their own lock file with `npm install`.
- [x] **index.html** — Added page title, set default `lang="ar" dir="rtl"`.

## Remaining Considerations (Out of Scope for This Release per PRD §7)

- [ ] No persistent backend — all data resets on refresh (by design)
- [ ] Kurdish Sorani translation fields ship empty in admin Translation Editor (by design)
- [ ] No real email delivery for form submissions
- [ ] No SEO metadata / Open Graph tags
- [ ] No analytics integration

## Architecture Notes

- **Language code**: KR (not CKB) everywhere — nav pill, Language Management table, internal keys
- **Fonts**: Noto Naskh Arabic for Arabic + Kurdish Sorani, Inter for English, loaded via Google Fonts
- **Translation fallback**: Translation Editor → Content Management → hardcoded default
- **Admin credentials**: admin / admin123 (in-memory only)
- **State**: All in-memory via React Context — no Supabase calls in current release
