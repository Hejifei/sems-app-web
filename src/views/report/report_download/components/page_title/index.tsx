import {} from 'react'

import GoodweIcon from '@/assets/imgs/report/icon_goodwe.png'

import styles from './index.module.less'

const PageTitle = () => {
  return (
    <div className={styles.pageTitleContainer}>
      <img className={styles.logoImg} src={GoodweIcon} />
    </div>
  )
}

export default PageTitle
