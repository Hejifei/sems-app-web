/* eslint-disable object-curly-spacing */
import {PayloadAction} from '@reduxjs/toolkit'
import {isNull, isPlainObject, isUndefined} from 'lodash'

import {
  LOCALSTORAGE_THEME_DARK_VALUE,
  LOCALSTORAGE_THEME_LIGHT_VALUE,
  LOCALSTORAGE_THEME_MODE,
  LOCALSTORAGE_USER_INFO,
  LOCALSTORAGE_X_AUTH_TOKEN,
} from '@/common'
import {LOCALSTORAGE_LANGUAGE_ZH} from '@/common/language'
import store from '@/store'

/**
 * 触发action
 * @param action
 */
export const dispatchAction = (action: PayloadAction<any> | {type: string}) => {
  store.dispatch(action)
}

/**
 * 获取token值
 * @returns {string}
 */
export const getHeaderAuthToken = () => {
  return localStorage.getItem(LOCALSTORAGE_X_AUTH_TOKEN)
}

/**
 * 获取token值
 * @returns {string}
 */
export const getLanguage = () => {
  return localStorage.getItem('umi_locale') || LOCALSTORAGE_LANGUAGE_ZH
}

// 退出登录
export const logout = () => {
  // TODO
  // const url = '/#/login'
  // clearLoginInfo()
  // window.location.href = url
}

// 获取初始主题模式
export const getBrowserThemeMode = () => {
  // 匹配浏览器的主题
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? LOCALSTORAGE_THEME_LIGHT_VALUE
    : LOCALSTORAGE_THEME_DARK_VALUE
}

/**
 * 获取当前选中主题模式/浏览器当前主题模式
 * @returns string
 */
export const getStorageThemeMode = () => {
  const localThemeMode = localStorage.getItem(LOCALSTORAGE_THEME_MODE)
  return localThemeMode || getBrowserThemeMode()
}

/**
 * 主题保存到浏览器
 * @param value 'light'/'dark'
 */
export const setStorageThemeMode = (value: string) => {
  localStorage.setItem(LOCALSTORAGE_THEME_MODE, value)
}

//获取用户信息
export function getUserInfo(): IAccountModel.ILoginData | null {
  let userInfo
  try {
    const rawJsonData = localStorage.getItem(LOCALSTORAGE_USER_INFO) || ''
    userInfo = JSON.parse(rawJsonData)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
  if (!isPlainObject(userInfo)) {
    return null
  }

  return userInfo
}

export interface IGetEmptyBlockHeightConfig {
  isFooter?: boolean
  isDebug?: boolean
}

export function getEmptyBlockHeight(
  contentRef: React.RefObject<HTMLDivElement>,
  itemRef: React.RefObject<HTMLDivElement>,
  titleHeight: number = 0,
  config: IGetEmptyBlockHeightConfig | undefined,
  parentRef?: React.RefObject<HTMLDivElement>
) {
  const {isFooter = false, isDebug = false} = config || {}
  const page_header_height = 20
  const page_footer_height = 20
  let item_top_box_height = 0

  const contentWidth = contentRef?.current?.offsetWidth || 0
  const content_offsetTop = contentRef?.current?.offsetTop || 0
  const item_parent_offsetTop = parentRef?.current?.offsetTop || 0
  const pageHeight = (contentWidth / 592.28) * 841.89
  const item_offsetTop = (itemRef?.current?.offsetTop || 0) + item_parent_offsetTop
  const item_offsetHeight = itemRef?.current?.offsetHeight || 0
  const item_content_offsetTop = item_offsetTop - content_offsetTop
  const page_index = Math.ceil(item_content_offsetTop / pageHeight)
  const page_end_offsetTop = page_index * pageHeight

  const isContentOutOfPage =
    item_content_offsetTop + item_offsetHeight + page_footer_height > page_end_offsetTop
  const isTitleInPage =
    item_content_offsetTop + titleHeight + page_footer_height <= page_end_offsetTop
  if (isDebug) {
    console.log({
      isFooter,
      isContentOutOfPage,
      isTitleInPage,
      content_offsetTop,
      pageHeight,
      item_parent_offsetTop,
      parentRef,
      item_offsetTop,
      item_offsetHeight,
      item_content_offsetTop,
      contentRef,
      itemRef,
    })
  }
  if (isFooter) {
    item_top_box_height = page_end_offsetTop - item_offsetTop
  } else if (isContentOutOfPage && !(titleHeight && isTitleInPage)) {
    item_top_box_height = page_end_offsetTop - item_content_offsetTop + page_header_height
  }
  if (isDebug) {
    console.log({
      item_top_box_height,
      page_index,
    })
  }
  return {
    height: item_top_box_height,
    page: page_index,
  }
}

export const getUrlParams = () => {
  var url = window.location.href

  // Extract the query string from the URL
  var queryString = url.split('?')[1]

  // Split the query string into individual parameters
  var paramsArray = queryString.split('&')

  // Create an object to store the parameter key-value pairs
  var params: Record<string, string> = {}

  // Loop through the parameters and populate the object
  paramsArray.forEach(function (param) {
    var keyValue = param.split('=')
    var key = decodeURIComponent(keyValue[0])
    var value = decodeURIComponent(keyValue[1])
    params[key] = value
  })
  console.log({
    params,
  })
  return params
}

export const isEmpty = (value: any) => {
  return isNull(value) || isUndefined(value)
}
