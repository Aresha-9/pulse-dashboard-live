# Pulse — React + MUI Analytics Dashboard

Ek dusra **React + MUI** project — is baar ek analytics dashboard, dark sidebar aur data charts ke sath (pehle wala TaskFlow ek task manager tha).

## Features
- Dark indigo sidebar with live "pulse" status indicator, working nav — click Orders, Customers, Insights, or Settings and the page actually changes
- Overview: stat cards + revenue chart + recent orders
- Orders: full order list with a live search box (filter by order ID or customer)
- Customers: customer table with avatars, order counts, total spent
- Insights: conversion-rate stats and a trend chart
- Settings: workspace preferences form (name, email, toggles) — the Dark mode switch actually flips the whole app's theme
- Real dark mode: toggle it from Settings, whole app (backgrounds, text, charts, tables) switches instantly
- Fully responsive: sidebar becomes a slide-over drawer on mobile, stat cards reflow, tables scroll horizontally on small screens
- Custom MUI theme — "Pulse" palette (indigo + coral + teal + amber), Sora + IBM Plex Mono fonts

## Tech stack
- React 18
- MUI (Material UI) v5 + Emotion
- Recharts (for the revenue chart)
- Vite

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

```
pulse-dashboard/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx            # page routing (state-based, no react-router)
    ├── theme.js           # getTheme(mode) — returns light or dark MUI theme
    ├── context/
    │   └── ColorModeContext.jsx   # shares dark-mode state + toggle app-wide
    ├── data/
    │   └── mockData.js       # replace with real API data
    ├── pages/
    │   ├── Overview.jsx
    │   ├── Orders.jsx
    │   ├── Customers.jsx
    │   ├── Insights.jsx
    │   └── Settings.jsx
    └── components/
        ├── Sidebar.jsx
        ├── TopBar.jsx
        ├── StatCard.jsx
        ├── RevenueChart.jsx
        └── OrdersTable.jsx
```

## Notes for extending
- All mock data lives in `src/data/mockData.js` — swap it for a fetch to your Express/MongoDB API to make it live.
- Palette and fonts are centralized in `theme.js` under `palette.custom` — change them once to reskin everything.
