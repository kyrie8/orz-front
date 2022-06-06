import request from '@/api'

import { IData, IMenu } from './type'

type IAccount = { username: string; password: string }
type IRoles = {
  remark: string
  role_id: number
  role_name: string
}
type IUser = {
  avatar?: string
  desc?: string
  email?: string
  roles?: IRoles[]
  status: number
  user_id: number
  username: string
}
export type IResultData = {
  auth: string[]
  token: string
  menu: IMenu[]
  user: IUser
}
export function login(data: IAccount) {
  return request.post<IData<IResultData>>({
    url: 'login',
    data,
  })
}
