import { Box, Stack, Typography, List, ListItemButton, ListItemIcon, ListItemText, Drawer } from '@mui/material'
import SpaceDashboardRoundedIcon from '@mui/icons-material/SpaceDashboardRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

export const NAV = [
  { key: 'overview', label: 'Overview', icon: SpaceDashboardRoundedIcon },
  { key: 'orders', label: 'Orders', icon: ReceiptLongRoundedIcon },
  { key: 'customers', label: 'Customers', icon: Groups2RoundedIcon },
  { key: 'insights', label: 'Insights', icon: InsightsRoundedIcon },
  { key: 'settings', label: 'Settings', icon: SettingsRoundedIcon },
]

const SIDEBAR_WIDTH = 240

function SidebarContent({ activePage, onNavigate }) {
  return (
    <Box sx={{ px: 2.5, py: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 4, px: 0.5 }}>
        {/* signature: a live pulse dot */}
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: 'secondary.main',
            boxShadow: '0 0 0 0 rgba(255,107,91,0.7)',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(255,107,91,0.55)' },
              '70%': { boxShadow: '0 0 0 8px rgba(255,107,91,0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(255,107,91,0)' },
            },
          }}
        />
        <Typography variant="h6" sx={{ letterSpacing: '-0.01em' }}>
          Pulse
        </Typography>
      </Stack>

      <List sx={{ flex: 1 }}>
        {NAV.map(({ key, label, icon: Icon }) => {
          const active = activePage === key
          return (
            <ListItemButton
              key={key}
              selected={active}
              onClick={() => onNavigate(key)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                '&.Mui-selected': { bgcolor: 'rgba(255,107,91,0.16)' },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
              }}
            >
              <ListItemIcon sx={{ color: active ? 'secondary.main' : 'inherit', minWidth: 36 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontWeight: active ? 600 : 500, fontSize: 14 }}>
                {label}
              </ListItemText>
            </ListItemButton>
          )
        })}
      </List>

      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', px: 0.5 }}>
        Live · updated just now
      </Typography>
    </Box>
  )
}

export default function Sidebar({ activePage, onNavigate, mobileOpen, onClose }) {
  const handleNavigate = (key) => {
    onNavigate(key)
    onClose()
  }

  return (
    <>
      {/* Permanent sidebar on desktop */}
      <Box
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          bgcolor: 'primary.main',
          color: '#fff',
          display: { xs: 'none', md: 'block' },
          minHeight: '100vh',
        }}
      >
        <SidebarContent activePage={activePage} onNavigate={handleNavigate} />
      </Box>

      {/* Slide-over drawer on mobile/tablet */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            bgcolor: 'primary.main',
            color: '#fff',
          },
        }}
      >
        <SidebarContent activePage={activePage} onNavigate={handleNavigate} />
      </Drawer>
    </>
  )
}

export { SIDEBAR_WIDTH }
