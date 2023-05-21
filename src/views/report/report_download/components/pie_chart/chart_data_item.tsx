import {FC} from 'react'

import style from './index.module.less'

interface IProps {
  title: string
  bgColor: string
  value: number
  process: number
}

const ChartDataItem: FC<IProps> = ({title, bgColor, value, process}) => {
  return (
    <div className={style.chartDataItemWrapper}>
      <div className={style.chartDataItemHeader}>
        <div className={style.statusIcon} style={{backgroundColor: bgColor}}></div>
        <label
          style={{
            fontSize: '12px',
          }}
          className={style.itemHeaderTitle}
        >
          {title}
        </label>
      </div>
      <div className={style.chartDataItemValueLine}>
        <div className={style.chartDataItemValueItem}>
          <label className={style.chartDataItemValueItemText}>{value}</label>
          <label className={style.chartDataItemValueItemUnit}>kWh</label>
        </div>

        <div className={style.chartDataItemValueItem}>
          <div className={style.chartDataItemValueItemText}>{process}</div>
          <div className={style.chartDataItemValueItemUnit}>%</div>
        </div>
      </div>
    </div>
  )
}

export default ChartDataItem
