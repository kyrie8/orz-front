export interface IData<T = unknown> {
  data: T
  code: number
  msg: string
}

export interface IMenu {
  children?: IMenu
  component?: string
  createTime?: string
  is_out_link: number
  menu_id: number
  menu_name: string
  parent_id: number
  path: string
  type: number
  updateTime?: string
}
