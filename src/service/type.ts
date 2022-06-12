export interface IData<T = unknown> {
  data: T
  code: number
  msg: string
}

export interface IMenu {
  children?: IMenu[]
  component?: string
  is_out_link: number
  menu_name: string
  path: string
  icon: string
  hidden: boolean
}
