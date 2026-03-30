# Requirements Document

## 1. Application Overview

**Application Name:** Meridian Growth Advisory

**Description:** A bilingual B2B market expansion advisory website supporting Arabic (default, RTL) and English (LTR), with Kurdish Sorani (RTL) as a third language, with a public multi-page site and a protected admin dashboard. The site presents the firm's outcomes, services, industries, and contact form. The admin panel manages incoming requests, a CRM, fully editable site content, and a comprehensive language/translation management system covering every UI string across all pages and components.

---

## 2. Users & Use Cases

**Target Users:**
- Prospective B2B clients seeking market expansion advisory services
- Site administrators managing content, leads, CRM, and all site translations

**Core Use Cases:**
- Visitors browse the site in Arabic, English, or Kurdish Sorani, learn about services, and submit a contact inquiry
- Admins log in to review and manage form submissions, customer records, site content, and the full translation strings for every language

---

## 3. Page Structure & Core Features

### 3.1 Page Hierarchy

```
Public Site
├── Home
│   ├── Hero Section
│   ├── Ticker Banner
│   ├── Outcomes Section
│   └── Industries Section
├── Services
├── Industries (standalone page)
├── About
└── Contact

Admin Area
├── Login
└── Dashboard
    ├── Overview
    ├── Requests
    ├── CRM
    ├── Content Management
    └── Language Management
        ├── Language List
        ├── Add / Edit Language
        └── Translation Editor (full string coverage per language)
```

---

### 3.2 Global Elements

**Typography & Font Selection**

The site uses distinct font families per language to ensure optimal readability and cultural appropriateness:

- **Arabic (ar):** Noto Naskh Arabic — a highly legible Naskh-style Arabic font well-suited for body text and headings in professional contexts
- **Kurdish Sorani (kr):** Noto Naskh Arabic — Kurdish Sorani uses the Arabic script; Noto Naskh Arabic provides excellent coverage for Sorani characters including the additional letters (ڤ، ڵ، ۆ، ێ، ڕ، ژ، گ، چ، پ) not present in standard Arabic; this ensures correct glyph rendering for all Sorani-specific characters
- **English (en):** Inter — a clean, modern sans-serif optimized for screen readability in professional B2B contexts

Font loading: All fonts are loaded via Google Fonts. The active language's font family is applied to the `<html>` or `<body>` element via a CSS class swap on language change, ensuring instant typographic switching without page reload.

**Navigation Bar**
- Fixed top bar, height 70px; becomes opaque with blur on scroll
- Logo text (editable via admin Content panel): defaults to 「Meridian」
- Nav links: Outcomes, Services, Industries, About — each scrolls to section or navigates to page
- Language switcher: pill-style toggle showing enabled language codes (e.g. AR / EN / KR); switches site direction, font, and all copy instantly
- CTA button 「Talk to Us」 / 「تواصل معنا」 / 「پەیوەندیمان پێوە بکە」 navigates to Contact page; label controlled via Translation Editor
- On mobile (≤640px): nav links hidden; logo and CTA remain

**Ticker Banner**
- Full-width gold background strip below nav on Home
- Continuously scrolling marquee of keyword chips; chip labels are editable via admin Content Management panel
- Direction of scroll reverses for RTL languages (Arabic and Kurdish Sorani)

**Footer**
- Three-column layout (collapses to single column on mobile)
- Column 1: Logo, footer description (editable via admin)
- Column 2: Service quick-links (labels editable via Translation Editor)
- Column 3: About links — Talk to an Advisor (navigates to Contact), email address, LinkedIn ↗ (external link placeholder)
- Bottom bar: copyright text (editable via admin) + hidden 「admin」 button (low-opacity) that triggers admin login flow

**CTA Band**
- Gold background section appearing at the bottom of Home, Industries, About, and Services pages
- Headline, sub-text, and button text are editable via admin Content Management panel and Translation Editor
- Button navigates to Contact page

---

### 3.3 Home Page

**Hero Section**
- Two-column layout (left: text; right: decorative card); right column hidden on mobile
- Left column content:
  - Eyebrow tag (editable tagline)
  - H1 heading with italic/highlighted em span (editable main heading)
  - Sub-heading paragraph (editable)
  - Two CTA buttons: primary (→ Contact), secondary (smooth-scrolls to Outcomes section); button labels editable via Translation Editor
  - Three stat counters with the following default values and labels (all editable via admin Content Management):
    - Stat 1: value 「25+」, label 「سنوات من الخبرة」 / 「Years of Experience」
    - Stat 2: value 「32+」, label 「مشروع ناجح」 / 「Successful Projects」
    - Stat 3: value 「4」, label 「دول」 / 「Countries」
  - Right column: glassmorphism card listing four achievement bullets with the following default values (all editable via admin Content Management):
    - Bullet 1: 「دخول ناجح إلى 4 أسواق」 / 「Successful entry into 4 markets」
    - Bullet 2: 「أكثر من 32 شبكة توزيع تم بناؤها」 / 「More than 32 distribution networks built」
    - Bullet 3: (editable, no default)
    - Bullet 4: (editable, no default)
