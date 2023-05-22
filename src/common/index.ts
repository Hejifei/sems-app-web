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

/**
 * moment date formate
 */
export const MOMENT_DATE_FORMATE = 'YYYY-MM-DD HH:mm:ss'
export const MOMENT_DATETIME_FORMATE = 'YYYY-MM-DD HH:mm'
export const MOMENT_FORMATE = 'YYYY-MM'
export const MOMENT_DAY_FORMATE = 'YYYY-MM-DD'
export const MOMENT_DAY_NORMAL_FORMATE = 'YYYYMMDD'
export const MOMENT_MONTH_NORMAL_FORMATE = 'YYYYMM'
export const MOMENT_TUM_JSON_VERSION_FORMAT = 'YYYY.MM.DD.HHmmss'
export const MOMENT_TIME_FORMATE = 'HH:mm'
export const MOMENT_TIME_FORMATE_NO_FORMAT = 'HHmm'
export const MOMENT_TIME_HMS_FORMATE = 'HH:mm:ss'
export const MOMENT_RFC3339_FROMATE = 'YYYY-MM-DDTHH:mm:ssZ'
export const MOMENT_MONTH_DAY_FORMATE = 'MM/DD'
export const MOMENT_YEAR_MONTH_FORMATE = 'YYYY/MM'
