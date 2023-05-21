import {LOCALSTORAGE_USER_INFO} from '@/common'

const DEFAULT_NUM_FORMAT = {
  decimalNum: 2,
  decimalPoint: '.',
  split: ',',
}

/**
 * 获取用户数字展示格式
 */
const useUserNumFormat = () => {
  const userInfo = localStorage.getItem(LOCALSTORAGE_USER_INFO)
  if (userInfo) {
    return JSON.parse(userInfo).numberFormat
  }
  return DEFAULT_NUM_FORMAT
}

export default useUserNumFormat
