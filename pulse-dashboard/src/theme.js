import { createTheme } from '@mui/material/styles'

// Palette: "Pulse" — a night-shift monitoring desk.
// Deep indigo for structure, coral for signal, teal + amber for data series.
// The sidebar stays indigo in both modes (it already reads as "dark");
// only the main content surface and text shift between light and dark.
const shared = {
  indigo: '#1B1F3B',
  indigoLight: '#2A2F55',
  coral: '#FF6B5B',
  coralDark: '#E4503F',
  teal: '#2FB8AC',
  amber: '#F2B84B',
}

const modePalettes = {
  light: {
    ...shared,
    canvas: '#FAFAF7',
    paper: '#FFFFFF',
    mist: '#8A8FA6',
    line: '#E7E5DE',
    textPrimary: shared.indigo,
    textSecondary: '#8A8FA6',
  },
  dark: {
    ...shared,
    canvas: '#14162C',
    paper: '#1E2140',
    mist: '#9A9FC0',
    line: 'rgba(255,255,255,0.09)',
    textPrimary: '#F4F3F7',
    textSecondary: '#9A9FC0',
  },
}

export function getTheme(mode = 'light') {
  const p = modePalettes[mode] || modePalettes.light

  return createTheme({
    palette: {
      mode,
      primary: { main: p.indigo, light: p.indigoLight, contrastText: '#fff' },
      secondary: { main: p.coral, dark: p.coralDark, contrastText: '#fff' },
      background: { default: p.canvas, paper: p.paper },
      text: { primary: p.textPrimary, secondary: p.textSecondary },
      divider: p.line,
    },
    custom: p,
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: '"Sora", system-ui, sans-serif',
      h1: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
      h2: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
      h3: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
      h4: { fontFamily: '"Sora", sans-serif', fontWeight: 700 },
      h5: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
      h6: { fontFamily: '"Sora", sans-serif', fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
      overline: { fontFamily: '"Sora", sans-serif', letterSpacing: '0.12em', fontWeight: 600 },
      // data/numeral role — monospace, tabular figures
      mono: {
        fontFamily: '"IBM Plex Mono", monospace',
        fontVariantNumeric: 'tabular-nums',
      },
    },
    components: {
      MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
      MuiButton: { styleOverrides: { root: { borderRadius: 8 } } },
    },
  })
}
