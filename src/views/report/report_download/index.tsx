import {FC, useRef} from 'react'

import HomePage from './home_page'
import styles from './index.module.less'
interface IProps {}

const ReportDownload: FC<IProps> = () => {
  const reportRef = useRef(null)

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageCenter} ref={reportRef}>
        <HomePage />
        reportDownloadPage
      </div>
    </div>
  )
}

export default ReportDownload
