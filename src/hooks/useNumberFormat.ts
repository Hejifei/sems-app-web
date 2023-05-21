import {cMoney, cNoK, cNoSpace} from '@/utils/common'

import useUserNumFormat from './useUserNumFormat'

// 千分位单位转化
export default function useNumberFormat() {
  // 获取用户信息
  const numFormat = useUserNumFormat()
  const getNumber = (number: number, unit: string) => {
    const value = cNoSpace(
      number,
      unit,
      numFormat.split,
      numFormat.decimalPoint,
      numFormat.decimalNum
    )
    return value
  }
  return {getNumber}
}

//普通单位转化
export function useNormalNumFormat() {
  //获取用户信息
  const numFormat = useUserNumFormat()
  const getNormalNumber = (number: number, unit: string) => {
    const value = cMoney(
      number,
      unit,
      numFormat.split,
      numFormat.decimalPoint,
      numFormat.decimalNum
    )
    return value
  }
  return {getNormalNumber}
}
// 非千分位单位转化
export function useNoThousandFormat() {
  // 获取用户信息
  const numFormat = useUserNumFormat()
  const getNumberWithNoThousand = (number: number, unit: string) => {
    const value = cNoK(number, unit, numFormat.split, numFormat.decimalPoint, numFormat.decimalNum)

    return value
  }
  return {getNumberWithNoThousand}
}
