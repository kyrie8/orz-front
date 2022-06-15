import request from '@/api'
import { IData, IMenu } from './type'

interface IParams {
  username?: string
  page_num: number
  page_size: number
  status?: number
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
