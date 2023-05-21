import {isNull, isUndefined} from 'lodash'
import moment from 'moment'

/**
 * 去重方法
 * @param arr
 * @returns
 */
const uniqWithIndex = (arr: any[]) => {
  const r: any[] = []
  const repeats = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const isExist = r.some((it: string) => {
      return it === item
    })
    if (isExist) {
      repeats.push(arr[i])
      continue
    }
    r.push(item)
  }
  return {
    arr: r,
    repeats,
  }
}
//数字分割方法
/**
 *
 * @param str 传入的数字
 * @param split 分隔符,默认,
 * @returns 返回的处理过的数字
 */
const splitByReg3 = (str: string, split?: string) => {
  const re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g
  const splitStr = split || ','
  return str.replace(re, '$1' + splitStr)
}

/**
 *没有空格的单位换算方法,不适用货币,约定返回的数据已经是类似kW,kWh的情况，带k
 * @param power 没有空格的单位换算
 * @param unit 单位 必传
 * @returns 转化过的值
 */
const convertWithNoSpace = (n: number | string, unit: string, decimalNum: number) => {
  // if (n === undefined || unit === undefined) {
  //   // throw new Error("请输入数字和单位");

  // }
  const u = unit
  //默认前面拼装  k
  let pu = 'k'
  if (isNaN(Number(`${n}`))) {
    return `-- ${pu}${u}`
  }
  let number = Number(n)
  if (n >= 1e16 || n <= -1e16) {
    pu = 'E'
    number = number / 1e15
  } else if (n >= 1e13 || n <= -1e13) {
    pu = 'P'
    number = number / 1e12
  } else if (n >= 1e10 || n <= -1e10) {
    pu = 'T'
    number = number / 1e9
  } else if (n >= 1e7 || n <= -1e7) {
    pu = 'G'
    number = number / 1e6
  } else if (n >= 1e4 || n <= -1e4) {
    pu = 'M'
    number = number / 1e3
  }
  // console.log(number.toFixed(decimalNum));
  return number.toFixed(decimalNum) + pu + u
}

/**
 *数字是千位数的单位换算方法，比如kW,kWh,不能用于货币
 * @param num 传入的数字,必传
 * @param unit 单位 必传
 * @param split 分隔符,默认,
 * @param decimalPoint 小数点展示形式,默认.
 * @param decimalNum 保留几位小数，默认2
 */
const cNoSpace = (
  num: number,
  unit: string,
  split?: string,
  decimalPoint?: string,
  decimalNum?: number
) => {
  const decnum = isUndefined(decimalNum) ? 2 : decimalNum
  if (split === decimalPoint || isUndefined(decimalPoint)) {
    return splitByReg3(convertWithNoSpace(num, unit, decnum), split)
  }
  return splitByReg3(convertWithNoSpace(num, unit, decnum), split).replace(
    /(.*)\./g,
    '$1' + decimalPoint
  )
}
/**
 * @description 获取当前时区的时间戳
 * @param timezone 时区
 */
const getCurrentZoneTime = (timeZone: number, date: any) => {
  const offsetGMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
  const time = new Date(date).getTime()
  const targetDate = new Date(time + offsetGMT * 60 * 1000 + timeZone * 60 * 60 * 1000) //当前东八区的时间
  return targetDate.getTime()
}
/**
 *没有空格的单位换算方法,不适用货币,约定返回的数据已经是类似kW,kWh的情况，带k
 * @param power 没有空格的单位换算
 * @param unit 单位 必传
 * @returns 转化过的值
 */
const convertWithMoney = (n: number | string, unit: string, decimalNum: number) => {
  const u = unit
  //默认前面拼装  k
  const pu = ''
  const number = Number(n)
  return number.toFixed(decimalNum) + pu + u
}

