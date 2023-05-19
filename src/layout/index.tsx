import {Button, DatePicker} from 'antd'
import {get} from 'lodash'
import moment from 'moment'
import {ChangeEventHandler, useCallback, useContext, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Link, Outlet} from 'react-router-dom'

import {i18nConfigProviderMap, LOCALSTORAGE_LANGUAGE_MAP} from '@/common/language'
import NavBar from '@/components/navBar'
import {ThemeContext, ThemeContextProvider} from '@/theme/context'

moment.locale('zh-cn')

const Root = () => {
  const {t, i18n} = useTranslation()
  const themeMode = useContext(ThemeContext)

  const changeLanguage: ChangeEventHandler<HTMLSelectElement> = useCallback(e => {
    const value = e.target.value
    i18n.changeLanguage(value)
    const momentLocale = get(i18nConfigProviderMap, [value, 'momentLocale']) || 'en'
    moment.locale(momentLocale)
  }, [])

  const language = i18n.language
  const locale = useMemo(() => i18nConfigProviderMap[language], [language])

  console.log({
    themeMode,
  })
  return (
    <ThemeContextProvider locale={locale}>
      {/* <ConfigProvider locale={locale} prefixCls={`custom-${themeMode}`}> */}
      <div>
        <header>
          <NavBar />
          heder
          {t('home.title')}
          <div>
            <label>语言切换</label>
            <select value={i18n.language} onChange={changeLanguage}>
              {Object.values(LOCALSTORAGE_LANGUAGE_MAP).map(item => {
                return (
                  <option key={item.language} value={item.language}>
                    {item.name}
                  </option>
                )
              })}
            </select>
            <DatePicker />
          </div>
        </header>
        <div>
          <div>
            <Button type="primary">Primary Button</Button>
            <Button>Default Button</Button>
            <Button type="dashed">Dashed Button</Button>
          </div>
          <div>
            <ul>
              <li>
                <Link to={'/'}>home</Link>
              </li>
              <li>
                <Link to={'/app'}>app</Link>
              </li>
              <li>
                <Link to={'/login'}>login</Link>
              </li>
              <li>
                <Link to={'/page'}>page</Link>
              </li>
              <li>
                <Link to={'/404'}>404</Link>
              </li>
              <li>
                <Link to={'/change-password'}>ChangePassword</Link>
              </li>
              <li>
                <Link to={'/report_download'}>report_download</Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
        <footer>footer</footer>
      </div>
      {/* </ConfigProvider> */}
    </ThemeContextProvider>
  )
}

export default Root
