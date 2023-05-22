import {get} from 'lodash'
import {Moment} from 'moment'
import {FC, useMemo} from 'react'

import AppIcon from '@/assets/imgs/report/icon_sems+.png'
import {
  DATE_PICKER_TYPE_DATE,
  DATE_PICKER_TYPE_MONTH,
  DATE_PICKER_TYPE_WEEK,
  DATE_PICKER_TYPE_YEAR,
  LOCALSTORAGE_USER_INFO,
  MOMENT_DAY_FORMATE,
  MOMENT_MONTH_DAY_FORMATE,
  MOMENT_YEAR_MONTH_FORMATE,
} from '@/common'

import PageTitle from '../components/page_title'
import styles from './index.module.less'

interface IProps {
  mode: string
  title: string
  timeRange: [Moment, Moment]
}

const HomePage: FC<IProps> = ({title, timeRange, mode}) => {
  const reportCycleText = useMemo(() => {
    const [start, end] = timeRange
    let text = ''
    if (mode === DATE_PICKER_TYPE_DATE) {
      text = `${start.format(MOMENT_DAY_FORMATE)}-${end.format(MOMENT_DAY_FORMATE)}`
    }
    if (mode === DATE_PICKER_TYPE_WEEK) {
      text = `Week${start.week()}(${start.format(MOMENT_MONTH_DAY_FORMATE)}-${end.format(
        MOMENT_MONTH_DAY_FORMATE
      )})-${start.year()}`
    }
    if (mode === DATE_PICKER_TYPE_MONTH) {
      text = `${start.format(MOMENT_YEAR_MONTH_FORMATE)}-${end.format(MOMENT_YEAR_MONTH_FORMATE)}`
    }
    if (mode === DATE_PICKER_TYPE_YEAR) {
      text = `${start.year()}-${end.year()}`
    }
    return text
  }, [timeRange, mode])

  const emailText = useMemo(() => {
    let userInfo = {}
    try {
      userInfo = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_INFO) as string)
    } catch (err) {
      console.log(err)
    }
    return get(userInfo, ['email'])
  }, [])

  return (
    <div className={styles.homeContainer}>
      <PageTitle />

      <img className={styles.appIconImg} src={AppIcon} />
      <div className={styles.titleContainer}>PLANT REPORT</div>
      <div className={styles.tableWrapper}>
        <div className={styles.tableLine}>
          <div className={styles.left}>Plant</div>
          <div className={styles.right}>{title}</div>
        </div>
        <div className={styles.tableLine}>
          <div className={styles.left}>Owner e-mail</div>
          <div className={styles.right}>{emailText}</div>
        </div>
        <div className={styles.tableLine}>
          <div className={styles.left}>Report cycle</div>
          <div className={styles.right}>{reportCycleText}</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
