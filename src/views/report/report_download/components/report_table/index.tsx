import {Table} from 'antd'
import {ColumnsType} from 'antd/lib/table'
import {GetRowKey} from 'antd/lib/table/interface'
import {FC} from 'react'

import style from './index.module.less'

interface IProps {
  rowKey?: string | GetRowKey<any>
  columns?: ColumnsType<any>
  data: any[]
}

const ReportTable: FC<IProps> = ({columns, data, rowKey}) => {
  return (
    <div className={style.tableContainer}>
      <Table rowKey={rowKey} columns={columns} dataSource={data} pagination={false} />
    </div>
  )
}

export default ReportTable
