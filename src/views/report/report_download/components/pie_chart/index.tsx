import {FC, useCallback, useRef} from 'react'

import Charts from '@/components/charts'

import ChartDataItem from './chart_data_item'
import style from './index.module.less'

export interface IPieChartDataItem {
  name: string
  value: number
  color: string
  percent: number
}

export interface IProductionChartData {
  name: string
  dataList: [IPieChartDataItem, IPieChartDataItem]
}

interface IProps {
  ProductionChartData: IProductionChartData[]
}

const PieChart: FC<IProps> = props => {
  const {ProductionChartData} = props

  const chartRef = useRef<any>()

  const getOption = useCallback(
    (name: string, dataList: [IPieChartDataItem, IPieChartDataItem]) => {
      const sum = dataList
        .reduce((sumVal, {value}) => sumVal + parseFloat(`${value}`), 0)
        .toFixed(2)
      const colorList = []
      const seriesDataLIst = dataList.map(({name: seriesName, value, color}) => {
        colorList.push(color)
        return {
          // value: 1048,
          value: value,
          name: seriesName,
          label: {
            normal: {
              show: false,
            },
          },
        }
      })
      const optionData = {
        tooltip: {
          // trigger: 'item',
          show: false,
        },
        legend: {
          top: '5%',
          left: 'center',
          show: false,
        },
        title: {
          text: sum,
          subtext: 'kWh',
          left: 'center',
          // top: "center",
          top: '40%',
          textStyle: {
            color: '#2A304B',
            fontSize: 14,
            fontWeight: 500,
          },
          subtextStyle: {
            color: '#AAACB7',
            fontSize: 12,
            fontWeight: 400,
          },
        },
        color: ['#688CFD', '#4BD8AF'],
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['60%', '80%'],
            // avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            cursor: 'disabled',
            hoverAnimation: false,
            data: seriesDataLIst,
          },
        ],
      }

      return optionData
    },
    []
  )

  return (
    <div className={style.container}>
      {ProductionChartData.map(({name, dataList}) => (
        <div className={style.chartLineWrapper} key={name}>
          <div className={style.leftWrapper}>
            {/* <Empty source={emptyImage} desc={t("Common_Message_No_Data")} /> */}
            <Charts
              ref={chartRef}
              className={style.chartStyle}
              //  @ts-ignore
              option={getOption(name, dataList)}
            />
          </div>
          <div className={style.rightWrapper}>
            {dataList.map(({name: itemName, value, color, percent}) => (
              <ChartDataItem
                key={itemName}
                title={itemName}
                bgColor={color}
                value={value}
                process={percent}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PieChart
