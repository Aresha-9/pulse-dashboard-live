const express = require('express')
const db = require('../db')

const router = express.Router()

// GET /api/stats
router.get('/stats', (req, res) => {
  const rows = db.prepare('SELECT label, value, delta, up FROM stats').all()
  res.json(rows.map((r) => ({ ...r, up: !!r.up })))
})

// GET /api/revenue-trend
router.get('/revenue-trend', (req, res) => {
  const rows = db.prepare('SELECT day, revenue, orders FROM revenue_trend').all()
  res.json(rows)
})

// GET /api/conversion-trend
router.get('/conversion-trend', (req, res) => {
  const rows = db.prepare('SELECT day, rate FROM conversion_trend').all()
  res.json(rows)
})

module.exports = router