- Background: dark navy with subtle grid overlay and radial glow
- Entrance animations: staggered fade-up on load

**Outcomes Section** (id=「outcomes」)
- Section label chip + heading (editable via Translation Editor)
- 2×2 card grid; each card shows: number (01–04), title, description, tag chips — all editable via admin Content Management
- Cards have hover lift + left-border reveal animation

**Industries Section** (inline on Home)
- 4-column grid of industry cards (Manufacturing, Agri-Food & FMCG, Technology & SaaS, Construction)
- Each card: emoji icon, name, description — all editable via admin Content Management
- Hover: card background transitions to dark navy, text to white

---

### 3.4 Services Page

- Page-level hero header (dark navy, grid background) with section label and heading (editable via Translation Editor)
- 3×3 grid of service cards on dark navy background
- Each card: value label (small caps), service title, one-line description — all editable via admin Content Management
- Hover: top border reveal animation
- Bottom CTA row: prompt text + button navigating to Contact; text editable via Translation Editor

---

### 3.5 Industries Page (Standalone)

- Page hero header (heading editable via Translation Editor)
- Ticker banner
- 4-column industry card grid (same cards as Home inline section, content editable via admin Content Management)
- CTA Band at bottom

---

### 3.6 About Page

- Page hero header with multi-part heading (title + em + title2; editable via Translation Editor)
- Two-column layout:
  - Left: three body paragraphs (editable via admin Content Management)
  - Right: four value list items, each with dot indicator, bold name, description — all editable via admin Content Management
- CTA Band at bottom

---

### 3.7 Contact Page

- Section heading (editable via Translation Editor)
- Two-column layout:
  - Left: info panel — title, sub-text, three contact detail rows (Email, Phone, Coverage); email and phone are editable via admin Content Management; all labels editable via Translation Editor
  - Right: contact form
- **Contact Form Fields:**
  - Full Name (required)
  - Company
  - Email
  - Phone
  - Growth Objective (textarea)
  - File attachment (optional, multiple files; displays chip list of selected filenames)
  - Submit button
- All form field labels, placeholder text, and button label are editable via Translation Editor
- On successful submission: form replaced by thank-you message; thank-you heading and follow-up note text are editable via Translation Editor
- Submission data stored to Requests list in admin panel; attached files are stored and accessible for download from the admin Requests panel

---

### 3.8 Admin Login Page

- Centered card on dark background
- Logo, 「Admin Console」 label
- Username + Password fields (Enter key triggers submit)
- Error state: inline warning banner for invalid credentials; error message text editable via Translation Editor
- Demo credentials: admin / admin123
- On success: redirects to Admin Dashboard

---

### 3.9 Admin Dashboard

**Layout:**
- Fixed left sidebar (248px) with logo, nav items grouped into 「Main」 and 「Website」, and 「← Back to Site」 exit button
- Top bar: panel title, breadcrumb path, admin user pill
- Main content area with panel-level animations

**Overview Panel**
- Four stat cards: New Requests, Customers, Languages, Content Areas — each clickable, navigates to respective panel
- Recent Requests table (latest 5): Contact, Date, Status columns
- Customers quick-list (all): avatar initial, name, company/email

**Requests Panel**
- Three stat cards: Total, New, In Progress
- Filter tabs: All / New / In Progress / Done
- Table columns: Contact (name + email/phone), Message (truncated), Date, Status badge, Files indicator, Actions
- Row actions: View detail (👁), Convert to CRM (⇄), Delete (🗑)
- Detail modal: full contact info, message body, attached file chips with individual download buttons per file, status update buttons (New / In Progress / Done)
- Each attached file chip in the detail modal displays the filename and a download button; clicking download initiates a browser download of the corresponding file
- Files column in the table shows a count badge if files are attached; clicking the badge or opening the detail modal reveals the downloadable file list
- Convert to CRM: pre-fills CRM form with request data and adds entry

**CRM Panel**
- Three stat cards: Total, This Month, With Notes
- Search bar filtering by name, company, or email
- Table columns: Name (avatar + name), Contact (email + phone), Company, Added date, Notes (truncated), Actions (edit / delete)
- Add / Edit modal: Full Name, Company, Email, Phone, Notes fields

