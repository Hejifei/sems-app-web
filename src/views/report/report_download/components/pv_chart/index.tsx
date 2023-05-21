import {Empty} from 'antd'
import * as echarts from 'echarts'
import {FC, useMemo, useRef} from 'react'

import emptyImage from '@/assets/imgs/no-data.png'
import Charts from '@/components/charts'

import {parseChartoptionData} from '../../util'
import style from './index.module.less'

const line_chart_color_list = ['#3874CE', '#6ED104', '#FFBE00', '#DA9EFF', '#FF7A19']

interface Iprops {
  onDbPress?: () => void
  // powerStaticsData: IReport.IPowerStatisticsResponse;
  pvChartData: {
    name: string
    dataList: (string | number)[][]
  }[]
}

const PvChart: FC<Iprops> = props => {
  const {pvChartData} = props

  const chartRef = useRef<any>()

  const option: echarts.EChartOption = useMemo(() => {
    const legendDataList: string[] = []
    const seriesDataList = pvChartData.map(({name, dataList}, index) => {
      legendDataList.push(name)
      return {
        name,
        type: 'line',
        // showSymbol: false,
        symbol: 'none',
        areaStyle:
          pvChartData.length === 1
            ? {
                // 右/下/左/上
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(56, 116, 206, 0.4)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(56, 116, 206, 0)',
                  },
                ]),
              }
            : {},
        smooth: true,
        lineStyle: {
          color: line_chart_color_list[index],
          lineStyle: {
            width: 1,
          },
        },
        data: dataList,
      }
    })
    const optionData: echarts.EChartOption = {
      grid: {
        top: 30,
        left: 5,
        right: '5',
        bottom: '1%',
        containLabel: true,
      },
      legend: {
        data: legendDataList,
        icon: 'roundRect',
        left: 5,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false,
        },
      },
      xAxis: {
        type: 'time',
        // type: 'category',
        splitLine: {
          show: true,
        },
        axisLabel: {
          formatter: {
            // month: '{MMM}',
            //  @ts-ignore
            day: '{MM}/{d}',
            hour: ' ',
            minute: ' ',
            second: ' ',
          },
        },
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        splitLine: {
          show: false,
        },
      },
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        // {
        //   start: 0,
        //   end: 10,
        // },
      ],
      series: seriesDataList,
    }
    return parseChartoptionData(optionData)
  }, [pvChartData])
  return (
    <div className={style.container}>
      {pvChartData.length === 0 ? (
        <Empty image={emptyImage} description={'Common_Message_No_Data'} />
      ) : (
        <Charts
          key={JSON.stringify(option)}
          ref={chartRef}
          className={style.chartStyle}
          option={option}
        />
      )}
    </div>
  )
}

export default PvChart
