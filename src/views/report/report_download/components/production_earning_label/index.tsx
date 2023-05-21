import {FC, useCallback} from 'react'

import IconEarning from '@/assets/imgs/report/icon_earning.png'
import IconPro from '@/assets/imgs/report/icon_pro.png'
import useNumberFormat from '@/hooks/useNumberFormat'
// import { t } from "i18next";
import {isEmpty} from '@/utils'

import style from './index.module.less'

interface IProps {
  productionValue: number
  earningValue: number
  currency: string
}

const ProductionEarningLabel: FC<IProps> = props => {
  const {getNumber} = useNumberFormat()
  const {currency, productionValue, earningValue} = props

  const fillEmptyValueWithLint = useCallback((value: any) => {
    if (isEmpty(value)) {
      return '--'
    }
    return getNumber(Number(value), '').replace(/[a-z]/gi, '')
  }, [])

  return (
    <div className={style.labelContainer}>
      <div className={style.itemWrapper}>
        <img
          src={IconPro}
          style={{
            width: 14,
            height: 14,
          }}
        />
        <label className={style.valueWrapper}>{fillEmptyValueWithLint(productionValue)}</label>
        <label className={style.unitWrapper}>kWh</label>
      </div>
      <div className={style.itemWrapper}>
        <img
          src={IconEarning}
          style={{
            width: 14,
            height: 14,
          }}
        />
        <label className={style.valueWrapper}>{fillEmptyValueWithLint(earningValue)}</label>
        <label className={style.unitWrapper}>{currency}</label>
      </div>
    </div>
  )
}

export default ProductionEarningLabel
