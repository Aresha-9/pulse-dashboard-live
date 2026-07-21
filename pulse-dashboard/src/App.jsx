import { useMemo, useState } from 'react'
import { Box, Stack } from '@mui/material'
import { ThemeProvider, CssBaseline } from '@mui/material'
import Sidebar, { NAV } from './components/Sidebar.jsx'
import TopBar from './components/TopBar.jsx'
import Overview from './pages/Overview.jsx'
import Orders from './pages/Orders.jsx'
import Customers from './pages/Customers.jsx'
import Insights from './pages/Insights.jsx'
import Settings from './pages/Settings.jsx'
import { getTheme } from './theme.js'
import { ColorModeContext } from './context/ColorModeContext.jsx'

const PAGES = {
  overview: Overview,
  orders: Orders,
  customers: Customers,
  insights: Insights,
  settings: Settings,
}

export default function App() {
  const [activePage, setActivePage] = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mode, setMode] = useState('light')

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )

  const theme = useMemo(() => getTheme(mode), [mode])

  const ActivePageComponent = PAGES[activePage]
  const activeLabel = NAV.find((n) => n.key === activePage)?.label || 'Overview'

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Stack direction="row">
          <Sidebar
            activePage={activePage}
            onNavigate={setActivePage}
            mobileOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />

          <Box sx={{ flex: 1, minWidth: 0, bgcolor: 'background.default', minHeight: '100vh' }}>
            <TopBar title={activeLabel} onMenuClick={() => setMobileOpen(true)} />

            <Box sx={{ px: { xs: 2, md: 4 }, pb: 4 }}>
              <ActivePageComponent />
            </Box>
          </Box>
        </Stack>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
