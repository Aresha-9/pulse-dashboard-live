import {
  Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Chip, Box,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

const STATUS_COLOR = {
  Paid: 'sage',
  Pending: 'amber',
  Refunded: 'coral',
}

// success/warning aren't in the custom palette, map to closest sensible tone
const FALLBACK = { sage: '#2FB8AC', amber: '#F2B84B', coral: '#FF6B5B' }

export default function OrdersTable({ orders }) {
  const theme = useTheme()

  return (
    <Paper
      elevation={0}
      sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Recent orders
      </Typography>

      <Box sx={{ overflowX: 'auto' }}>
      <Table size="small" sx={{ minWidth: 420 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Order</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Amount
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="right">
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((o) => {
            const color = FALLBACK[STATUS_COLOR[o.status]] || theme.custom.mist
            return (
              <TableRow key={o.id} hover>
                <TableCell
                  sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13 }}
                >
                  {o.id}
                </TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell
                  align="right"
                  sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13 }}
                >
                  ${o.amount.toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Chip
                    size="small"
                    label={o.status}
                    sx={{ bgcolor: `${color}22`, color, fontWeight: 600 }}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </Box>
    </Paper>
  )
}
