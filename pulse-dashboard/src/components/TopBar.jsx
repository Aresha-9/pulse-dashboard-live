import { Box, Stack, Typography, InputBase, Avatar, IconButton } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

const SUBTITLES = {
  overview: 'Monday, 20 July — last 7 days',
  orders: 'All orders across every channel',
  customers: 'Everyone who has ever ordered',
  insights: 'Trends behind the numbers',
  settings: 'Workspace and account preferences',
}

export default function TopBar({ title, onMenuClick }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      rowGap={1.5}
      sx={{ px: { xs: 2, md: 4 }, py: 2.5 }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { xs: 'inline-flex', md: 'none' }, mr: 0.5 }}
          aria-label="Open navigation"
        >
          <MenuRoundedIcon />
        </IconButton>
        <Box>
          <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {SUBTITLES[title?.toLowerCase()] || SUBTITLES.overview}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            px: 1.5,
            py: 0.7,
            width: { xs: 140, sm: 220 },
            display: { xs: 'none', sm: 'flex' },
          }}
        >
          <SearchRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
          <InputBase placeholder="Search…" sx={{ fontSize: 14, width: '100%' }} />
        </Stack>
        <IconButton
          sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          aria-label="Search"
        >
          <SearchRoundedIcon fontSize="small" />
        </IconButton>
        <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36, fontSize: 14 }}>AF</Avatar>
      </Stack>
    </Stack>
  )
}
