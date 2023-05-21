import {get, isPlainObject} from 'lodash'

import {request} from '@/utils/request'

export async function fetchLogin(
  params: IAccountModel.ICrossLoginQuery
): Promise<IAccountModel.ICrossLoginResponse> {
  const res = await request.post('Account/CrossLogin', params)
  let data = get(res, 'data')

  if (!isPlainObject(data)) {
    data = {}
  }
  return data
}
// 修改密码
export async function fetchChangePassword(
  params: IAccountModel.IChangePasswordData
): Promise<IAccountModel.IModifyPassworResponse> {
  const res = await request.post('Account/ModifyPassword', params)
  let data = get(res, 'data')

  if (!isPlainObject(data)) {
    data = {}
  }
  return data
}
