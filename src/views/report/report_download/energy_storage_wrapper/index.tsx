import {t} from 'i18next'
import {get} from 'lodash'
import {Moment} from 'moment'
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react'

import {fetchInverterList, getElcStatisticsRequest, getPowerStatisticsRequest} from '@/api/plant'
import {getReportStationBatchDevicePowerCurvesRequest} from '@/api/report'
import {DATE_PICKER_TYPE_YEAR} from '@/common'

import GenerationChart from '../components/generation_chart'
import PieChart, {IProductionChartData} from '../components/pie_chart'
import ProductionEarningLabel from '../components/production_earning_label'
import PvChart from '../components/pv_chart'
import style from './index.module.less'

interface IProps {
  id: string
  classification: string
  title: string
  currency: string
  dateRange: [Moment, Moment]
  mode: string
}

interface IElcStatisticDataItem {
  date: string
  val: number
  item?: string
  statisticsList?: {date: string; val: number}[]
}

export const PlantlistContext = React.createContext<any>({})
const EnergyStorageWrapper: FC<IProps> = ({
  id,
  // classification,
  // title,
  currency,
  // activeKeys,
  dateRange,
  mode,
}) => {
  const [inverterIdSelectedList, setInverterIdSelectedList] = useState<string[]>([])
  const [elcStatisticDataList, setElcStatisticDataList] = useState<{
    generation: number
    income: number
    dataList: IElcStatisticDataItem[]
  }>({
    generation: 0,
    income: 0,
    dataList: [],
  })
  const [powerStatisticsDataList, setPowerStatisticsDataList] = useState<
    IReport.IPowerStatisticsResponseDataItem[]
  >([])
  const [devicePowerCurvesDataList, setDevicePowerCurvesDataList] = useState<
    IReport.IBatchDeviceECurvesResponseDataItem[]
  >([])

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
      const elcStatisticsRes = await getElcStatisticsRequest({
        stationId: id,
        dimension: mode === DATE_PICKER_TYPE_YEAR ? 'month' : 'day',
        items: ['selfUse', 'sell', 'buy', 'e', 'load'],
        startDate: startTimeUnix,
        endDate: endTimeUnix,
      })
      setElcStatisticDataList(
        elcStatisticsRes?.data || {
          generation: 0,
          income: 0,
          dataList: [],
        }
      )
      const powerStatisticsRes: {
        data: IReport.IPowerStatisticsResponse
      } = await getPowerStatisticsRequest({
        stationId: id,
        items: ['p', 'battery', 'meter', 'load'],
        startDate: startTimeUnix,
        endDate: endTimeUnix,
      })
      setPowerStatisticsDataList(powerStatisticsRes?.data?.dataList || [])
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
        code: 'stored_energy_inverter',
        stationId: id,
      })
      const dataList: IReport.IControlDevice[] = res?.data?.dataList || []
      // setInverterList(dataList);
      setInverterIdSelectedList(dataList.map(item => item.sn))
    } catch (error: any) {
      console.log(t(error))
    } finally {
      closeLoading()
    }
  }, [id])

  useEffect(() => {
    getInverterListData()
  }, [])

  useEffect(() => {
    getGenerationData()
  }, [id, dateRange])

  const getBatchDeviceECurves = useCallback(async () => {
    if (!inverterIdSelectedList.length) {
      return
    }
    const [start, end] = dateRange
    const startTimeUnix = start.valueOf()
    const endTimeUnix = end.valueOf()
    const query: IReport.IBatchDeviceECurvesQuery = {
      stationId: id,
      dimension: mode === DATE_PICKER_TYPE_YEAR ? 'month' : 'day',
      items: ['soc'],
      snList: inverterIdSelectedList,
      startDate: startTimeUnix,
      endDate: endTimeUnix,
    }
    loading()
    try {
      const res = (await getReportStationBatchDevicePowerCurvesRequest(query)) as {
        data: IReport.IBatchDeviceECurvesResponse
      }
      setDevicePowerCurvesDataList(res?.data?.dataList || [])
    } catch (error: any) {
      console.log(t(error))
    } finally {
      closeLoading()
    }
  }, [inverterIdSelectedList, id, dateRange, mode])

  useEffect(() => {
    getBatchDeviceECurves()
  }, [getBatchDeviceECurves])

  const lineChartData = useMemo(() => {
    return []
  }, [])

  const pieChartData = useMemo(() => {
    const dataList = get(elcStatisticDataList, ['dataList']) || []
    return dataList.map(({item, statisticsList = []}) => ({
      name: item || '',
      dataList: statisticsList.map(({date, val}) => ({
        date,
        value: val,
      })),
    }))
  }, [elcStatisticDataList])

  const ProductionChartData: IProductionChartData[] = useMemo(() => {
    const dataList = get(elcStatisticDataList, ['dataList']) || []
    const selfUse: IElcStatisticDataItem[] =
      get(
        dataList.filter(({item}) => item === 'selfUse'),
        [0, 'statisticsList']
      ) || []
    const selfUseSum = parseFloat(selfUse.reduce((sum, {val}) => sum + val, 0).toFixed(2))
    const buy: IElcStatisticDataItem[] =
      get(
        dataList.filter(({item}) => item === 'buy'),
        [0, 'statisticsList']
      ) || []
    const buySum = parseFloat(buy.reduce((sum, {val}) => sum + val, 0).toFixed(2))

    const sell: IElcStatisticDataItem[] =
      get(
        dataList.filter(({item}) => item === 'sell'),
        [0, 'statisticsList']
      ) || []
    const sellSum = parseFloat(sell.reduce((sum, {val}) => sum + val, 0).toFixed(2))
    return [
      {
        name: 'Production',
        dataList: [
          {
            name: 'In-house',
            value: selfUseSum,
            color: '#688CFD',
            percent:
              selfUseSum + sellSum
                ? parseFloat(((selfUseSum * 100) / (selfUseSum + sellSum)).toFixed(2))
                : 0,
          },
          {
            name: 'Sell',
            value: sellSum,
            color: '#44D0A3',
            percent:
              selfUseSum + sellSum
                ? parseFloat(((sellSum * 100) / (selfUseSum + sellSum)).toFixed(2))
                : 0,
          },
        ],
      },
      {
        name: 'Consumption',
        dataList: [
          {
            name: 'In-house',
            value: selfUseSum,
            color: '#688CFD',
            percent:
              selfUseSum + buySum
                ? parseFloat(((selfUseSum * 100) / (selfUseSum + buySum)).toFixed(2))
                : 0,
          },
          {
            name: 'Buy',
            value: buySum,
            color: '#FFBE00',
            percent:
              selfUseSum + buySum
                ? parseFloat(((buySum * 100) / (selfUseSum + buySum)).toFixed(2))
                : 0,
          },
        ],
      },
    ]
  }, [elcStatisticDataList])

  const socChartDataList = useMemo(() => {
    return devicePowerCurvesDataList.map(({sn, curves}) => {
      const socDataList: {
        tp: string
        power: number
      }[] =
        get(
          curves.filter(({item}) => item === 'soc'),
          [0, 'powerData']
        ) || []
      console.log({socDataList})
      return {
        name: `SOC ${sn}`,
        // dataList: socDataList.map(({ tp, power }) => ({
        //   date: tp,
        //   value: power,
        // })),
        dataList: socDataList.map(({tp, power}) => [tp, power]),
      }
    })
  }, [devicePowerCurvesDataList])

  const pvChartData = useMemo(() => {
    return powerStatisticsDataList.map(({item, powerData}) => ({
      name: item,
      dataList: powerData.map(({tp, power}) => [tp, power]),
    }))
  }, [powerStatisticsDataList])

  return (
    <div className={style.container}>
      <div className={style.head}>
        <label>Power</label>
      </div>
      <PvChart pvChartData={pvChartData} />

      <div className={style.head}>
        <label>Production & Earning</label>
      </div>
      <ProductionEarningLabel
        productionValue={elcStatisticDataList?.generation}
        earningValue={elcStatisticDataList?.income}
        currency={currency}
      />
      <GenerationChart
        isMultiDeviceQuery={true}
        lineChartData={lineChartData}
        pieChartData={pieChartData}
        formatter={params => {
          let str = ''
          params.forEach((item: any, index: number) => {
            const {seriesName, axisValueLabel, marker, value} = item
            if (index === 0) {
              str += `${axisValueLabel}<br/>`
            }
            str += '<div style="text-align:left">'
            str += `<span style="display:inline-block;width:100px;">${marker}${seriesName}</span>`
            str +=
              '<span style="display:inline-block;text-align:right;width:80px;">' +
              value.toFixed(2) +
              '</span>'
            str += '</div>'
          })
          return str
        }}
      />
      <PieChart ProductionChartData={ProductionChartData} />
      <PvChart pvChartData={socChartDataList} />
    </div>
  )
}

export default EnergyStorageWrapper
