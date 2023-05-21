import {FrownOutlined, SmileOutlined} from '@ant-design/icons'
import type {EChartOption, ECharts} from 'echarts'
import * as echarts from 'echarts'
import {get, isFunction, set} from 'lodash'
import type {CSSProperties} from 'react'
import React, {createRef, PureComponent} from 'react'

import NoData from '@/components/no_data'

const DEFAULT_CHART_HEIGHT = 300

interface Props {
  /**
   * echart配置
   */
  option: EChartOption
  /**
   * 加载
   */
  loading?: boolean
  /**
   * 是否无数据
   */
  noData?: boolean
  /**
   * 无数据显示信息
   */
  noDataText?: string
  /**
   * 无数据是否是好事
   * 在无数据的情况下
   * true: 会显示愉悦的icon
   * false: 会显示沮丧的icon
   */
  noDataIsFine?: boolean
  /**
   * 每次更新强制重新render
   */
  forceRender?: boolean
  /**
   * 容器class
   */
  className?: string
  /**
   * 高度
   */
  height?: number
  /**
   * 更新属性的时候先清除,再更新新值
   * 为了解决有些情况下图形错乱问题,先清空再设置给定值
   */
  clearBeforeUpdateMap?: {
    serieData: boolean
  }
  /**
   * 绑定监听事件
   * eventType: 事件类型
   * eventListener：事件监听
   */
  initBindEventListener?: {
    eventType: string
    eventListener: Function
  }
  /**
   * 每次更新重置chart
   */
  isAlwaysClearChart?: boolean
  /**
   * 鼠标hover事件
   * params echart事件的params
   * chart echart实例
   * (params, chart) => {}
   */
  onMouseOver?: Function
  /**
   * 鼠标移出事件
   * params echart事件的params
   * chart echart实例
   * (params, chart) => {}
   */
  onMouseOut?: Function
  /**
   * 鼠标移出echarts范围事件
   * params echart事件的params
   * chart echart实例
   * (params, chart) => {}
   */
  onGlobalOut?: Function
  /**
   * 鼠标点击事件
   * params echart事件的params
   * chart echart实例
   * (params, chart) => {}
   */
  onClick?: Function
  /**
   * 鼠标双击事件
   * params echart事件的params
   * chart echart实例
   * (params, chart) => {}
   */
  onDoubleClick?: Function
  /**
   * 高亮事件
   * params echart事件的params
   * chart echart实例
   * (params, chart) => {}
   */
  onHighlight?: Function
  /**
   * 缩放条事件
   * params echart事件的params
   * chart echart实例
   * (params, chart) => {}
   */
  onDataZoomChange?: Function
  /**
   * 鼠标右键事件
   */
  onContextmenu?: Function
  /**
   * 区域选择事件
   */
  onBrushSelectedChange?: Function
  /**
   * 鼠标移动事件
   */
  onMouseMove?: Function
  /**
   * tooltip变化事件
   */
  onShowTipChange?: Function
  /**
   * 区块选择事件
   */
  onBrushChange?: Function
  /**
   * echarts初始化后添加额外的option
   */
  addChartOptionAfterInit?: Function
  /**
   * 还原图形
   * params echart事件的params
   * chart echart实例
   * (params, chart) => {}
   */
  onRestore?: Function
}
interface State {
  // echart 实例
  chart: ECharts | null
}

class Charts extends PureComponent<Props, State> {
  // 事件是否已经绑定
  eventHasBind = false

  // 事件id
  clickFlag = 0

  // 图形ref
  chartRef = createRef<HTMLDivElement>()

  constructor(props: Props) {
    super(props)
    this.state = {
      chart: null,
    }
  }
  componentDidMount() {
    const {initBindEventListener} = this.props
    const charContainer = this.chartRef.current
    if (!this.state.chart && charContainer) {
      const chart = echarts.init(charContainer)
      this.setState({chart}, this.draw)
    }
    window.addEventListener('resize', this.draw)
    const eventType = get(initBindEventListener, 'eventType')
    const eventListener = get(initBindEventListener, 'eventListener')
    setTimeout(() => {
      if (eventType && isFunction(eventListener)) {
        window.addEventListener(eventType, eventListener(this.state.chart))
      }
    }, 100)
  }
  componentDidUpdate() {
    const {loading} = this.props
    if (loading) {
      return
    }

    this.draw()
  }

