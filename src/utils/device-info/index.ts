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
    // traceId: 'c0bb183d-2e63-4d7d-8d31-39465b182d14',
    // 'User-Agent':
    //   'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1_0) AppleWebKit/537.36 (KHTML, like Gecko) ReactNativeDebugger/0.13.0 Chrome/87.0.4280.141 Electron/11.4.6 Safari/537.36',
    uuid: 'E8F2DF73-26DA-4487-958F-EC5657DCD948',
    // uuid: uuidV4().replace(/-/g, ''),
    // deviceId: getDeviceId(),
    // os: `${getSystemName()}-${getSystemVersion()}`,
    // bundleId: getBundleId(),
  }
  return deviceInfo
}

export default getDeviceInfo
