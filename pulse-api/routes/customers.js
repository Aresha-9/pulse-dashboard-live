const express = require('express')
const db = require('../db')

const router = express.Router()

// GET /api/customers
router.get('/', (req, res) => {
  const rows = db
    .prepare('SELECT id, name, email, orders, spent FROM customers ORDER BY spent DESC')
    .all()
  res.json(rows)
})

module.exports = router
