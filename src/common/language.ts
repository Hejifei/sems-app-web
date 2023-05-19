import enGB from 'antd/es/locale/en_GB'
import zhCN from 'antd/es/locale/zh_CN'
import {Locale} from 'antd/lib/locale-provider'

// 语言
export const LOCALSTORAGE_LANGUAGE_ZH = 'zh-CN'
export const LOCALSTORAGE_LANGUAGE_EN = 'en-US'
/**
 * name           显示
 * key            接口定义 语言key
 * language       i18n 语言key
 * momentLocale   moment语言key
 */
export const LOCALSTORAGE_LANGUAGE_MAP: Record<string, ILocalstorageLanguageItem> = {
  [LOCALSTORAGE_LANGUAGE_ZH]: {
    name: '中文',
    key: 'zh',
    language: LOCALSTORAGE_LANGUAGE_ZH,
    momentLocale: 'zh-cn',
  },
  [LOCALSTORAGE_LANGUAGE_EN]: {
    name: 'English',
    key: 'en',
    language: LOCALSTORAGE_LANGUAGE_EN,
    momentLocale: 'en',
  },
}

export const i18nConfigProviderMap: Record<string, Locale> = {
  [LOCALSTORAGE_LANGUAGE_ZH]: zhCN,
  [LOCALSTORAGE_LANGUAGE_EN]: enGB,
}