**Content Management Panel**

This panel controls all static and dynamic content values that appear on the public site. Changes are reflected immediately (in-memory). Sections and their editable fields:

- **Brand Identity**
  - Logo / Brand Name
  - Tagline (eyebrow tag on Hero)

- **Hero Section**
  - Main Heading (with em/highlight span)
  - Sub-heading
  - Primary CTA button label
  - Secondary CTA button label
  - Stat 1 value and label (default: 25+, Years of Experience / سنوات من الخبرة)
  - Stat 2 value and label (default: 32+, Successful Projects / مشروع ناجح)
  - Stat 3 value and label (default: 4, Countries / دول)
  - Achievement card bullet 1: default 「دخول ناجح إلى 4 أسواق」
  - Achievement card bullet 2: default 「أكثر من 32 شبكة توزيع تم بناؤها」
  - Achievement card bullet 3
  - Achievement card bullet 4

- **Outcomes Section**
  - Section label chip text
  - Section heading
  - Card 1–4: number, title, description, tag chips (comma-separated)

- **Industries Cards** (shared between Home inline section and Industries standalone page)
  - Card 1–4: emoji icon, name, description

- **Services Cards**
  - Section label and heading
  - Card 1–9: value label, service title, one-line description
  - Bottom CTA prompt text

- **About Page**
  - Hero heading parts (title, em, title2)
  - Body paragraph 1–3
  - Value list item 1–4: bold name, description

- **Call to Action Band**
  - CTA Title
  - CTA Sub-text
  - CTA Button Text

- **Contact Information**
  - Email
  - Phone
  - WhatsApp
  - Coverage label and value
  - Info panel title and sub-text

- **Footer**
  - Footer Description
  - Copyright text
  - Service quick-link labels (Column 2, items 1–N)
  - About column link labels

- **Ticker Banner**
  - Keyword chip list (comma-separated or individual fields per chip)

- 「Save All」 button triggers toast confirmation; changes reflect on live site immediately (in-memory)

---

**Language Management Panel**

This panel manages all languages available on the site and provides a full Translation Editor covering every UI string for each non-default language.

**Language List**
- Seed languages: Arabic (default, RTL), Kurdish Sorani (RTL), English (LTR)
- Kurdish Sorani seed entry: Language Name 「Kurdish Sorani」, Native Name 「کوردی سۆرانی」, Code 「KR」, Direction RTL, Status Enabled, Default: No
- Table columns: Language name + native name, Code, Direction badge, Status badge, Default indicator, Enabled toggle, Actions (edit / delete)
- Toggle: enables/disables language in nav switcher; default language cannot be toggled off or deleted
- Set Default: changes which language loads on first visit; updates nav switcher
- Add / Edit modal: Language Name, Native Name, Code (max 5 chars), Direction (LTR/RTL select)

**Translation Editor — Full String Coverage**

For each non-default language, the Translation Editor exposes inline input fields for every translatable string used across the entire site. Fields are grouped by section for clarity. Each language has its own per-language Save button and a global Save All button. Changes are applied immediately (in-memory) to the live site.

Kurdish Sorani (KR) Translation Editor fields ship empty by default; the font applied when rendering Kurdish Sorani strings in the Translation Editor input fields is Noto Naskh Arabic to ensure correct Sorani glyph display while editing.

Translation string groups and their fields:

- **Navigation**
  - Nav link: Outcomes
  - Nav link: Services
  - Nav link: Industries
  - Nav link: About
  - Nav CTA button label (e.g. Talk to Us)
  - Language switcher aria-label

- **Hero Section**
  - Eyebrow tagline
  - Main heading (with em span)
  - Sub-heading
  - Primary CTA button label
  - Secondary CTA button label
  - Stat 1 label
  - Stat 2 label
  - Stat 3 label
  - Achievement card bullet 1–4

- **Ticker Banner**
  - Keyword chip 1–N (one field per chip)

- **Outcomes Section**
  - Section label chip
  - Section heading
  - Card 1–4: title, description, tag chips

- **Industries Section / Page**
  - Page hero heading
  - Card 1–4: name, description

- **Services Page**
  - Page hero section label
  - Page hero heading
  - Card 1–9: value label, service title, description
  - Bottom CTA prompt text
  - Bottom CTA button label

- **About Page**
  - Page hero heading parts (title, em, title2)
  - Body paragraph 1–3
  - Value list item 1–4: name, description

- **CTA Band**
  - CTA title
  - CTA sub-text
  - CTA button label

