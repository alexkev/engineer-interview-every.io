import { useCallback, useEffect, useState } from "react"
import { useTheme } from '@/components/theme-provider'
import { ThemeToggleButton, useThemeTransition } from "@/components/ui/theme-toggle-button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const { startTransition } = useThemeTransition()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    startTransition(() => {
      setTheme(newTheme)
    })
  }, [theme, setTheme, startTransition])

  // Get the current theme, defaulting to light if system
  const currentTheme = theme === 'system' ? 'light' : theme as 'light' | 'dark'

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <ThemeToggleButton 
        theme={currentTheme}
        onClick={handleThemeToggle}
        variant="circle-blur"
        start="top-right"
      />
    </div>
  )
}