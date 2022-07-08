import request from '@/api'
import { IData, IMenu } from './type'

interface IParams {
  username?: string
  page_num: number
  page_size: number
  status?: number
}

interface IPatchParams {
  username: string
  password: string
  email?: string
  avatar?: string
  desc?: string
  status: number
  role_id: string
  dept_id: number
  id?: number
}
interface IResult {
  list: unknown[]
  total: number
}
export function getUserList<T = IParams>(params: T) {
  return request.get<IData<IResult>>({
    url: 'user',
    params,
  })
}

export function delUser(id: number) {
  return request.delete<IData<unknown>>({
    url: `user/${id}`,
  })
}

export function getUser(id: number) {
  return request.get<IData<unknown>>({
    url: `user/${id}`,
  })
}

export function patchUser(data: IPatchParams) {
  return request.patch<IData<unknown>>({
    url: `user/${data.id}`,
    data,
  })
}

export function addUser(data: IPatchParams) {
  return request.post<IData<unknown>>({
    url: 'user',
    data,
  })
}