- **Contact Page**
  - Section heading
  - Info panel title
  - Info panel sub-text
  - Contact detail row labels (Email, Phone, Coverage)
  - Form field labels: Full Name, Company, Email, Phone, Growth Objective, File Attachment
  - Form field placeholders: Full Name, Company, Email, Phone, Growth Objective
  - Submit button label
  - Thank-you heading
  - Thank-you follow-up note

- **Footer**
  - Footer description
  - Copyright text
  - Column 2 service link labels (1–N)
  - Column 3 link labels (Talk to an Advisor, email label)

- **Admin Login Page**
  - 「Admin Console」 label
  - Username field label and placeholder
  - Password field label and placeholder
  - Submit button label
  - Invalid credentials error message

- **General / Shared UI**
  - Empty state message for Requests list
  - Empty state message for CRM search
  - Toast confirmation message for saved content
  - Status labels: New, In Progress, Done
  - Modal action button labels: Save, Cancel, Delete, Confirm
  - Form validation message for required Full Name field

---

## 4. Business Rules & Logic

- **Language switching:** Changing language updates font family (Inter for English; Noto Naskh Arabic for Arabic and Kurdish Sorani), text direction (RTL/LTR), all UI copy (sourced from Translation Editor strings), and ticker scroll direction simultaneously across the entire site without page reload
- **Font application:** The active language's font is applied globally to the `<body>` element via a CSS class or CSS variable swap; Kurdish Sorani and Arabic share the same font family (Noto Naskh Arabic) but are treated as distinct language entries with independent translation objects
- **Translation fallback:** If a translation string for the active language is empty or missing, the site falls back to the default language string; if the default language string is also empty, the hardcoded English string is used as final fallback
- **Content override priority:** Admin Content Management field values take precedence over Translation Editor strings; if a Content Management field is empty, the Translation Editor string is used; if that is also empty, the hardcoded default string is used
- **Default language:** Determined by the language marked as default in the Language List; admin can change default, which updates the initial language state on next site load
- **Admin access gate:** Clicking the hidden 「admin」 footer button checks authenticated state — if already authenticated, goes directly to dashboard; otherwise shows login screen
- **Session persistence:** Authentication state is in-memory only; refreshing the page resets to unauthenticated
- **Request submission:** Requires at minimum a non-empty Full Name; all other fields are optional
- **File storage for requests:** Attached files submitted via the contact form are stored in-memory and associated with the corresponding request record; they are accessible for download by the admin from the Requests panel detail modal
- **File download in admin:** Each file attached to a request is individually downloadable from the detail modal; the download is triggered via a browser-native download action using the stored file data
- **Status flow for requests:** New → In Progress → Completed (admin-controlled; no automatic transitions)
- **CRM conversion:** Converting a request creates a new CRM entry pre-populated with name, email, phone, company, and a note referencing the submission date; the original request remains in the Requests list
- **Scroll behavior:** Page navigation resets scroll position to top; secondary CTA on Hero smooth-scrolls to the Outcomes section anchor
- **Reveal animations:** Sections use IntersectionObserver to trigger fade-up animations when entering the viewport; fallback to immediate visible state if observer is unavailable
- **Translation Editor scope:** All string fields listed in Section 3.9 Translation Editor must be wired to the live translation object so that saving a field immediately updates the corresponding string rendered on the public site for that language
- **RTL layout for Kurdish Sorani:** All RTL layout rules (text alignment, flex direction, grid mirroring, ticker scroll direction, hero column order) that apply to Arabic also apply to Kurdish Sorani, since both are RTL languages
- **Language code update:** The Kurdish Sorani language code is KR throughout the entire application, including the nav language switcher pill, the Language Management table, and all internal translation object keys

---

## 5. Edge Cases & Boundary Conditions

