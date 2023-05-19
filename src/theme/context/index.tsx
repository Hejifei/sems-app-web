import {ConfigProvider} from 'antd'
import {Locale} from 'antd/lib/locale-provider'
import {createContext, FC, useCallback, useEffect, useMemo, useState} from 'react'

import {getBrowserThemeMode, getStorageThemeMode, setStorageThemeMode} from '@/utils'
interface ThemeContextType {
  mode: string
  switchMode: (value: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: '',
  switchMode: () => {},
})

interface IProps {
  locale: Locale
  children: JSX.Element
}

// PROVIDER
export const ThemeContextProvider: FC<IProps> = ({locale, children}) => {
  const [mode, setMode] = useState('')

  const switchModeHandler = useCallback((value: string) => {
    const doc = document.querySelector('body')
    if (doc) {
      doc.removeAttribute('class')
      doc.classList.add(value)
      setStorageThemeMode(value)
      setMode(value)
    }
  }, [])

  useEffect(() => {
    const changeColorMode = () => {
      const color = getBrowserThemeMode()
      switchModeHandler(color)
    }

    const matchMediaHandler = window.matchMedia('(prefers-color-scheme: light)')
    matchMediaHandler.addEventListener('change', changeColorMode)

    switchModeHandler(getStorageThemeMode())

    return () => {
      matchMediaHandler.removeEventListener('change', changeColorMode)
    }
  }, [])

  const contextValue: ThemeContextType = useMemo(() => {
    return {
      mode: mode,
      switchMode: switchModeHandler,
    }
  }, [mode])

  console.log({
    mode,
  })
  return (
    // 自定义全局维护的主题
    <ThemeContext.Provider value={contextValue}>
      {/*antd 的主题*/}
      <ConfigProvider prefixCls={`custom-${mode}`} locale={locale}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
