import cn from 'classnames'
import React, {useMemo} from 'react'

import styles from './index.module.less'
import icon from './no_data_icon.png'

interface Props {
  // 提示信息
  text?: string
  // 是否使用antd Table无数据显示方式
  useAntdTableStyle?: boolean
  // 指定antd icon样式
  AntIcon?: React.FC
  // 外部容器style
  wrapperStyle?: Record<string, any>
}

const NoData: React.FC<Props> = ({
  text = '',
  useAntdTableStyle = false,
  // AntIcon = SmileOutlined,
  wrapperStyle = {},
}) => {
  const noDataText = useMemo(() => {
    if (text) {
      return text
    }
    // return intl.formatMessage({id: VIEW_BASE_NO_DATA_TEXT})
    return 'No Data'
  }, [text])
  const antNoDataStyle = {fontSize: '12px'}
  const className = cn(styles['no-data-wrapper'])

  const renderedText = useAntdTableStyle ? (
    <p style={antNoDataStyle}>
      <img src={icon} alt={''} />
      <span>{noDataText}</span>
    </p>
  ) : (
    <span>{text}</span>
  )

  return (
    <div className={className} style={wrapperStyle}>
      {renderedText}
    </div>
  )
}

export default NoData
