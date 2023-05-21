import {get, isPlainObject} from 'lodash'

import {request} from '@/utils/request'
/**
 * @see
 * index      GET       /       列表
 * show       GET       /:id    详情
 * create     POST      /       创建
 * update     PUT       /:id    更新
 * destroy    DETELE    /:id    删除
 */
const report = {
  prefix: '/api/secp-sems-plant',

  getReportStationEStatics: {
    post: '/report/station/e/statistics',
  },

  getReportStationBatchDeviceECurves: {
    post: '/report/station/batch/device/e/curves',
  },
  // 报表中心列表
  reportPlantList: {
    post: '/report/station/page',
  },
  // 订阅日周月
  subscribe: {
    post: '/message/subscribe',
  },

  // 获取订阅配置
  getCategory: {
    get: '/message/config/{category}',
  },
  /**获取推送消息 分页 */
  getPushMessage: {
    post: '/report/station/push-message/page',
  },
  getReportStationBatchDevicePowerCurves: {
    post: '/report/station/batch/device/power/curves',
  },
  /** 获取账单信息 */
  getBilling: {
    post: '/report/station/bill/page',
  },
}

export async function getReportStationBatchDevicePowerCurvesRequest(params: any) {
  const res = await request.post(
    report.prefix + report.getReportStationBatchDevicePowerCurves.post,
    params
  )
  let data = get(res, 'data')

  if (!isPlainObject(data)) {
    data = {}
  }
  return data
}

export async function getReportStationEStaticsRequest(params: any) {
  const res = await request.post(report.prefix + report.getReportStationEStatics.post, params)
  let data = get(res, 'data')

  if (!isPlainObject(data)) {
    data = {}
  }
  return data
}

export async function getReportStationBatchDeviceECurvesRequest(params: any) {
  const res = await request.post(
    report.prefix + report.getReportStationBatchDeviceECurves.post,
    params
  )
  let data = get(res, 'data')

  if (!isPlainObject(data)) {
    data = {}
  }
  return data
}

export default report
