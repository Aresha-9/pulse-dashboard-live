import { Grid, Box, CircularProgress, Alert } from '@mui/material'
import StatCard from '../components/StatCard.jsx'
import RevenueChart from '../components/RevenueChart.jsx'
import OrdersTable from '../components/OrdersTable.jsx'
import { getStats, getRevenueTrend, getOrders } from '../api.js'
import { usePolledData } from '../hooks/usePolledData.js'

export default function Overview() {
  const stats = usePolledData(getStats)
  const revenueTrend = usePolledData(getRevenueTrend)
  const orders = usePolledData(getOrders)

  const loading = stats.loading || revenueTrend.loading || orders.loading
  const error = stats.error || revenueTrend.error || orders.error

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity="error">
        Live data load nahi ho saka — check karein ke Pulse API (pulse-api folder) chal rahi hai.
        <br />
        {error.message}
      </Alert>
    )
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.data.map((s) => (
          <Grid item xs={6} sm={6} md={3} key={s.label}>
            <StatCard {...s} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <RevenueChart data={revenueTrend.data} />
        </Grid>
        <Grid item xs={12} md={5}>
          <OrdersTable orders={orders.data.slice(0, 5)} />
        </Grid>
      </Grid>
    </>
  )
}
