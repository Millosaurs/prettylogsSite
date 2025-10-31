# PrettyLogs Website

Modern documentation and marketing website for PrettyLogs - a professional logging library for Node.js.

## Overview

This is the official website for PrettyLogs, featuring comprehensive documentation, interactive examples, and a landing page showcasing the library's capabilities. Built with modern web technologies and designed with a clean, professional aesthetic.

## Features

**Modern Stack**
- React Router v7 for fast, modern routing
- Tailwind CSS v4 for utility-first styling
- Shadcn UI components for consistent design
- Vite for blazing-fast development

**Design System**
- Sharp, angular design with no rounded corners
- Monochromatic dark theme with subtle accents
- Consistent spacing and typography
- Enhanced shadows and borders for depth

**Interactive Elements**
- Copy-to-clipboard on all code examples
- Tabbed package manager selector
- Collapsible FAQ section
- Animated stats fetched from GitHub and npm
- Smooth scroll navigation

**Documentation**
- Comprehensive sidebar navigation with collapsible sections
- Progress indicator showing reading completion
- Smooth scroll to sections
- Mobile-responsive design
- Search-friendly structure

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React Router v7 | Application routing and navigation |
| Tailwind CSS v4 | Styling and design system |
| Radix UI | Accessible, unstyled component primitives |
| Lucide React | Icon library |
| TypeScript | Type safety and developer experience |
| Vite | Build tooling and development server |

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Package manager: npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

```bash
npm run start
```

## Project Structure

```
prettyLogsWebsite/
├── app/
│   ├── routes/
│   │   ├── home.tsx          Landing page with features and examples
│   │   ├── docs.tsx          Comprehensive documentation
│   │   └── screenshot.tsx    Screenshot generation route
│   ├── components/
│   │   ├── ui/               Shadcn UI components
│   │   └── CodeBlock.tsx     Syntax-highlighted code blocks
│   ├── hooks/                Custom React hooks
│   ├── lib/                  Utility functions
│   ├── app.css               Global styles and theme
│   ├── root.tsx              Root layout component
│   └── routes.ts             Route configuration
├── public/                   Static assets and images
├── react-router.config.ts    React Router configuration
└── vite.config.ts           Vite build configuration
```

## Design Philosophy

### Visual Design

The website employs a modern, professional design system:

**Color Palette**
- Background: `#0a0a0a` - Deep black for primary background
- Card: `#111111` - Slightly elevated surface
- Border: `#222222` - Subtle separation
- Muted: `#1a1a1a` - Secondary surfaces
- Foreground: `#ededed` - Primary text
- Muted Foreground: `#888888` - Secondary text
- Primary: `#3b82f6` - Accent color for interactive elements

**Design Principles**
- Sharp, angular design with no rounded corners
- Heavy use of borders (2px) for definition
- Layered shadows for depth (md, lg, xl, 2xl)
- Gradient backgrounds on cards for visual interest
- Hover states with scale, color, and shadow transitions
- Consistent spacing using Tailwind's spacing scale

### Typography

- Primary font: System font stack for optimal performance
- Monospace: JetBrains Mono for code blocks
- Clear hierarchy with size and weight variations
- Consistent line heights for readability

## Key Pages

### Landing Page (/)

The landing page includes:

- Hero section with animated stats from GitHub and npm
- Feature grid highlighting key capabilities
- Interactive installation section with package manager tabs
- Comparison table with competing libraries
- Basic usage examples with copy buttons
- Advanced feature showcase
- Web server integration example
- Production best practices
- FAQ section with expandable answers
- Performance metrics
- Multiple call-to-action sections

### Documentation (/docs)

Comprehensive documentation featuring:

- Collapsible sidebar navigation with icons
- Active section tracking on scroll
- Reading progress indicator
- Quick Start guide
- Log levels overview
- Configuration options
- Child loggers
- File logging and rotation
- Performance monitoring
- Rich output formatting
- Production setup guide
- TypeScript support
- Complete API reference

## Customization

### Adding New Routes

Edit `app/routes.ts`:

```typescript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("docs", "routes/docs.tsx"),
  route("your-new-route", "routes/your-new-route.tsx"),
] satisfies RouteConfig;
```

### Modifying Theme Colors

Update the theme variables in `app/app.css`:

```css
@theme {
  --color-background: #0a0a0a;
  --color-foreground: #ededed;
  --color-card: #111111;
  --color-border: #222222;
  --color-primary: #3b82f6;
}
```

### Adding Components

Use the Shadcn CLI to add new components:

```bash
npx shadcn@latest add [component-name]
```

## Content Updates

### Updating Code Examples

Code examples use the `CodeBlock` component:

```tsx
<CodeBlock
  code={`your code here`}
  language="typescript"
/>
```

### Adding Documentation Sections

Documentation sections follow this structure:

```tsx
<section id="section-id" className="mb-16 scroll-mt-24">
  <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
    <Icon className="h-7 w-7" />
    Section Title
  </h2>
  <p className="text-muted-foreground mb-6">
    Section description
  </p>
  {/* Content here */}
</section>
```

## API Integration

The website fetches live data from external APIs:

**GitHub API**
- Endpoint: `https://api.github.com/repos/Millosaurs/prettylogs`
- Data: Star count
- Displayed in navigation and hero section

**npm API**
- Endpoint: `https://api.npmjs.org/downloads/point/last-month/@millosaurs/prettylogs`
- Data: Monthly download count
- Displayed in hero section stats

## Deployment

The website can be deployed to any static hosting service:

**Build the site:**
```bash
npm run build
```

**Deploy the `build/` directory to:**
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any static host

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

The website is optimized for performance:

- Code splitting with React Router
- Lazy loading of components
- Optimized images
- Minimal JavaScript bundle
- CSS purging in production
- Fast development with Vite HMR

## Contributing

To contribute to the website:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Links

- PrettyLogs Package: https://www.npmjs.com/package/@millosaurs/prettylogs
- GitHub Repository: https://github.com/Millosaurs/prettylogs
- Documentation: https://prettylogs.dev/docs

## Credits

Developed by Millosaurs
Design inspiration from modern developer tools and documentation sites