import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {get} from 'lodash'

import reducers from './reducers'

export const getList = createAsyncThunk(
  'article/getList',
  async ({
    currentPage = 1,
    pageSize = 5,
  }: {
    currentPage?: number
    pageSize?: number
    type?: string
  }) => {
    console.log({
      currentPage,
      pageSize,
    })
    // 模拟异步请求
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({data: {list: [1, 2, 3, 4, 5], total: 5}})
      }, 500)
    })

    let res = {}

    try {
      res = (await Promise.all([promise]))[0] as object
    } catch (error) {
      console.error(error)
    }

    const payload = get(res, 'data', {list: [], total: 0})

    console.log(payload)
    return payload
  }
)

const initialState: IBaseModel.IState = {
  isLoading: false,
  value: 0,
}

export const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers,
  extraReducers: builder => {
    builder.addCase(getList.fulfilled, (state, {payload}) => {
      // state.list = payload.list
      // state.total = payload.total
      console.log({
        state,
        payload,
      })
    })
  },
})

export const {changeLoading, increment, decrement, incrementByAmount} = baseSlice.actions

export default baseSlice.reducer
