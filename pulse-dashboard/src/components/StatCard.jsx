import { Paper, Typography, Stack } from '@mui/material'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded'

export default function StatCard({ label, value, delta, up }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
      }}
    >
      <Typography variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontVariantNumeric: 'tabular-nums',
          fontWeight: 600,
          fontSize: { xs: '1.35rem', sm: '1.7rem' },
          mt: 0.5,
        }}
      >
        {value}
      </Typography>
      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.5 }}>
        {up ? (
          <ArrowUpwardRoundedIcon sx={{ fontSize: 15, color: 'success.main' }} />
        ) : (
          <ArrowDownwardRoundedIcon sx={{ fontSize: 15, color: 'secondary.dark' }} />
        )}
        <Typography
          variant="caption"
          sx={{
            fontFamily: '"IBM Plex Mono", monospace',
            color: up ? 'success.main' : 'secondary.dark',
            fontWeight: 600,
          }}
        >
          {delta}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          vs last week
        </Typography>
      </Stack>
    </Paper>
  )
}