/**
 *数字是千位数的单位换算方法，比如kW,kWh,不能用于货币
 * @param num 传入的数字,必传
 * @param unit 单位 必传
 * @param split 分隔符,默认,
 * @param decimalPoint 小数点展示形式,默认.
 * @param decimalNum 保留几位小数，默认2
 */
const cMoney = (
  num: number,
  unit: string,
  split?: string,
  decimalPoint?: string,
  decimalNum?: number
) => {
  const decnum = isUndefined(decimalNum) ? 2 : decimalNum
  if (split === decimalPoint || isUndefined(decimalPoint)) {
    return splitByReg3(convertWithMoney(num, unit, decnum), split)
  }
  return splitByReg3(convertWithMoney(num, unit, decnum), split).replace(
    /(.*)\./g,
    '$1' + decimalPoint
  )
}
/**
 *没有空格的单位换算方法,不适用货币,约定返回的数据已经是类似kW,kWh的情况，带k
 * @param power 没有空格的单位换算
 * @param unit 单位 必传
 * @returns 转化过的值
 */
const convertWithNoK = (n: number | string, unit: string, decimalNum: number) => {
  // if (n === undefined || unit === undefined) {
  //   // throw new Error("请输入数字和单位");

  // }
  const u = unit
  //默认前面拼装  k
  let pu = ''
  if (isNaN(Number(`${n}`))) {
    return `-- ${pu}${u}`
  }
  let number = Number(n)
  if (n >= 1e19 || n <= -1e19) {
    pu = 'E'
    number = number / 1e18
  } else if (n >= 1e16 || n <= -1e16) {
    pu = 'P'
    number = number / 1e15
  } else if (n >= 1e13 || n <= -1e13) {
    pu = 'T'
    number = number / 1e12
  } else if (n >= 1e10 || n <= -1e10) {
    pu = 'G'
    number = number / 1e9
  } else if (n >= 1e7 || n <= -1e7) {
    pu = 'M'
    number = number / 1e6
  } else if (n >= 1e4 || n <= -1e4) {
    pu = 'k'
    number = number / 1e3
  } else if (n >= 1e3 || n <= -1e3) {
    pu = 'k'
    number = number / 1e3
  }

  return number.toFixed(decimalNum) + pu + u
}
/**
 *数字是千位数的单位换算方法，比如kW,kWh,不能用于货币
 * @param num 传入的数字,必传
 * @param unit 单位 必传
 * @param split 分隔符,默认,
 * @param decimalPoint 小数点展示形式,默认.
 * @param decimalNum 保留几位小数，默认2
 */
const cNoK = (
  num: number,
  unit: string,
  split?: string,
  decimalPoint?: string,
  decimalNum?: number
) => {
  const decnum = isUndefined(decimalNum) ? 2 : decimalNum
  if (split === decimalPoint || isUndefined(decimalPoint)) {
    return splitByReg3(convertWithNoK(num, unit, decnum), split)
  }
  return splitByReg3(convertWithNoK(num, unit, decnum), split).replace(
    /(.*)\./g,
    '$1' + decimalPoint
  )
}
export {cMoney, cNoK, cNoSpace, getCurrentZoneTime, splitByReg3, uniqWithIndex}
//momentjs获取2个时间区间的所有时间
export const enumerateDaysBetweenDates = (
  startDate: moment.MomentInput,
  endDate: moment.MomentInput,
  type: 'hour' | 'day' | 'month' | 'year' = 'day'
) => {
  if (type === 'hour') {
    const hours = moment(endDate).format('HH')
    return [hours]
  }
  const daysList = []
  const start = moment(startDate)
  const end = moment(endDate)
  const day = end.diff(start, type)
  daysList.push(start.format('YYYY-MM-DD HH:mm:ss'))
  for (let i = 1; i <= day; i++) {
    daysList.push(start.add(1, type).format('YYYY-MM-DD HH:mm:ss'))
  }
  return daysList
}

export const isEmpty = (value: any) => {
  return isNull(value) || isUndefined(value)
}