| Scenario | Expected Behavior |
|---|---|
| Contact form submitted with only name filled | Submission succeeds; email, phone, company, message stored as null or empty |
| No files attached to contact form | File chip area not shown; submission proceeds normally |
| Admin deletes the default language | Delete action is blocked for the language marked as default |
| Admin disables the default language via toggle | Toggle is disabled (non-interactive) for the default language |
| Language code entered in admin has no matching translation object | Site falls back to default language strings, then to hardcoded English strings |
| A Translation Editor field is saved as empty | Live site displays the Content Management value if set, otherwise the hardcoded default string |
| Requests list is empty | Requests panel and Overview recent-requests table show empty state illustration |
| CRM search returns no matches | Table replaced with empty state illustration |
| Admin content field left blank | Live site displays the Translation Editor string as fallback, then hardcoded default |
| User navigates to a page while in RTL mode | Page hero, grid layouts, and animations respect RTL direction (applies to both Arabic and Kurdish Sorani) |
| Screen width ≤ 960px | Two-column layouts collapse to single column; hero right panel hidden |
| Screen width ≤ 640px | Nav links hidden; padding reduced; multi-column grids collapse to single column |
| Admin adds a new language without entering any translation strings | Site falls back to default language strings for all fields in that language |
| Ticker chip list is saved with empty entries | Empty chips are ignored and not rendered |
| Kurdish Sorani is active and a Sorani-specific character (e.g. ڤ، ێ، ۆ) is rendered | Noto Naskh Arabic font correctly renders the glyph; no missing character box displayed |
| Kurdish Sorani Translation Editor fields are all empty on first load | Site falls back to Arabic (default) strings, then to hardcoded English strings |
| Request has attached files and admin opens detail modal | All attached files are listed as downloadable chips; each file can be individually downloaded |
| Request has no attached files | Files section in detail modal is not shown or shows an empty state; no download controls rendered |
| Admin attempts to download a file from a request | Browser initiates download of the file using the stored in-memory file data |

---

## 6. Acceptance Criteria

- Language switcher in nav correctly toggles between all enabled languages (Arabic, English, Kurdish Sorani); site direction, fonts, and all copy update instantly
- Language switcher pill displays KR (not CKB) for Kurdish Sorani
- Switching to Kurdish Sorani applies Noto Naskh Arabic font and RTL layout across all pages
- Switching to English applies Inter font and LTR layout across all pages
- Switching to Arabic applies Noto Naskh Arabic font and RTL layout across all pages
- Kurdish Sorani-specific characters (ڤ، ێ، ۆ، ڵ، ڕ) render correctly without missing glyph boxes
- Home page hero renders with correct RTL/LTR layout based on active language
- Ticker scrolls in the correct direction for RTL (Arabic, Kurdish Sorani) vs LTR (English)
- Contact form validates that Full Name is non-empty before submission; shows thank-you state on success
- Submitted contact form entries appear in the admin Requests panel with correct name, date, and 「New」 status
- Attached files submitted via the contact form are accessible in the admin Requests panel detail modal
- Each attached file in the detail modal has a working download button that triggers a browser download
- Files column in the Requests table shows a count badge when files are attached
- Admin login rejects incorrect credentials with an error banner; accepts admin / admin123
- Hero stat counters display the updated default values: 25+ Years of Experience, 32+ Successful Projects, 4 Countries
- Hero achievement card bullets display the updated default values: 「دخول ناجح إلى 4 أسواق」 and 「أكثر من 32 شبكة توزيع تم بناؤها」 as bullets 1 and 2
- Admin Content Management edits (logo, heading, CTA, email, phone, footer, ticker chips, outcome cards, service cards, about content, stat counters, achievement bullets) are reflected on the live site without page reload
- Translation Editor saves for any string field immediately update the corresponding rendered string on the public site for that language
- All Translation Editor string groups (Navigation, Hero, Ticker, Outcomes, Industries, Services, About, CTA Band, Contact, Footer, Admin Login, General UI) are present and wired to the live translation object for all three languages
- Kurdish Sorani (KR) appears in the Language Management table with native name 「کوردی سۆرانی」, code KR, direction RTL, and enabled status
- Kurdish Sorani Translation Editor fields are present and editable; they ship empty by default
- Enabling or disabling a language in admin immediately updates the nav language switcher
- Default language cannot be toggled off or deleted
- Converting a request to CRM creates a new CRM entry and shows a toast confirmation
- Request status can be updated to New, In Progress, or Done from both the table and the detail modal
- CRM search filters results in real time by name, company, and email
- All pages are accessible via nav links and scroll to top on navigation
- Reveal animations trigger on scroll for section cards; no layout breakage if IntersectionObserver is unavailable
- Admin 「← Back to Site」 returns to the public site without losing state
- Fallback chain (Translation Editor → Content Management → hardcoded default) functions correctly when fields are empty

---

## 7. Out of Scope (This Release)

- Persistent backend storage — all data (requests, CRM, content edits, language changes, translation strings, uploaded files) is in-memory and resets on page refresh
- Real email delivery or notification system for new form submissions
- Kurdish Sorani (kr) pre-filled translation content — Translation Editor fields for Kurdish Sorani are present and editable but ship empty by default
- LinkedIn or any external social media integration
- WhatsApp contact field functionality (field exists in admin Content Management panel but is not rendered on the public site)
- User account management beyond the single hardcoded admin credential
- Server-side file storage or persistent file upload backend
- SEO metadata, Open Graph tags, or sitemap generation
- Analytics or tracking integration