  componentWillUnmount() {
    const {initBindEventListener} = this.props
    window.removeEventListener('resize', this.draw)
    const {chart} = this.state
    if (chart) {
      chart.clear()
      chart.dispose()
    }
    const eventType = get(initBindEventListener, 'eventType')
    const eventListener = get(initBindEventListener, 'eventListener')
    if (eventType && isFunction(eventListener)) {
      window.removeEventListener(eventType, eventListener(this.state.chart))
    }
  }
  // eslint-disable-next-line react/sort-comp
  render() {
    const {noData, noDataText, noDataIsFine, className, height = DEFAULT_CHART_HEIGHT} = this.props
    const theme = this.context
    const wrapperStyle: CSSProperties = {
      position: 'relative',
    }
    const darkNodataWrapperStyle: CSSProperties = theme && noData ? {height: `${height}px`} : {}
    const graphStyle = {
      width: '100%',
      height: `${height}px`,
      display: theme && noData ? 'none' : '',
    }
    const noDataWrapperStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#fff',
    }
    const antIcon: React.FC = noDataIsFine ? SmileOutlined : FrownOutlined
    const renderedNoData = noData && (
      <NoData
        text={noDataText || ''}
        useAntdTableStyle
        wrapperStyle={noDataWrapperStyle}
        AntIcon={antIcon}
      />
    )
    return (
      <div className={className} style={{...wrapperStyle, ...darkNodataWrapperStyle}}>
        {renderedNoData}
        <div style={graphStyle} ref={this.chartRef} />
      </div>
    )
  }
  bindEvent = () => {
    const {chart} = this.state
    if (!chart) {
      return
    }

    const {
      onMouseOver,
      onMouseOut,
      onContextmenu,
      onGlobalOut,
      onClick,
      onDoubleClick,
      onHighlight,
      onDataZoomChange,
      onBrushSelectedChange,
      onMouseMove,
      onShowTipChange,
      onBrushChange,
      onRestore,
    } = this.props
    if (isFunction(onMouseOver)) {
      chart.on('mouseover', (params: unknown) => {
        onMouseOver(params, chart)
      })
    }
    if (isFunction(onMouseMove)) {
      chart.on('mousemove', (params: unknown) => {
        onMouseMove(params, chart)
      })
    }
    if (isFunction(onMouseOut)) {
      chart.on('mouseout', (params: unknown) => {
        onMouseOut(params, chart)
      })
    }
    if (isFunction(onContextmenu)) {
      chart.on('contextmenu', (params: unknown) => {
        onContextmenu(params, chart)
      })
    }
    if (isFunction(onGlobalOut)) {
      chart.on('globalout', (params: unknown) => {
        onGlobalOut(params, chart)
      })
    }
    if (isFunction(onClick)) {
      chart.on('click', (params: unknown) => {
        if (this.clickFlag) {
          clearTimeout(this.clickFlag)
        }
        this.clickFlag = window.setTimeout(() => {
          onClick(params, chart)
        }, 300)
      })
    }
    if (isFunction(onDoubleClick)) {
      chart.on('dblclick', (params: unknown) => {
        if (this.clickFlag) {
          clearTimeout(this.clickFlag)
        }
        onDoubleClick(params, chart)
      })
    }
    if (isFunction(onHighlight)) {
      chart.on('highlight', (params: unknown) => {
        onHighlight(params, chart)
      })
    }
    if (isFunction(onDataZoomChange)) {
      chart.on('dataZoom', (params: unknown) => {
        onDataZoomChange(params, chart)
      })
    }
    if (isFunction(onBrushChange)) {
      chart.on('brush', (params: unknown) => {
        onBrushChange(params, chart)
      })
    }
    if (isFunction(onBrushSelectedChange)) {
      chart.on('brushselected', (params: unknown) => {
        onBrushSelectedChange(params, chart)
      })
    }
    if (isFunction(onShowTipChange)) {
      chart.on('showTip', (params: unknown) => {
        onShowTipChange(params, chart)
      })
    }
    if (isFunction(onRestore)) {
      chart.on('restore', (params: unknown) => {
        onRestore(params, chart)
      })
    }
  }
  draw = () => {
    if (this.props.loading) {
      return
    }
    const {chart} = this.state

    if (!chart) {
      return
    }
    const {option, forceRender, addChartOptionAfterInit, isAlwaysClearChart} = this.props
    const extraOption: {
      notMerge?: boolean
      replaceMerge?: string | string[]
      lazyUpdate?: boolean
    } = {}
    if (forceRender) {
      extraOption.notMerge = true
    }
    this.clearBeforeUpdate(option, chart)
    if (isAlwaysClearChart) {
      chart.clear()
    }
    chart.setOption(option, extraOption)
    if (isFunction(addChartOptionAfterInit)) {
      addChartOptionAfterInit(chart)
    }
    chart.resize()
    if (!this.eventHasBind) {
      this.eventHasBind = true
      this.bindEvent()
    }
  }
  clearBeforeUpdate = (option: EChartOption, chart: ECharts) => {
    const {clearBeforeUpdateMap = {}, forceRender} = this.props
    const needClearBeforeUpdate = !forceRender && Object.values(clearBeforeUpdateMap).some(v => v)
    if (!needClearBeforeUpdate) {
      return
    }
    const serieData = get(clearBeforeUpdateMap, 'serieData')
    const {series = []} = option
    const dataList: unknown[] = []
    // 清除
    series.forEach(serie => {
      // data
      if (serieData) {
        const {data} = serie
        if (!data) {
          return
        }
        dataList.push(data)
        // eslint-disable-next-line no-param-reassign
        serie.data = []
      }
    })
    chart.setOption(option)
    // 还原
    series.forEach((serie, idx) => {
      // data
      if (serieData) {
        const data = dataList[idx]
        if (data) {
          // eslint-disable-next-line no-param-reassign
          set(serie, 'data', data)
        }
      }
    })
  }
}

export default Charts
