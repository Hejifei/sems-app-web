import React from 'react'

import styles from './index.module.less'

export interface IEmptyBlockItem {
  height: number
  page: number
}

interface IProps {
  height: number
  page: number
  isFooter?: boolean
}

const EmptyBlock: React.FC<IProps> = ({height = 0, page = 0, isFooter = false}) => {
  return (
    <div
      className={styles.wrapper}
      style={{height: `${height}px`, display: height ? 'block' : 'none'}}
    >
      <div className={isFooter ? styles.footerPage : styles.page}>{page || ''}</div>
    </div>
  )
}

export default EmptyBlock
