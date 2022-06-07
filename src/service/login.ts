import request from '@/api'

import { IData, IMenu } from './type'

export type IAccount = { username: string; password: string }
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
export type ILoginResult = {
  auth: string[]
  token: string
  menu: IMenu[]
  user: IUser
}
export function login(data: IAccount) {
  return request.post<IData<ILoginResult>>({
    url: 'login',
    data,
  })
}
