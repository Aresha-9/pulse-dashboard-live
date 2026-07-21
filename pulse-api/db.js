const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.join(__dirname, 'pulse.db'))
db.pragma('journal_mode = WAL')

// ---- schema ----
db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    orders INTEGER NOT NULL DEFAULT 0,
    spent REAL NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Paid', 'Pending', 'Refunded')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS revenue_trend (
    day TEXT PRIMARY KEY,
    revenue REAL NOT NULL,
    orders INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS conversion_trend (
    day TEXT PRIMARY KEY,
    rate REAL NOT NULL
  );

  CREATE TABLE IF NOT EXISTS stats (
    label TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    delta TEXT NOT NULL,
    up INTEGER NOT NULL
  );
`)

// ---- seed (only if empty, so restarting the server doesn't duplicate data) ----
const alreadySeeded = db.prepare('SELECT COUNT(*) AS c FROM orders').get().c > 0

if (!alreadySeeded) {
  const insertCustomer = db.prepare(
    'INSERT INTO customers (id, name, email, orders, spent) VALUES (@id, @name, @email, @orders, @spent)',
  )
  const insertOrder = db.prepare(
    'INSERT INTO orders (id, customer, amount, status) VALUES (@id, @customer, @amount, @status)',
  )
  const insertRevenue = db.prepare(
    'INSERT INTO revenue_trend (day, revenue, orders) VALUES (@day, @revenue, @orders)',
  )
  const insertConversion = db.prepare(
    'INSERT INTO conversion_trend (day, rate) VALUES (@day, @rate)',
  )
  const insertStat = db.prepare(
    'INSERT INTO stats (label, value, delta, up) VALUES (@label, @value, @delta, @up)',
  )

  const seedAll = db.transaction(() => {
    const customers = [
      { id: 'C-201', name: 'Hamza Sheikh', email: 'hamza9@gmail.com', orders: 12, spent: 1420.5 },
      { id: 'C-202', name: 'Ayesha Khan', email: 'ayesha10@gmail.com', orders: 4, spent: 310.0 },
      { id: 'C-203', name: 'Bilal Ahmed', email: 'bilal12@gmail.com', orders: 21, spent: 2870.75 },
      { id: 'C-204', name: 'Sana Malik', email: 'sana123@gmail.com', orders: 7, spent: 640.2 },
      { id: 'C-205', name: 'Usman Tariq', email: 'usman567@gmail.com', orders: 15, spent: 1980.0 },
      { id: 'C-206', name: 'Zara Iqbal', email: 'zara098@gmail.com', orders: 2, spent: 114.4 },
    ]
    customers.forEach((c) => insertCustomer.run(c))

    const orders = [
      { id: 'PLS-1042', customer: 'Hamza Sheikh', amount: 128.5, status: 'Paid' },
      { id: 'PLS-1041', customer: 'Ayesha Khan', amount: 64.0, status: 'Pending' },
      { id: 'PLS-1040', customer: 'Bilal Ahmed', amount: 342.75, status: 'Paid' },
      { id: 'PLS-1039', customer: 'Sana Malik', amount: 89.2, status: 'Refunded' },
      { id: 'PLS-1038', customer: 'Usman Tariq', amount: 210.0, status: 'Paid' },
      { id: 'PLS-1037', customer: 'Zara Iqbal', amount: 57.4, status: 'Pending' },
      { id: 'PLS-1036', customer: 'Hamza Sheikh', amount: 76.0, status: 'Paid' },
      { id: 'PLS-1035', customer: 'Fatima Noor', amount: 198.3, status: 'Paid' },
      { id: 'PLS-1034', customer: 'Ali Raza', amount: 44.99, status: 'Pending' },
      { id: 'PLS-1033', customer: 'Ayesha Khan', amount: 132.0, status: 'Refunded' },
      { id: 'PLS-1032', customer: 'Bilal Ahmed', amount: 265.5, status: 'Paid' },
    ]
    orders.forEach((o) => insertOrder.run(o))

    const revenueTrend = [
      { day: 'Mon', revenue: 4200, orders: 38 },
      { day: 'Tue', revenue: 5100, orders: 44 },
      { day: 'Wed', revenue: 4800, orders: 41 },
      { day: 'Thu', revenue: 6300, orders: 52 },
      { day: 'Fri', revenue: 7100, orders: 61 },
      { day: 'Sat', revenue: 8900, orders: 74 },
      { day: 'Sun', revenue: 7600, orders: 65 },
    ]
    revenueTrend.forEach((r) => insertRevenue.run(r))

    const conversionTrend = [
      { day: 'Mon', rate: 2.8 },
      { day: 'Tue', rate: 3.1 },
      { day: 'Wed', rate: 2.9 },
      { day: 'Thu', rate: 3.4 },
      { day: 'Fri', rate: 3.6 },
      { day: 'Sat', rate: 3.9 },
      { day: 'Sun', rate: 3.2 },
    ]
    conversionTrend.forEach((c) => insertConversion.run(c))

    const stats = [
      { label: 'Revenue (7d)', value: '$44,000', delta: '+12.4%', up: 1 },
      { label: 'Orders (7d)', value: '375', delta: '+6.1%', up: 1 },
      { label: 'Conversion rate', value: '3.2%', delta: '-0.3%', up: 0 },
      { label: 'Avg. order value', value: '$117', delta: '+2.8%', up: 1 },
    ]
    stats.forEach((s) => insertStat.run(s))
  })

  seedAll()
  console.log('Seeded pulse.db with initial data')
}

module.exports = db
