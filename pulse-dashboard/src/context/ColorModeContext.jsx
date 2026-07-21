import { createContext, useContext } from 'react'

// Provides { mode, toggleColorMode } to any component that needs to
// read or flip the current light/dark mode (e.g. the Settings page switch).
export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
})

export const useColorMode = () => useContext(ColorModeContext)
