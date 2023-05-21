import moment, {Moment} from 'moment'
import {FC, useEffect, useMemo, useRef} from 'react'

import {LOCALSTORAGE_USER_INFO, LOCALSTORAGE_X_AUTH_TOKEN} from '@/common'
import {getUrlParams} from '@/utils'

import EnergyStorageWrapper from './energy_storage_wrapper'
import GridWrapper from './grid_wrapper'
import HomePage from './home_page'
import styles from './index.module.less'
import PowerPage from './power_page'
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
  const timeRange = useMemo(() => {
    const [timeSrartUnix, timeEndUnix] = JSON.parse(timeRangeStr)
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
  const dateRange: [Moment, Moment] = [moment(), moment()]

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageCenter} ref={reportRef}>
        <HomePage />
        <PowerPage isGrid={isGrid} />
        {isGrid ? (
          <GridWrapper
            id={id}
            title={title}
            currency={currency}
            dateRange={dateRange}
            classification={classification}
            mode={mode}
          />
        ) : (
          <EnergyStorageWrapper
            id={id}
            title={title}
            currency={currency}
            dateRange={dateRange}
            classification={classification}
            mode={mode}
          />
        )}
      </div>
    </div>
  )
}

export default ReportDownload
