import {message} from 'antd'
import axios, {AxiosRequestConfig} from 'axios'

// import {set} from 'lodash'
import {ACCESS_CONTROL_ALLOW_ORIGIN, X_AUTH_TOKEN} from '@/common/http'
// import {LOCALSTORAGE_LANGUAGE_MAP} from '@/common/language'
import {getHeaderAuthToken, logout} from '@/utils'
import getDeviceInfo from '@/utils/device-info'

const cancelToken = axios.CancelToken
let source = cancelToken.source()
const REQUEST_CANCELED_TEXT = 'request canceled'
const responseTypeBlob = 'blob'

const cancelRequestAndRecoverRequest = () => {
  //  取消请求
  source.cancel(REQUEST_CANCELED_TEXT)
  //  恢复请求
  setTimeout(() => {
    logout()
    source = cancelToken.source()
  }, 1000)
}

const deviceInfo = getDeviceInfo()

//默认请求超时时间
const timeout = 30000

//创建axios实例
const service = axios.create({
  timeout,
  // baseURL: window.globalConfig.api,
  //如需要携带cookie 该值需设为true
  withCredentials: true,
})

//统一请求拦截 可配置自定义headers 例如 language、token等
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    //配置自定义请求头
    let token = getHeaderAuthToken()
    const tokenHeader: IDynamicMap = {
      ...deviceInfo,
    }
    // const activeLanguage = getLanguage() || ''
    // const {key: activeLanguageKey} = LOCALSTORAGE_LANGUAGE_MAP[activeLanguage] || {}

    // 默认token
    // tokenHeader[X_AUTH_TOKEN] = JSON.stringify({
    //   uid: '',
    //   timestamp: 0,
    //   token: '',
    //   client: 'web',
    //   version: '',
    //   language: activeLanguageKey || 'zh',
    // })
    if (token) {
      // if (activeLanguage) {
      //   // 处理页面切换中英文
      //   const newToken = JSON.parse(token)

      //   set(newToken, 'language', activeLanguageKey)
      //   // token = JSON.stringify(newToken)
      // }
      tokenHeader[X_AUTH_TOKEN] = token
    }

    const headers = config?.headers || {}
    // config.headers = customHeaders

    //  @ts-ignore
    config.headers = {
      ...headers,
      [ACCESS_CONTROL_ALLOW_ORIGIN]: '*',
      ...tokenHeader,
    }
    config.cancelToken = source.token
    return config
  },
  error => {
    console.log('request error: ', {error})
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // 返回拦截
    return response
  },
  error => {
    // 错误拦截
    if (error.message === REQUEST_CANCELED_TEXT) {
      return
    }
    return error
  }
)

//axios返回格式
interface axiosTypes<T> {
  data: T
  status: number
  statusText: string
}

//核心处理代码 将返回一个promise 调用then将可获取响应的业务数据
const requestHandler = <T>(
  method: 'get' | 'post' | 'put' | 'delete' = 'get',
  url: string,
  query: object = {},
  config: AxiosRequestConfig = {}
): Promise<T> => {
  let response: Promise<axiosTypes<IResponse<T>>>

  response = service({
    method,
    url,
    data: query,
    ...config,
  })

  const {responseType} = config

  return new Promise<T>((resolve, reject) => {
    response
      .then(async (res: axiosTypes<IResponse<T>>) => {
        //业务代码 可根据需求自行处理
        if (!res) {
          return
        }

        const {data: resData, status, statusText} = res

        if (status === 400) {
          throw new Error(statusText)
        } else if (status === 401) {
          //  token过期,重新登录
          cancelRequestAndRecoverRequest()
          await new Promise(resolveItem => {
            setTimeout(() => {
              resolveItem({})
            }, 1000)
          })
          resolve(resData as T | PromiseLike<T>)
          return
        } else if (status === 200) {
          const {code, msg} = resData

          if (code === '00000') {
            // console.log('before resolve')
            resolve(resData as T | PromiseLike<T>)
            return
          }
          if (code === 100002) {
            message.warning(msg)
            cancelRequestAndRecoverRequest()
            await new Promise(resolveItem => {
              setTimeout(() => {
                resolveItem({})
              }, 1000)
            })
            resolve(resData as T | PromiseLike<T>)
            return
          }
          if (responseType === responseTypeBlob) {
            resolve(resData as T | PromiseLike<T>)
            return
          }
          throw new Error(msg)
        }
        if (responseType === responseTypeBlob) {
          resolve(resData as T | PromiseLike<T>)
          return
        }
        throw new Error(statusText)
      })
      .catch(error => {
        console.log({error})
        reject(new Error(error?.response?.statusText || error.message))
      })
  })
}

// // 使用 request 统一调用，包括封装的get、post、put、delete等方法
const request = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('get', url, params, config),
  post: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('post', url, params, config),
  put: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('put', url, params, config),
  delete: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    requestHandler<T>('delete', url, params, config),
}

// 导出至外层，方便统一使用
export {request}
