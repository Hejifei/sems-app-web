import {FC, ReactNode} from 'react'

import PageTitle from '../page_title'
import styles from './index.module.less'

interface IProps {
  title: string
  pageSize: number
  children: ReactNode
}

const ReportPage: FC<IProps> = ({title, children, pageSize = 1}) => {
  return (
    <div className={styles.reportPageContainer}>
      <PageTitle />
      <div className={styles.plantNameWrapper}>{title}</div>
      <div className={styles.container}>{children}</div>
      <div className={styles.pageSizeWrapper}>{pageSize}</div>
    </div>
  )
}

export default ReportPage
