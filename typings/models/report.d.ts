declare namespace IReport {
  interface IBatchDeviceECurvesQuery {
    dimension?: string
    endDate: number
    items: string[]
    snList: string[]
    startDate: number
    stationId: string
  }

  interface IBatchDeviceECurvesResponseDataCurvesValueItem {
    date: string
    val: number
  }
  interface IBatchDeviceECurvesResponseDataCurvesItem {
    item: string
    curveData: IBatchDeviceECurvesResponseDataCurvesValueItem[]
  }

  interface IBatchDeviceECurvesResponseDataItem {
    sn: string
    nodeId: string
    curves: IBatchDeviceECurvesResponseDataCurvesItem[]
  }

  interface IBatchDeviceECurvesResponse {
    dataList: IBatchDeviceECurvesResponseDataItem[]
  }

  interface IStationEStaticsResponse {
    totalRevenue: number
    totalYield: number
  }

  interface IElcStatisticsResponseDataItem {
    item: string
    statisticsList: IBatchDeviceECurvesResponseDataCurvesValueItem[]
  }

  interface IElcStatisticsResponse {
    generation: number
    income: number
    dataList: IElcStatisticsResponseDataItem[]
  }

  interface IPowerStatisticsResponseDataItem {
    item: string
    powerData: {
      tp: string
      power: number
    }[]
  }

  interface IPowerStatisticsResponse {
    dataList: IPowerStatisticsResponseDataItem[]
  }

  interface IControlDevice {
    id: string
    name: string
    sn: string
    templateCode: string
  }
}
