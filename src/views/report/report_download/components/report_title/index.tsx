import {FC, ReactNode} from 'react'

import styles from './index.module.less'

interface IProps {
  children: ReactNode
}

const ReportTitle: FC<IProps> = ({children}) => {
  return <div className={styles.titleContainer}>{children}</div>
}

export default ReportTitle
