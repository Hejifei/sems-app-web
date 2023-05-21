import {Empty} from 'antd'
import * as echarts from 'echarts'
import {FC, useCallback, useMemo, useRef} from 'react'

import emptyImage from '@/assets/imgs/no-data.png'
import Charts from '@/components/charts'
import useNumberFormat from '@/hooks/useNumberFormat'

import {parseChartoptionData} from '../../util'
import style from './index.module.less'

const bar_chart_color_list = [
  ['rgba(0, 97, 244, 0.62)', 'rgba(56, 116, 206, 0)'],
  ['rgba(0, 197, 78, 0.80)', 'rgba(0, 210, 14, 0)'],
  ['rgba(255, 190, 0, 0.80)', 'rgba(255, 190, 0, 0)'],
  ['rgba(207, 133, 255, 0.80)', 'rgba(220, 80, 255, 0)'],
  ['rgba(255, 122, 25, 0.80)', 'rgba(255, 158, 114, 0)'],
]

interface IProps {
  isMultiDeviceQuery: boolean
  onDbPress?: () => {}
  // batchDeviceECurvesData: IReport.IBatchDeviceECurvesResponseDataItem[];
  // elcStatisticsData?: IReport.IElcStatisticsResponse;
  lineChartData?: {
    name: string
    dataList: {
      date: string
      value: number
    }[]
  }[]
  pieChartData?: {
    name: string
    dataList: {
      date: string
      value: number
    }[]
  }[]
  formatter?: (params: any) => string
}

