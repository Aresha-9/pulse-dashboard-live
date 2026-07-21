# Pulse API

Ye ek chota Node.js + Express + SQLite backend hai jo Pulse dashboard ko live data serve karta hai. Pehli baar chalane par `pulse.db` (SQLite file) khud ban jaati hai aur wahi data seed ho jaata hai jo pehle `mockData.js` mein hardcoded tha.

## Chalane ka tareeqa

```bash
npm install
npm start
```

Server `http://localhost:4000` pe chalega. Pehli dafa chalane par console mein "Seeded pulse.db with initial data" print hoga — us ke baad restart karne pe data wahi rahega (dobara seed nahi hoga).

Agar data reset karna ho, `pulse.db`, `pulse.db-shm`, `pulse.db-wal` files delete kar ke server dobara start karein.

## Endpoints

| Method | Route | Kaam |
|---|---|---|
| GET | `/api/health` | Server zinda hai check karne ke liye |
| GET | `/api/stats` | 4 summary cards (revenue, orders, conversion, AOV) |
| GET | `/api/revenue-trend` | Pichle 7 din ka revenue + orders |
| GET | `/api/conversion-trend` | Pichle 7 din ki conversion rate |
| GET | `/api/orders` | Sab orders. `?q=text` se customer/order-id search |
| POST | `/api/orders` | Naya order banao — body: `{ customer, amount, status }`. Customer ka `orders`/`spent` bhi khud update ho jaata hai (agar status "Paid" ho) |
| GET | `/api/customers` | Sab customers, spent ke hisaab se sorted |

## Production mein deploy karna

Chhote projects ke liye [Railway](https://railway.app) ya [Render](https://render.com) pe free tier se deploy ho sakta hai:
1. Is folder ko GitHub repo mein push karein
2. Railway/Render pe "New Web Service" bana kar repo connect karein
3. Start command: `npm start`
4. Deploy ke baad jo URL milegi, wahi frontend ke `.env` mein `VITE_API_URL` set kar dein

## Next steps (jab real business ke liye use karna ho)

- `status` sirf 3 fixed values tak mehdood hai — agar aur states chahiye (e.g. "Shipped") to schema mein `CHECK` constraint update karein
- Real authentication (JWT/session) abhi nahi hai — agar dashboard public host karni hai to `/api/*` routes ko protect karna zaroori hoga
- Live-feel ke liye frontend har 5-10 second baad orders/stats poll karta hai (`pulse-dashboard/src/api.js` mein `POLL_INTERVAL_MS` dekhein) — agar zyada real-time chahiye to WebSocket (Socket.io) add kiya ja sakta hai
