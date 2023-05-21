export const LOCALSTORAGE_USER_INFO = 'USER_INFO'
export const LOCALSTORAGE_X_AUTH_TOKEN = 'token'

//  主题
export const LOCALSTORAGE_THEME_MODE = 'theme_mode'
export const LOCALSTORAGE_THEME_LIGHT_VALUE = 'light'
export const LOCALSTORAGE_THEME_DARK_VALUE = 'dark'

//change password
export const PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*\d)[^]{6,12}$/

export const DATE_PICKER_TYPE_WEEK = 'week'
export const DATE_PICKER_TYPE_DATE = 'day'
export const DATE_PICKER_TYPE_MONTH = 'month'
export const DATE_PICKER_TYPE_YEAR = 'year'

export const DATE_PICKER_TYPE_MAP = {
  [DATE_PICKER_TYPE_DATE]: {
    format: 'YYYY/MM/DD',
    type: 'dates',
  },
  [DATE_PICKER_TYPE_MONTH]: {
    format: 'YYYY/MM',
    type: 'months',
  },
  [DATE_PICKER_TYPE_YEAR]: {
    format: 'YYYY',
    type: 'years',
  },
}
