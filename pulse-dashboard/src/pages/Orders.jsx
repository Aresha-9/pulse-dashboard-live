import { useState } from 'react'
import { Paper, Stack, InputBase, Box, CircularProgress, Alert } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import OrdersTable from '../components/OrdersTable.jsx'
import { getOrders } from '../api.js'
import { usePolledData } from '../hooks/usePolledData.js'

export default function Orders() {
  const [query, setQuery] = useState('')
  // Re-fetches whenever `query` changes, and keeps polling in the background
  // so orders created elsewhere (e.g. a real checkout) show up here live.
  const { data: orders, error, loading } = usePolledData(() => getOrders(query), [query])

  return (
    <Stack spacing={2}>
      <Paper
        elevation={0}
        sx={{
          p: 1,
          px: 2,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          maxWidth: 320,
        }}
      >
        <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        <InputBase
          placeholder="Search by order ID or customer…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{ fontSize: 14 }}
        />
      </Paper>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error">
          Orders load nahi ho sake — Pulse API chal rahi hai check karein. {error.message}
        </Alert>
      )}

      {!loading && !error && (
        <Box>
          <OrdersTable orders={orders} />
        </Box>
      )}
    </Stack>
  )
}
