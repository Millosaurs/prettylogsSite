# PrettyLogs Website

Modern, monochromatic documentation and landing page for the PrettyLogs package.

## Features

- 🎨 **Monochromatic Dark Theme** - Inspired by zed.ai with clean grid design
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **React Router v7** - Fast, modern routing
- 🎯 **Tailwind CSS** - Utility-first styling
- 🧩 **Shadcn Components** - Beautiful, accessible UI components
- 🔤 **Monospace Font** - JetBrains Mono for code aesthetics

## Tech Stack

- **Framework**: React Router v7
- **Styling**: Tailwind CSS v4
- **Components**: Radix UI (via shadcn)
- **Icons**: Lucide React
- **Font**: JetBrains Mono
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173` to view the site.

### Build

```bash
npm run build
```

### Production

```bash
npm run start
```

## Project Structure

```
prettyLogsWebsite/
├── app/
│   ├── routes/
│   │   ├── home.tsx       # Landing page
│   │   └── docs.tsx       # Documentation page
│   ├── components/        # Reusable components (shadcn)
│   ├── lib/              # Utility functions
│   ├── app.css           # Global styles
│   ├── root.tsx          # Root layout
│   └── routes.ts         # Route configuration
├── public/               # Static assets
└── package.json
```

## Design Philosophy

### Monochromatic Color Scheme

The site uses a strict monochromatic color palette:

- Background: `#0a0a0a`
- Cards: `#111111`
- Borders: `#222222`
- Muted: `#1a1a1a`
- Text: `#ededed`
- Muted Text: `#888888`

### Grid Design

Inspired by zed.ai, the design features:

- Subtle grid patterns for visual depth
- Clean, geometric layouts
- Consistent spacing and alignment
- Minimalist aesthetic

### Typography

- **Font**: JetBrains Mono for all text
- **Code blocks**: Monospace with syntax awareness
- **Hierarchy**: Clear size and weight distinctions

## Pages

### Landing Page (`/`)

- Hero section with key value proposition
- Feature grid showcasing capabilities
- Installation instructions
- Code examples with screenshot placeholders
- Advanced features showcase
- Production best practices
- Performance metrics
- Call-to-action sections

### Documentation (`/docs`)

- Sidebar navigation
- Getting started guide
- Configuration options
- API reference
- Advanced usage patterns
- Production setup guides
- TypeScript integration

## Customization

### Adding New Routes

Edit `app/routes.ts`:

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("docs", "routes/docs.tsx"),
  route("your-route", "routes/your-route.tsx"),
] satisfies RouteConfig;
```

### Updating Colors

Edit `app/app.css` theme section:

```css
@theme {
  --color-background: #0a0a0a;
  --color-foreground: #ededed;
  /* ... other colors */
}
```

## Screenshot Placeholders

The site includes placeholder sections for screenshots from the prettylogs package. These should be replaced with actual screenshots from the `screenshots/` folder in the main prettylogs repository.

## License

MIT

## Credits

Built with ❤️ by [Millosaurs](https://github.com/Millosaurs)

Inspired by [zed.ai](https://zed.dev) design philosophy