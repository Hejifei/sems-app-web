import {PayloadAction} from '@reduxjs/toolkit'

export default {
  increment: (state: IBaseModel.IState) => {
    state.value += 1
  },
  decrement: (state: IBaseModel.IState) => {
    state.value -= 1
  },
  incrementByAmount: (state: IBaseModel.IState, action: PayloadAction<number>) => {
    state.value += action.payload
  },
  changeLoading: (state: IBaseModel.IState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload
  },
}
