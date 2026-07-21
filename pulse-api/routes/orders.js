const express = require('express')
const db = require('../db')

const router = express.Router()

// GET /api/orders?q=search-term
router.get('/', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase()

  let rows
  if (q) {
    rows = db
      .prepare(
        `SELECT id, customer, amount, status FROM orders
         WHERE lower(id) LIKE @q OR lower(customer) LIKE @q
         ORDER BY created_at DESC`,
      )
      .all({ q: `%${q}%` })
  } else {
    rows = db
      .prepare('SELECT id, customer, amount, status FROM orders ORDER BY created_at DESC')
      .all()
  }

  res.json(rows)
})

// POST /api/orders  { customer, amount, status }
// Creates a new order and keeps the customer's stats in sync — this is what
// makes the dashboard feel "live" once you wire up a real checkout/webhook.
router.post('/', (req, res) => {
  const { customer, amount, status } = req.body

  if (!customer || typeof amount !== 'number' || !['Paid', 'Pending', 'Refunded'].includes(status)) {
    return res.status(400).json({
      error: 'Body must include: customer (string), amount (number), status (Paid|Pending|Refunded)',
    })
  }

  const allIds = db.prepare('SELECT id FROM orders').all()
  const maxNum = allIds.reduce((max, row) => {
    const num = parseInt(row.id.split('-')[1], 10)
    return Number.isFinite(num) && num > max ? num : max
  }, 999)
  const id = `PLS-${maxNum + 1}`

  const insertOrder = db.prepare(
    'INSERT INTO orders (id, customer, amount, status) VALUES (@id, @customer, @amount, @status)',
  )
  const updateCustomerSpend = db.prepare(
    `UPDATE customers SET orders = orders + 1, spent = spent + @amount WHERE name = @customer`,
  )

  const run = db.transaction(() => {
    insertOrder.run({ id, customer, amount, status })
    if (status === 'Paid') {
      updateCustomerSpend.run({ customer, amount })
    }
  })
  run()

  res.status(201).json({ id, customer, amount, status })
})

module.exports = router