const GenerationChart: FC<IProps> = props => {
  const {getNumber} = useNumberFormat()
  const {
    // batchDeviceECurvesData,
    isMultiDeviceQuery,
    // elcStatisticsData,
    lineChartData = [],
    pieChartData = [],
    formatter,
  } = props

  const chartRef = useRef<any>()

  // const getTooltipPosition = useCallback(
  //   (
  //     point: Array<number>,
  //     params: Object | Array<Object>,
  //     dom: HTMLElement,
  //     rect: Object,
  //     size: {contentSize: Array<number>; viewSize: Array<number>}
  //   ) => {
  //     // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
  //     // 提示框位置
  //     let x = 0 // x坐标位置
  //     let y = 0 // y坐标位置

  //     // 当前鼠标位置
  //     const pointX = point[0]
  //     const pointY = point[1]

  //     // 外层div大小
  //     // var viewWidth = size.viewSize[0];
  //     // var viewHeight = size.viewSize[1];

  //     // 提示框大小
  //     const boxWidth = size.contentSize[0]
  //     const boxHeight = size.contentSize[1]

  //     // boxWidth > pointX 说明鼠标左边放不下提示框
  //     if (boxWidth > pointX) {
  //       x = 30
  //     } else {
  //       // 左边放的下
  //       x = pointX - boxWidth
  //     }

  //     // boxHeight > pointY 说明鼠标上边放不下提示框
  //     if (boxHeight > pointY) {
  //       y = 30
  //     } else {
  //       // 上边放得下
  //       y = pointY - boxHeight
  //     }

  //     return [x, y]
  //   },
  //   []
  // )

  const getMultiDeviceQueryTooltipFormatter = useCallback((params: any) => {
    let str = ''
    const snList: string[] = []
    const paramMap: Record<string, any> = {}
    params.forEach((item: any) => {
      const {seriesName, seriesType} = item
      if (!Object.keys(paramMap).includes(seriesName)) {
        paramMap[seriesName] = {}
      }
      paramMap[seriesName][seriesType] = item
      if (!snList.includes(seriesName)) {
        snList.push(seriesName)
      }
    })
    snList.forEach((sn, index) => {
      const eData = paramMap[sn]?.line
      const incomeData = paramMap[sn]?.bar
      const eValue = eData?.data?.toFixed(2)
      const incomeValue = incomeData?.data?.toFixed(2)
      if (index === 0) {
        str += `${eData.axisValueLabel}<br/>`
      }
      str += `${eData.marker}${eData.seriesName}<br/>`
      // str += `production: ${eValue}<br/>`;
      // str += `income: ${incomeValue}<br/>`;
      if (eData) {
        str += '<div style="text-align:left">'
        str += '<span style="display:inline-block;width:100px;">production</span>'
        str +=
          '<span style="display:inline-block;text-align:right;width:80px;">' + eValue + '</span>'
        str += '</div>'
      }
      if (incomeData) {
        str += '<div style="text-align:left">'
        str += '<span style="display:inline-block;width:100px;">income</span>'
        str +=
          '<span style="display:inline-block;text-align:right;width:80px;">' +
          incomeValue +
          '</span>'
        str += '</div>'
      }
    })
    return str
  }, [])

  const getPlantQueryTooltipFormatter = useCallback((params: any) => {
    let str = ''
    params.forEach((item: any, index: number) => {
      const value = item.data.toFixed(2)
      if (index === 0) {
        str += `${item.axisValueLabel}<br/>`
      }
      str += '<div style="text-align:left">'
      str +=
        '<span style="display:inline-block;width:100px;">' +
        item.marker +
        item.seriesName +
        '</span>'
      str += '<span style="display:inline-block;text-align:right;width:80px;">' + value + '</span>'
      str += '</div>'
    })
    return str
  }, [])

  const option = useMemo(() => {
    // const xAxisDataList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    // const legendDataList = ["xxx1", "xxx2"];
    const xAxisDataList: string[] = []
    const legendDataList: string[] = []

    const seriesDataList: any[] = []
    lineChartData.forEach(({name, dataList}, index) => {
      legendDataList.push(name)
      const lineSeriesData = dataList.map(({date, value}) => {
        if (index === 0) {
          xAxisDataList.push(date.split(' ')[0])
        }
        // return [date.split(" ")[0], val];
        return value
      })
      seriesDataList.push({
        name,
        tooltip: {
          valueFormatter: function (value: number) {
            return value + ' 单位'
          },
        },
        type: 'line',
        barMaxWidth: 6,
        smooth: true,
        symbol: 'none',
        areaStyle:
          lineChartData.length === 1
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
        data: lineSeriesData,
      })
    })
    pieChartData.forEach(({name, dataList}, index) => {
      if (!legendDataList.includes(name)) {
        legendDataList.push(name)
      }
      const barSeriesData = dataList.map(({value, date}) => {
        if (lineChartData.length === 0 && index === 0) {
          xAxisDataList.push(date.split(' ')[0])
        }
        return value
      })
      seriesDataList.push({
        name,
        type: 'bar',
        barMaxWidth: 6,
        itemStyle: {
          color:
            pieChartData.length === 1
              ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: 'rgba(255, 190, 0, 0.80)'},
                  {offset: 1, color: 'rgba(255, 190, 0, 0)'},
                ])
              : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {offset: 0, color: bar_chart_color_list[index][0]},
                  {offset: 1, color: bar_chart_color_list[index][1]},
                ]),
          borderWidth: 1,
          borderRadius: [10, 10, 0, 0],
        },
        // data: [10, 20, 30, 40, 50, 60, 70],
        data: barSeriesData,
      })
    })

    const optionData: echarts.EChartOption = {
      tooltip: {
        trigger: 'axis',
        // position: getTooltipPosition,
        formatter:
          formatter ||
          (isMultiDeviceQuery
            ? getMultiDeviceQueryTooltipFormatter
            : getPlantQueryTooltipFormatter),
      },
      grid: {
        left: '5',
        right: '5',
        bottom: '1%',
        containLabel: true,
      },
      legend: {
        data: legendDataList,
        // itemWidth: 25,
        icon: 'roundRect',
        left: 5,
      },
      xAxis: {
        type: 'category',
        data: xAxisDataList,
      },
      yAxis: {
        type: 'value',
      },
      series: seriesDataList,
    }
    return parseChartoptionData(optionData)
  }, [lineChartData, pieChartData, getNumber, isMultiDeviceQuery])

  return (
    <div className={style.container}>
      {lineChartData.length === 0 && pieChartData.length === 0 ? (
        <Empty image={emptyImage} description={'Common_Message_No_Data'} />
      ) : (
        <Charts ref={chartRef} className={style.chartStyle} option={option} />
      )}
    </div>
  )
}

export default GenerationChart
