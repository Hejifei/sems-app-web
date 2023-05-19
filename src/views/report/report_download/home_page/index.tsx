import {} from 'react'

import AppIcon from '@/assets/imgs/report/icon_sems+.png'

import PageTitle from '../components/page_title'
import styles from './index.module.less'

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <PageTitle />

      <img className={styles.appIconImg} src={AppIcon} />
      <div className={styles.titleContainer}>PLANT REPORT</div>
      <div className={styles.tableWrapper}>
        <div className={styles.tableLine}>
          <div className={styles.left}>Plant</div>
          <div className={styles.right}>电站名称</div>
        </div>
        <div className={styles.tableLine}>
          <div className={styles.left}>Owner e-mail</div>
          <div className={styles.right}>jifei.he@goodwe.com</div>
        </div>
        <div className={styles.tableLine}>
          <div className={styles.left}>Report cycle</div>
          <div className={styles.right}>Week3(01/16-01/23)-2023</div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
