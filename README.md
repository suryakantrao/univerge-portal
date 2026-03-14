# Univerge Content Approval Portal

Internal social media content approval and scheduling tool for the Univerge marketing team.

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React 18 + Vite 5                   |
| Routing     | React Router DOM v6                 |
| Styling     | CSS Modules + CSS Variables         |
| Icons       | Lucide React                        |
| Dates       | date-fns                            |
| Deployment  | Vercel (SPA, zero-config)           |

---

## Project Structure

```
univerge/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx + .module.css
│   │   │   ├── Card.jsx + .module.css
│   │   │   ├── Input.jsx + .module.css
│   │   │   ├── Modal.jsx + .module.css
│   │   │   └── NotificationToast.jsx + .module.css
│   │   ├── AppShell.jsx + .module.css
│   │   ├── PostCard.jsx + .module.css
│   │   └── PostDetailPanel.jsx + .module.css
│   ├── context/
│   │   └── AppContext.jsx          # Global state (posts, users, theme, notifications)
│   ├── pages/
│   │   ├── LoginPage.jsx + .module.css
│   │   ├── Dashboard.jsx + .module.css
│   │   ├── UploadPost.jsx + .module.css
│   │   ├── ApprovalQueue.jsx + .module.css
│   │   ├── CalendarPage.jsx + .module.css
│   │   ├── MediaLibrary.jsx + .module.css
│   │   ├── Analytics.jsx + .module.css
│   │   ├── SettingsPage.jsx + .module.css
│   │   └── NotFoundPage.jsx + .module.css
│   ├── utils/
│   │   ├── constants.js            # All static data, platform config, mock data
│   │   └── helpers.js              # Utility functions
│   ├── App.jsx                     # Router + auth gate
│   ├── main.jsx                    # ReactDOM entry
│   └── index.css                   # Global styles + CSS variables
├── index.html
├── vite.config.js
├── vercel.json                     # SPA rewrites for Vercel
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ or yarn

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

### Demo Login

```
Email:    alex@univerge.com
Password: password
```

---

## Deploying to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
# Follow prompts: Framework = Vite, Build = npm run build, Output = dist
```

### Option B — Vercel Dashboard (recommended)

1. Push this project to a GitHub / GitLab repository
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository
4. Vercel auto-detects Vite — no configuration needed
5. Click **Deploy**

The `vercel.json` included in this project handles SPA client-side routing automatically.

### Environment Variables (for real API integration)

Set these in the Vercel dashboard under **Project → Settings → Environment Variables**:

```env
VITE_FACEBOOK_APP_ID=
VITE_INSTAGRAM_APP_ID=
VITE_LINKEDIN_CLIENT_ID=
VITE_TWITTER_API_KEY=
VITE_API_BASE_URL=https://your-backend.com
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## User Roles

| Role             | Permissions                                                   |
|------------------|---------------------------------------------------------------|
| Admin            | Full access: manage users, connect accounts, override actions |
| Content Creator  | Upload, write captions, submit for approval, edit drafts      |
| Reviewer         | Approve, reject, edit captions, add notes, schedule posts     |

---

## Pages & Routes

| Route        | Page             | Description                              |
|--------------|------------------|------------------------------------------|
| `/dashboard` | Dashboard        | Stats overview, recent posts, charts     |
| `/upload`    | New Post         | 3-step post creation wizard              |
| `/queue`     | Approval Queue   | Filter/review posts with detail panel    |
| `/calendar`  | Calendar         | Monthly grid of scheduled content        |
| `/media`     | Media Library    | File browser with upload + search        |
| `/analytics` | Analytics        | KPIs, bar charts, top posts              |
| `/settings`  | Settings         | Team, social accounts, notifications     |

---

## Post Workflow

```
Draft → Pending Approval → Approved → Scheduled → Published
                        ↘ Rejected → (creator edits) → Pending Approval
```

---

## Connecting Real Social Media APIs

### Backend Required

For real publishing, you'll need a Node.js/Express or Next.js API backend that handles:
- OAuth flows for each platform
- Token storage (use a database — Supabase or PostgreSQL recommended)
- Scheduled publishing via cron jobs

### Recommended Stack for Production

```
Frontend:  This Vite/React app (deploy to Vercel)
Backend:   Next.js API routes OR Express on Railway/Render
Database:  Supabase (PostgreSQL + auth + storage)
Queue:     n8n OR BullMQ for scheduled publishing
Storage:   Cloudinary or AWS S3 for media files
```

### Platform API References

- **Facebook/Instagram**: [developers.facebook.com](https://developers.facebook.com/docs/graph-api)
- **LinkedIn**: [learn.microsoft.com/linkedin](https://learn.microsoft.com/en-us/linkedin/)
- **X (Twitter)**: [developer.twitter.com](https://developer.twitter.com/en/docs)

---

## Branding

| Token          | Value       |
|----------------|-------------|
| Primary Blue   | `#0067FB`   |
| Primary Orange | `#FF9900`   |
| Font           | Raleway     |

---

## License

Internal use only — © 2024 Univerge (univerge.com)
