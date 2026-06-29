'use client'

import * as React from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeProviderContext {
  theme: Theme | undefined
  setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeProviderContext | undefined>(undefined)

export function ThemeProvider({ 
  children, 
  defaultTheme = 'dark',
  storageKey = 'theme'
}: { 
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  attribute?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
  enableColorScheme?: boolean
}) {
  const [theme, setTheme] = React.useState<Theme | undefined>(undefined)

  React.useEffect(() => {
    const root = window.document.documentElement
    const savedTheme = localStorage.getItem(storageKey) as Theme || defaultTheme
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(savedTheme)

    // Initial sync
    root.classList.remove('light', 'dark')
    if (savedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(savedTheme)
    }
  }, [defaultTheme, storageKey])

  const value = React.useMemo(() => ({
    theme,
    setTheme: (newTheme: Theme) => {
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      
      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        root.classList.add(systemTheme)
      } else {
        root.classList.add(newTheme)
      }
      
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    }
  }), [theme, storageKey])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')
  return context
}
