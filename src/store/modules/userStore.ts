import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ILoginResult, login, IAccount } from '@/service/login'
import { history } from '@/App'
import Local from '@/utils/storage'

import routes from '@/router'

const initialState: ILoginResult = Local.getStorage('user') || {
  auth: [],
  token: '',
  menu: [],
  user: {
    avatar: '',
    desc: '',
    email: '',
    roles: [],
    status: 0,
    user_id: 0,
    username: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(asyncLogin.fulfilled, (state, { payload }) => {
      const { auth, token, user } = payload
      const menu = [...routes, ...payload.menu]
      Object.assign(state, { auth, menu, token, user })
      Local.setStorage('user', { auth, menu, token, user })
      history.replace('/home')
    })
  },
})

export const asyncLogin = createAsyncThunk(
  'user/setInfo',
  async (data: IAccount) => {
    console.log('data', data)
    const res = await login(data)
    console.log('res', res)
    if (res.code === 200) {
      return res.data
    }
  },
)

export default userSlice.reducer
