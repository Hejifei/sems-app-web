// import {get, isPlainObject} from 'lodash'

import {request} from '@/utils/request'

/**
 * @see
 * index      GET       /       列表
 * show       GET       /:id    详情
 * create     POST      /       创建
 * update     PUT       /:id    更新
 * destroy    DETELE    /:id    删除
 */
const plant = {
  prefix: '/api/secp-sems-plant',

  uploadAvatar: {
    post: '/upload-avatar',
  },
  getDeviceType: {
    get: '/device/type',
  },

  classification: {
    get: '/classification',
  },
  check: {
    post: '/check',
  },
  checkStep1: {
    post: '/device/check-device',
  },
  defaultImage: {
    get: '/default-image',
  },
  create: {
    post: '/create',
  },
  plantList: {
    post: '/plant-info',
  },
  veryLocation: {
    post: '/check-location',
  },
  defaultName: {
    get: '/default-name',
  },
  overtime: {
    get: '/overtime',
  },
  getDeviceTypeSN: {
    get: '/device/type/{sn}',
  },

  filterPlantInfo: {
    post: 'filter/attribute/plant-info',
  },
  getWarningList: {
    post: '/warning/page',
  },
  getWarningDetail: {
    get: '/warning/detail/{id}',
  },
  getInverterPower: {
    get: '/plant-interval-power',
  },
  // getTotalPower: {
  //   get: "/plant-interval-power",
  // },
  getYieldRevenue: {
    get: '/plant-yield-revenue',
  },
  getDeviceList: {
    post: '/device/search',
  },
  statusCount: {
    get: '/status-count',
  },
  deviceDetail: {
    get: 'device/detail/{id}',
  },
  deviceEdit: {
    put: '/device/edit',
  },
  energyFlowApi: {
    get: '/{stationId}/power/flow',
  },
  getBackgroundInfo: {
    get: '/monitor/background-info/{stationId}',
  },
  addPlantCollect: {
    post: '/plant-collect/add',
  },
  deletePlantCollect: {
    delete: '/plant-collect/delete',
  },
  editHeadPortrait: {
    post: '/head-portrait/edit',
  },
  monitorYieldRevenue: {
    post: '/monitor/yield-revenue',
  },
  getElcStatistics: {
    post: '/elc/statistics',
  },
  getPowerStatistics: {
    post: '/power/statistics',
  },
  getDeviceElcStatistics: {
    post: '/device/elc/statistics',
  },
  getDevicePowerStatistics: {
    post: '/device/power/statistics',
  },
  monitoRenergyStatistics: {
    post: '/monitor/energy-statistics',
  },
  favoriteListApi: {
    post: '/plant-collect/list',
  },
  replaceDevice: {
    put: '/device/replace',
  },
  addDevice: {
    post: '/device/add',
  },
  replaceDeviceHistory: {
    get: '/device/record-list/{plantId}',
  },
  deleteDevice: {
    post: '/device/delete/{deviceId}',
  },
  // http://test.sems.192.168.221.92.nip.io/api/secp-sems-plant/doc.html#/%E5%90%8E%E5%8F%B0-%E7%94%B5%E7%AB%99%E7%AE%A1%E7%90%86/%E5%91%8A%E8%AD%A6/warningCountUsingGET
  getAlarmCount: {
    get: '/warning/count',
  },
  // http://test.sems.192.168.221.92.nip.io/api/secp-sems-plant/doc.html#/%E5%90%8E%E5%8F%B0-%E7%94%B5%E7%AB%99%E7%AE%A1%E7%90%86/%E5%91%8A%E8%AD%A6/pageWarningInfoUsingPOST
  getAlarmList: {
    post: '/warning/page',
  },
  // http://test.sems.192.168.221.92.nip.io/api/secp-sems-plant/doc.html#/%E5%90%8E%E5%8F%B0-%E7%94%B5%E7%AB%99%E7%AE%A1%E7%90%86/%E5%91%8A%E8%AD%A6/markReadUsingPOST
  markRead: {
    post: '/warning/mark-read',
  },
  getRadiationIntensity: {
    get: '/env/radiation-intensity/statistics/station/{stationId}',
  },
  getIrradiation: {
    get: '/env/irradiation/statistics/station/{stationId}',
  },
  getEnvIndicator: {
    get: '/env/indicator/station/{stationId}',
  },
  /** {@link http://dev.sems.192.168.221.92.nip.io/api/secp-sems-plant/doc.html#/后台-电站管理/环测/detectUsingGET} */
  getEnvDeviceFromDatalog: {
    get: '/env/detect?sn={sn}',
  },
  /** {@link http://dev.sems.192.168.221.92.nip.io/api/secp-sems-plant/doc.html#/后台-电站管理/环测/addUsingPOST} */
  postEnvAdd: {
    post: '/env/add',
  },
  /** {@link http://test.sems.192.168.221.92.nip.io/api/secp-sems-plant/doc.html#/%E5%90%8E%E5%8F%B0-%E7%94%B5%E7%AB%99%E7%AE%A1%E7%90%86/%E8%AE%BE%E5%A4%87/getDeviceFilterConfigUsingPOST} */
  getDeviceFilterConfig: {
    post: '/device/device-filter/config',
  },
  deviceList: {
    get: '/device/list',
  },
  /** {@link http://test.sems.192.168.221.92.nip.io/api/secp-sems-plant/doc.html#/%E5%90%8E%E5%8F%B0-%E7%94%B5%E7%AB%99%E7%AE%A1%E7%90%86/%E8%AE%BE%E5%A4%87/getPlantOwnerUsingGET} */
  getEmailBySn: {
    post: '/device/plant-owner',
  },
  paramList: {
    get: '/remote-ctrl/setting-info?sn={sn}',
  },
  controlSetting: {
    post: '/remote-ctrl/enable-setting',
  },
  safetyCountry: {
    get: '/remote-ctrl/safety-country',
  },
}

export async function getElcStatisticsRequest(params: any) {
  const res = await request.post(plant.prefix + plant.getElcStatistics.post, params)
  // let data = get(res, 'data')

  // if (!isPlainObject(data)) {
  //   data = {}
  // }
  return res
}

export async function fetchInverterList(params: any) {
  let queryStr = '?'
  Object.keys(params).forEach((key, index) => {
    if (index !== 0) {
      queryStr = queryStr + '&'
    }
    queryStr = queryStr + `${key}=${params[key]}`
  })
  const res = await request.get(plant.prefix + plant.deviceList.get + queryStr, params)
  // let data = get(res, 'data')

  // if (!isPlainObject(data)) {
  //   data = {}
  // }
  return res
}

export async function getPowerStatisticsRequest(params: any) {
  const res = await request.post(plant.prefix + plant.getPowerStatistics.post, params)
  // let data = get(res, 'data')

  // if (!isPlainObject(data)) {
  //   data = {}
  // }
  return res
}

export default plant
