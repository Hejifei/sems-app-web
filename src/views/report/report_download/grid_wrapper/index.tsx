import {ColumnsType} from 'antd/lib/table'
import {t} from 'i18next'
import {get} from 'lodash'
import moment, {Moment} from 'moment'
import {FC, useCallback, useEffect, useMemo, useState} from 'react'

import {fetchInverterList, getElcStatisticsRequest, getPowerStatisticsRequest} from '@/api/plant'
import {
  getReportStationBatchDeviceECurvesRequest,
  getReportStationEStaticsRequest,
} from '@/api/report'
import {DATE_PICKER_TYPE_YEAR, MOMENT_DAY_FORMATE} from '@/common'
import useNumberFormat from '@/hooks/useNumberFormat'

import GenerationChart from '../components/generation_chart'
import ProductionEarningLabel from '../components/production_earning_label'
import PvChart from '../components/pv_chart'
import ReportPage from '../components/report_page'
import ReportTable from '../components/report_table'
import ReportTitle from '../components/report_title'
import style from './index.module.less'

interface IProps {
  id: string
  classification: string
  title: string
  currency: string
  dateRange: [Moment, Moment]
  mode: string
}

const GridWrapper: FC<IProps> = ({id, currency, dateRange, mode, title}) => {
  const {getNumber} = useNumberFormat()
  const isMultiDeviceQuery = useMemo(() => false, [])
  //  设备选项列表
  // const [inverterList, setInverterList] = useState<IReport.IControlDevice[]>([])
  const [inverterIdSelectedList, setInverterIdSelectedList] = useState<string[]>([])
  //  电站发电曲线与统计数据
  const [stationEStaticData, setStationEStaticData] = useState<IReport.IStationEStaticsResponse>({
    totalRevenue: 0,
    totalYield: 0,
  })
  const [batchDeviceECurvesData, setBatchDeviceECurvesData] = useState<
    IReport.IBatchDeviceECurvesResponseDataItem[]
  >([])
  const [elcStatisticsData, setElcStatisticsData] = useState<IReport.IElcStatisticsResponse>()
  const [powerStaticsData, setPowerStaticsData] = useState<IReport.IPowerStatisticsResponse>()

  const loading = useCallback(() => {
    console.log('loading')
  }, [])

  const closeLoading = useCallback(() => {
    console.log('closeLoading')
  }, [])

  const getGenerationData = useCallback(async () => {
    const [start, end] = dateRange
    const startTimeUnix = start.valueOf()
    const endTimeUnix = end.valueOf()
    loading()
    try {
      const eStaticRes = (await getReportStationEStaticsRequest({
        stationId: id,
        dimension: mode === DATE_PICKER_TYPE_YEAR ? 'month' : 'day',
        items: ['e'],
        startDate: startTimeUnix,
        endDate: endTimeUnix,
      })) as {
        // eslint-disable-next-line no-undef
        data: IReport.IStationEStaticsResponse
      }
      setStationEStaticData(eStaticRes?.data)
      const res = (await getPowerStatisticsRequest({
        stationId: id,
        items: ['p'],
        startDate: startTimeUnix,
        endDate: endTimeUnix,
      })) as {
        data: IReport.IPowerStatisticsResponse
      }
      setPowerStaticsData(res.data)
    } catch (error: any) {
      console.log(t(error))
    } finally {
      closeLoading()
    }
  }, [id, dateRange, mode])

  const getInverterListData = useCallback(async () => {
    loading()
    try {
      const res: any = await fetchInverterList({
        code: 'grid_inverter',
        stationId: id,
      })
      const dataList: IReport.IControlDevice[] = res?.data?.dataList || []
      // setInverterList(dataList)
      setInverterIdSelectedList(dataList.map(item => item.sn).slice(0, 5))
    } catch (error: any) {
      console.log(t(error))
    } finally {
      closeLoading()
    }
  }, [id])

  const getPlantElecStatisticsData = useCallback(async () => {
    const [start, end] = dateRange
    const startTimeUnix = start.valueOf()
    const endTimeUnix = end.valueOf()
    loading()
    try {
      const res = (await getElcStatisticsRequest({
        stationId: id,
        dimension: mode === DATE_PICKER_TYPE_YEAR ? 'month' : 'day',
        items: ['e', 'income'],
        startDate: startTimeUnix,
        endDate: endTimeUnix,
      })) as {
        data: IReport.IElcStatisticsResponse
      }
      const {data} = res
      setElcStatisticsData(data)
    } catch (error: any) {
      console.log(t(error))
    } finally {
      closeLoading()
    }
  }, [dateRange, id, mode])

  const getBatchDeviceECurves = useCallback(async () => {
    if (!inverterIdSelectedList.length) {
      setBatchDeviceECurvesData([])
      return
    }
    const [start, end] = dateRange
    const startTimeUnix = start.valueOf()
    const endTimeUnix = end.valueOf()
    const query: IReport.IBatchDeviceECurvesQuery = {
      stationId: id,
      dimension: mode === DATE_PICKER_TYPE_YEAR ? 'month' : 'day',
      items: ['e'],
      snList: inverterIdSelectedList,
      startDate: startTimeUnix,
      endDate: endTimeUnix,
    }
    loading()
    try {
      const res = (await getReportStationBatchDeviceECurvesRequest(query)) as {
        data: IReport.IBatchDeviceECurvesResponse
      }
      const dataList = res?.data?.dataList || []
      setBatchDeviceECurvesData(dataList)
    } catch (error: any) {
      console.log(t(error))
    } finally {
      closeLoading()
    }
  }, [inverterIdSelectedList, id, dateRange, mode])

  useEffect(() => {
    getInverterListData()
  }, [])

  useEffect(() => {
    getGenerationData()
  }, [id, dateRange])

  useEffect(() => {
    if (isMultiDeviceQuery) {
      getBatchDeviceECurves()
    }
  }, [getBatchDeviceECurves])

  useEffect(() => {
    if (!isMultiDeviceQuery) {
      getPlantElecStatisticsData()
    }
  }, [getPlantElecStatisticsData])

  const lineChartData = useMemo(() => {
    if (isMultiDeviceQuery) {
      return batchDeviceECurvesData.map(({sn, curves}) => {
        const dataList = get(
          curves.filter(({item}) => item === 'e'),
          [0, 'curveData']
        )
        return {
          name: sn,
          dataList: dataList.map(({date, val}) => ({
            date,
            value: val,
          })),
        }
      })
    }
    return (
      elcStatisticsData?.dataList
        .filter(({item}) => item === 'e')
        .map(item => ({
          name: 'Production',
          dataList: item.statisticsList.map(({date, val}) => ({
            date,
            value: val,
          })),
        })) || []
    )
  }, [isMultiDeviceQuery, batchDeviceECurvesData, elcStatisticsData])

  const pieChartData = useMemo(() => {
    if (isMultiDeviceQuery) {
      return batchDeviceECurvesData.map(({sn, curves}) => {
        const dataList = get(
          curves.filter(({item}) => item === 'income'),
          [0, 'curveData']
        )
        return {
          name: sn,
          dataList: dataList.map(({date, val}) => ({
            date,
            value: val,
          })),
        }
      })
    }
    return (
      elcStatisticsData?.dataList
        .filter(({item}) => item === 'income')
        .map(item => ({
          name: 'Earning',
          dataList: item.statisticsList.map(({date, val}) => ({
            date,
            value: val,
          })),
        })) || []
    )
  }, [isMultiDeviceQuery, batchDeviceECurvesData, elcStatisticsData])

  const pvChartData = useMemo(() => {
    const data = powerStaticsData?.dataList.map(({item, powerData}) => ({
      name: item,
      dataList: powerData.map(({tp, power}) => [tp, power]),
    }))
    return data || []
  }, [powerStaticsData])

  const columns: ColumnsType<any> = useMemo(() => {
    const columnList = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Production',
        dataIndex: 'e',
        key: 'e',
      },
      {
        title: 'Earning',
        dataIndex: 'income',
        key: 'income',
      },
    ]
    return columnList
  }, [lineChartData, pieChartData])

  const tableData = useMemo(() => {
    const DataList: Record<string, any>[] = []
    if (isMultiDeviceQuery) {
      // return batchDeviceECurvesData.map(({sn, curves}) => {
      //   const dataList = get(
      //     curves.filter(({item}) => item === 'income'),
      //     [0, 'curveData']
      //   )
      //   return {
      //     name: sn,
      //     dataList: dataList.map(({date, val}) => ({
      //       date,
      //       value: val,
      //     })),
      //   }
      // })
      return []
    }
    const baseData = elcStatisticsData?.dataList || []
    baseData[0]?.statisticsList.forEach(({date, val}, index) => {
      const baseData1Val = baseData[1].statisticsList[index].val

      DataList.push({
        date: moment(date).format(MOMENT_DAY_FORMATE),
        [baseData[0].item]: getNumber(Number(val), '').replace(/[a-z]/gi, ''),
        [baseData[1].item]: getNumber(Number(baseData1Val), '').replace(/[a-z]/gi, ''),
      })
    })

    return DataList
  }, [elcStatisticsData])

  return (
    <div className={style.container}>
      <ReportPage title={title} pageSize={1}>
        <ReportTitle>Power</ReportTitle>
        <PvChart pvChartData={pvChartData} />
      </ReportPage>
      <ReportPage title={title} pageSize={2}>
        <ReportTitle>Production & Earning</ReportTitle>
        <ProductionEarningLabel
          productionValue={stationEStaticData?.totalYield}
          earningValue={stationEStaticData?.totalRevenue}
          currency={currency}
        />
        <GenerationChart
          isMultiDeviceQuery={isMultiDeviceQuery}
          lineChartData={lineChartData}
          pieChartData={pieChartData}
        />
        <ReportTable rowKey={'date'} columns={columns} data={tableData} />
      </ReportPage>
    </div>
  )
}

export default GridWrapper
