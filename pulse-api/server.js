require('./db') // ensures the db file + seed data exist before we start handling requests

const express = require('express')
const cors = require('cors')

const ordersRouter = require('./routes/orders')
const customersRouter = require('./routes/customers')
const statsRouter = require('./routes/stats')

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use('/api/orders', ordersRouter)
app.use('/api/customers', customersRouter)
app.use('/api', statsRouter) // exposes /api/stats, /api/revenue-trend, /api/conversion-trend

app.use((req, res) => res.status(404).json({ error: 'Not found' }))

app.listen(PORT, () => {
  console.log(`Pulse API running at http://localhost:${PORT}`)
})
