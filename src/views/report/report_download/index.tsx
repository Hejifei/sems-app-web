import moment, {Moment} from 'moment'
import {FC, useEffect, useMemo, useRef} from 'react'

import {LOCALSTORAGE_USER_INFO, LOCALSTORAGE_X_AUTH_TOKEN} from '@/common'
import {getUrlParams} from '@/utils'

import EnergyStorageWrapper from './energy_storage_wrapper'
import GridWrapper from './grid_wrapper'
import HomePage from './home_page'
import styles from './index.module.less'
// import PowerPage from './power_page'
interface IProps {}

const ReportDownload: FC<IProps> = () => {
  const reportRef = useRef(null)
  const {
    token,
    userInfo,
    classification,
    currency,
    id,
    mode,
    timeRange: timeRangeStr,
    title,
  } = useMemo(() => getUrlParams(), [])
  const timeRange: [Moment, Moment] = useMemo(() => {
    const [timeSrartUnix, timeEndUnix] = JSON.parse(timeRangeStr)
    console.log({
      timeSrartUnix,
      timeEndUnix,
      start: moment(timeSrartUnix).valueOf(),
      end: moment(timeEndUnix).valueOf(),
    })
    return [moment(timeSrartUnix), moment(timeEndUnix)]
  }, [timeRangeStr])
  console.log({
    classification,
    currency,
    id,
    mode,
    timeRange,
    title,
    token,
    userInfo,
  })

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_USER_INFO, userInfo)
    localStorage.setItem(LOCALSTORAGE_X_AUTH_TOKEN, token)
  }, [])

  //  是否是并网
  const isGrid = useMemo(() => classification.startsWith('Grid'), [classification])
  console.log({
    isGrid,
  })

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageCenter} ref={reportRef}>
        <HomePage title={title} timeRange={timeRange} mode={mode} />
        <div className={styles.pageContainer}>
          {isGrid ? (
            <GridWrapper
              id={id}
              title={title}
              currency={currency}
              dateRange={timeRange}
              classification={classification}
              mode={mode}
            />
          ) : (
            <EnergyStorageWrapper
              id={id}
              title={title}
              currency={currency}
              dateRange={timeRange}
              classification={classification}
              mode={mode}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportDownload
