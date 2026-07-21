import { useState } from 'react'
import {
  Paper, Typography, Stack, TextField, Switch, FormControlLabel, Button, Divider,
} from '@mui/material'
import { useColorMode } from '../context/ColorModeContext.jsx'

export default function Settings() {
  const [saved, setSaved] = useState(false)
  const { mode, toggleColorMode } = useColorMode()

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', maxWidth: 480 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Workspace settings
      </Typography>

      <Stack spacing={2.5}>
        <TextField label="Workspace name" defaultValue="Pulse" fullWidth size="small" />
        <TextField label="Admin email" defaultValue="areshafarooq988@gmail.com" fullWidth size="small" />

        <Divider />

        <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Email weekly summary" />
        <FormControlLabel control={<Switch defaultChecked color="secondary" />} label="Live order notifications" />
        <FormControlLabel
          control={<Switch checked={mode === 'dark'} onChange={toggleColorMode} color="secondary" />}
          label="Dark mode"
        />

        <Button
          variant="contained"
          color="secondary"
          sx={{ alignSelf: 'flex-start' }}
          onClick={() => setSaved(true)}
        >
          {saved ? 'Saved ✓' : 'Save changes'}
        </Button>
      </Stack>
    </Paper>
  )
}
