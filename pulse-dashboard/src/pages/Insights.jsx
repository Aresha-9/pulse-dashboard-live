import { Paper, Typography, Box, Grid, CircularProgress, Alert } from '@mui/material'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { useTheme } from '@mui/material/styles'
import StatCard from '../components/StatCard.jsx'
import { getConversionTrend } from '../api.js'
import { usePolledData } from '../hooks/usePolledData.js'

export default function Insights() {
  const theme = useTheme()
  const c = theme.custom
  const { data: conversionTrend, error, loading } = usePolledData(getConversionTrend)

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} sm={4}>
        <StatCard label="Conversion (7d avg)" value="3.3%" delta="+0.4%" up />
      </Grid>
      <Grid item xs={6} sm={4}>
        <StatCard label="Bounce rate" value="41%" delta="-2.1%" up />
      </Grid>
      <Grid item xs={6} sm={4}>
        <StatCard label="Repeat customers" value="28%" delta="+1.2%" up />
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6">Conversion rate trend</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Daily conversion rate, last 7 days
          </Typography>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error">
              Trend load nahi ho saka — Pulse API chal rahi hai check karein. {error.message}
            </Alert>
          )}

          {!loading && !error && (
            <Box sx={{ width: '100%', height: { xs: 200, sm: 260 } }}>
              <ResponsiveContainer>
                <LineChart data={conversionTrend} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid stroke={c.line} vertical={false} />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: c.mist, fontFamily: 'Sora' }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: c.mist, fontFamily: 'IBM Plex Mono' }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    formatter={(v) => [`${v}%`, 'Conversion']}
                    contentStyle={{ borderRadius: 8, border: `1px solid ${c.line}`, fontFamily: 'Sora', fontSize: 13 }}
                  />
                  <Line type="monotone" dataKey="rate" stroke={c.teal} strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}
