import type echarts from 'echarts'
import {get, isArray, set} from 'lodash'

const Colors = {
  txtHint: '#aaacb7',
  txtDesc: '#bfc1c9',
}

const Dimension = {
  fontSmaller: 10,
}

export function parseChartoptionData(optionData: echarts.EChartOption) {
  const {series = [], legend, xAxis, yAxis} = optionData
  const axisLabelX = get(xAxis, 'axisLabel', {})
  const axisLabelY = get(yAxis, 'axisLabel', {})

  // series
  if (isArray(series)) {
    series.map((item: object) => {
      set(item, ['lineStyle', 'width'], 1)
      return item
    })
    set(optionData, ['series'], series)
  }

  // legend
  const {textStyle = {}} = legend || {}
  const newLegend = {
    ...legend,
    left: 0,
    top: 3,
    itemWidth: 10,
    itemHeight: 2,
    itemGap: 12,
    textStyle: {
      color: Colors.txtHint,
      fontSize: Dimension.fontSmaller,
      lineHeight: Dimension.fontSmaller,
      fontFamily: 'RobotoRegular',
      ...textStyle,
    },
  }
  set(optionData, ['legend'], newLegend)

  // xAxis yAxis
  const nameTextStyle = {
    color: Colors.txtDesc,
    fontSize: Dimension.fontSmaller,
    fontFamily: 'RobotoRegular',
    lineHeight: Dimension.fontSmaller,
    align: 'left',
    padding: [8, 0, 0, 20],
    verticalAlign: 'top',
  }
  const axisLabel = {
    color: Colors.txtDesc,
    // interval: "auto", // 坐标轴刻度标签的显示间隔，在类目轴中有效.0显示所有
    fontSize: Dimension.fontSmaller,
    fontFamily: 'RobotoRegular',
    lineHeight: Dimension.fontSmaller,
  }

  set(optionData, ['xAxis'], {
    ...xAxis,
    nameTextStyle: nameTextStyle,
    axisTick: {show: false},
    axisLabel: {
      ...axisLabel,
      ...axisLabelX,
    },
    axisLine: {show: false},
  })
  set(optionData, ['yAxis'], {
    ...yAxis,
    nameTextStyle: nameTextStyle,
    axisTick: {show: false},
    axisLabel: {
      ...axisLabel,
      ...axisLabelY,
    },
    axisLine: {show: false},
  })

  return optionData
}
