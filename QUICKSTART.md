# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Development Server

```bash
# Start the dev server
npm run dev
```

Visit http://localhost:5173

### 2. Project Overview

**Two main pages:**
- `/` - Landing page with features and examples
- `/docs` - Full documentation with sidebar navigation

**Key files:**
- `app/routes/home.tsx` - Landing page component
- `app/routes/docs.tsx` - Documentation page component
- `app/app.css` - Monochromatic theme styles
- `app/root.tsx` - Root layout

### 3. Add Screenshots (IMPORTANT!)

Replace the screenshot placeholders:

```typescript
// Current placeholder:
<div className="aspect-video bg-muted/20 rounded border border-border flex items-center justify-center">
  <Terminal className="h-12 w-12 text-muted-foreground" />
</div>

// Replace with:
<img 
  src="/screenshots/basic-usage.png" 
  alt="Basic usage example"
  className="w-full rounded border border-border"
/>
```

**Screenshots needed:**
1. `basic-usage.png` - Simple logger output
2. `custom-logger.png` - Custom configuration output
3. `log-levels.png` - All log levels displayed
4. `child-loggers.png` - Child logger namespacing
5. `file-logging.png` - File output examples
6. `performance-monitoring.png` - Timer output
7. `rich-output.png` - Tables, JSON, boxes
8. `production-logs.png` - Production JSON logs
9. `web-server.png` - Express server logs

**Where to add them:**
- Place screenshots in `public/screenshots/`
- They'll be accessible at `/screenshots/filename.png`

### 4. Customize Content

**Update package version:**
```typescript
// In home.tsx, line ~64
<div className="inline-block mb-4 px-3 py-1 text-xs border border-border rounded-full bg-card">
  v1.0.0 • Production Ready  {/* Update version here */}
</div>
```

**Update links:**
- GitHub: Search for `https://github.com/Millosaurs/prettylogs`
- npm: Search for `@millosaurs/prettylogs`

### 5. Test Locally

```bash
# Build for production
npm run build

# Test production build
npm start
```

Visit http://localhost:3000

### 6. Deploy

**Vercel (Easiest):**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Or use the Vercel dashboard:**
1. Import GitHub repo
2. Auto-detects React Router
3. Deploy!

## 📝 Making Changes

### Updating Styles

All theme colors are in `app/app.css`:

```css
@theme {
  --color-background: #0a0a0a;
  --color-card: #111111;
  /* ... etc */
}
```

### Adding New Routes

1. Create file: `app/routes/your-route.tsx`
2. Update `app/routes.ts`:
```typescript
export default [
  index("routes/home.tsx"),
  route("docs", "routes/docs.tsx"),
  route("your-route", "routes/your-route.tsx"),
] satisfies RouteConfig;
```

### Adding Components

Use shadcn for consistent UI:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
# etc.
```

## 🎨 Design Guidelines

### Colors (Monochromatic Only!)
- ✅ Use: #0a0a0a, #111111, #1a1a1a, #222222, #ededed, #888888
- ❌ Avoid: Gradients, colored backgrounds, bright colors

### Typography
- Use JetBrains Mono for everything
- Code blocks: `className="code-block"`
- Emphasis: Use font-weight, not color

### Spacing
- Use Tailwind utilities: `p-4`, `mb-6`, `gap-8`, etc.
- Container: `className="container-custom"`
- Sections: `py-24` with `border-t border-border`

### Components
- Cards: `border border-border rounded-lg p-6 bg-card`
- Hover: Add `card-hover` class for transitions
- Code: Use `<CodeBlock>` component with copy button

## 🐛 Troubleshooting

### Build fails
```bash
rm -rf node_modules .react-router
npm install
npm run build
```

### Port already in use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or use different port
PORT=3001 npm run dev
```

### Type errors
```bash
npm run typecheck
```

### Styles not updating
```bash
# Restart dev server
# Ctrl+C, then npm run dev
```

## 📚 Resources

- [React Router v7 Docs](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Shadcn UI Docs](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)

## ✅ Pre-Deployment Checklist

- [ ] Add all screenshots
- [ ] Update version number
- [ ] Test all links
- [ ] Build locally: `npm run build`
- [ ] Test production: `npm start`
- [ ] Check mobile responsiveness
- [ ] Verify all code examples work
- [ ] Add custom domain (if applicable)
- [ ] Set up analytics (optional)

## 🚢 Ready to Deploy?

See `DEPLOYMENT.md` for detailed deployment instructions for:
- Vercel
- Netlify
- Fly.io
- Railway
- Docker
- Self-hosted Node.js

---

**Need help?** Check the main README.md or PROJECT_SUMMARY.md for more details.