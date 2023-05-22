// import uuidV4 from 'uuid/v4'

import {DeviceInfo} from './dto'

// export interface DeviceInfo {
//   appVersion: string
//   uuid: string
//   deviceId: string
//   os: string
//   bundleId: string

const getDeviceInfo = () => {
  const deviceInfo: DeviceInfo = {
    appVersion: '0.0.1',
    os: 'iOS-16.2',
    deviceId: 'iPhone14,5',
    bundleId: 'om.goodwe.semscn',
    uuid: 'E8F2DF73-26DA-4487-958F-EC5657DCD948',
  }
  return deviceInfo
}

export default getDeviceInfo
