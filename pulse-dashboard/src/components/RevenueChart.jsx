import { Paper, Typography, Box } from '@mui/material'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts'
import { useTheme } from '@mui/material/styles'

export default function RevenueChart({ data }) {
  const theme = useTheme()
  const c = theme.custom

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant="h6">Revenue trend</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Daily revenue, last 7 days
      </Typography>

      <Box sx={{ width: '100%', height: { xs: 200, sm: 260 } }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.coral} stopOpacity={0.35} />
                <stop offset="100%" stopColor={c.coral} stopOpacity={0} />
              </linearGradient>
            </defs>
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
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']}
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${c.line}`,
                fontFamily: 'Sora',
                fontSize: 13,
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={c.coral}
              strokeWidth={2.5}
              fill="url(#revFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  )
}
