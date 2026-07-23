# Pulse Dashboard — ab live hai

Ye zip do folders rakhta hai:

- **`pulse-api/`** — Node/Express + SQLite backend jo pehle `mockData.js` mein hardcoded data serve karta hai
- **`pulse-dashboard/`** — wahi React dashboard, ab live API se fetch karta hai (poll every 8s)

## Chalane ka tareeqa (dono terminals mein)

**Terminal 1 — backend:**
```bash
cd pulse-api
npm install
npm start
```
Ye `http://localhost:4000` pe chalega aur pehli baar `pulse.db` (SQLite) khud bana kar seed kar dega.

**Terminal 2 — frontend:**
```bash
cd pulse-dashboard
npm install
npm run dev
```
Ye `http://localhost:5173` (ya jo bhi Vite port de) pe khulega aur backend se live data lega.

## Kya badla

- `src/data/mockData.js` ab kahin import nahi hoti — reference ke liye rakhi hai
- `src/api.js` — naya file, backend se fetch karne ke functions
- `src/hooks/usePolledData.js` — naya hook, jo data fetch kar ke har 8 second baad refresh karta hai (loading/error states ke sath)
- `Overview.jsx`, `Orders.jsx`, `Customers.jsx`, `Insights.jsx` — sab ab live data use karte hain, hardcoded imports hata diye gaye
- `.env.example` — agar backend kahin aur (Railway/Render) deploy karein to `VITE_API_URL` yahan set karein

## Live feel kaise kaam karti hai

Har page apna data har 8 second baad background mein refresh karta hai (`POLL_INTERVAL_MS` `src/api.js` mein). Agar aap backend ke `POST /api/orders` endpoint se koi naya order bhej dein (Postman/curl se), to wo order Orders page pe apne aap agle refresh cycle mein dikh jayega — bina page reload kiye.

Zyada tafseel ke liye `pulse-api/README.md` dekhein.
