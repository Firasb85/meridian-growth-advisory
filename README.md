# Meridian Growth Advisory

A bilingual B2B market expansion advisory website supporting **Arabic** (default, RTL), **English** (LTR), and **Kurdish Sorani** (RTL), with a public multi-page site and a protected admin dashboard.

## Features

- **Trilingual Support** — Arabic, English, Kurdish Sorani with instant RTL/LTR switching
- **Public Site** — Home (hero, outcomes, industries), Services, Industries, About, Contact pages
- **Contact Form** — File attachments, validation, thank-you state
- **Admin Dashboard** — Login, Overview, Requests, CRM, Content Management, Language Management
- **Translation Editor** — Full string coverage for every UI element per language
- **Content Management** — Live-edit all site copy without page reload
- **In-Memory Storage** — All data resets on refresh (no backend required)

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **Radix UI** + **shadcn/ui** — Component library
- **React Router** — Client-side routing
- **React Hook Form** + **Zod** — Form validation
- **Lucide React** — Icons
- **Google Fonts** — Noto Naskh Arabic (AR/KR), Inter (EN)

## Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/meridian-growth-advisory.git
cd meridian-growth-advisory

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## Admin Access

Navigate to the footer and click the low-opacity **admin** button, or go directly to `/admin/login`.

| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

## Project Structure

```
src/
├── components/          # Shared UI components
│   ├── ui/              # shadcn/ui primitives
│   ├── layouts/         # Admin layout
│   ├── Navigation.tsx   # Top nav bar with language switcher
│   ├── Footer.tsx       # Site footer with hidden admin link
│   ├── CTABand.tsx      # Call-to-action section
│   └── TickerBanner.tsx # Scrolling keyword banner
├── contexts/
│   └── AppContext.tsx    # Global state (language, auth, data)
├── i18n/
│   └── translations.ts  # All translation strings (AR, EN, KR)
├── pages/
│   ├── HomePage.tsx
│   ├── ServicesPage.tsx
│   ├── IndustriesPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   └── admin/           # Admin dashboard panels
├── types/               # TypeScript interfaces
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── routes.tsx           # Route configuration
```

## Languages

| Language       | Code | Direction | Font              |
|----------------|------|-----------|-------------------|
| Arabic         | AR   | RTL       | Noto Naskh Arabic |
| English        | EN   | LTR       | Inter             |
| Kurdish Sorani | KR   | RTL       | Noto Naskh Arabic |

## License

This project is provided as-is for demonstration and portfolio purposes.
