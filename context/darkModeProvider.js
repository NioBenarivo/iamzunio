import React, { useState, useContext, useEffect } from 'react'

const DarkModeContext = React.createContext({
  darkMode: false,
  toggleMode: () => {},
})

const useDarkmode = () => {
  const [darkmode, setDarkmode] = useState(false)

  const toggleMode = modeValue => {
    setDarkmode(modeValue)
  }

  return [darkmode, toggleMode]
}

const DarkModeProvider = ({ children }) => {
  const [darkmode, toggleMode] = useDarkmode()

  let darkMode = false
  if (typeof window !== 'undefined') {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      darkMode = true
    }

    useEffect(() => {
      toggleMode(darkMode)
    }, [])

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      if (event.matches) {
        toggleMode(true)
      } else {
        toggleMode(false)
      }
    })
  }

  return <DarkModeContext.Provider value={{ darkmode, toggleMode }}>{children}</DarkModeContext.Provider>
}

export default DarkModeProvider
export const useDarkmodeContext = () => useContext(DarkModeContext)