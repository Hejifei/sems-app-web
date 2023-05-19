interface Window {
  globalConfig: {
    api: string
  }
  hejifei: string
  age: number
}

interface IResponse<T> {
  code: number | string
  data: T
  msg: string
}

interface ILocalstorageLanguageItem {
  name: string
  key: string
  language: string
  momentLocale: string
}

/**
 * 动态map数据
 */
type IDynamicMap = Record<string, any>

interface IError {
  code?: number
  info?: object
  data?: any
  message: string
}
