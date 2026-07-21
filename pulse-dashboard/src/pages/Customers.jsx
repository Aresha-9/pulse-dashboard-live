import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Stack, Box, CircularProgress, Alert } from '@mui/material'
import { getCustomers } from '../api.js'
import { usePolledData } from '../hooks/usePolledData.js'

export default function Customers() {
  const { data: customers, error, loading } = usePolledData(getCustomers)

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
        Customers load nahi ho sake — Pulse API chal rahi hai check karein. {error.message}
      </Alert>
    )
  }

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        All customers
      </Typography>

      <Box sx={{ overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 480 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Orders</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">Total spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((c) => (
              <TableRow key={c.id} hover>
                <TableCell>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <Avatar sx={{ width: 30, height: 30, fontSize: 13, bgcolor: 'primary.main' }}>
                      {c.name.split(' ').map((n) => n[0]).join('')}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {c.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>{c.email}</TableCell>
                <TableCell align="right" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13 }}>
                  {c.orders}
                </TableCell>
                <TableCell align="right" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 13 }}>
                  ${c.spent.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  )
}
