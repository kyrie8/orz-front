import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ILoginResult, login, IAccount } from '@/service/login'
import Local from '@/utils/storage'
import { history } from '@/App'
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
      const { auth, menu, token, user } = payload
      Object.assign(state, { auth, menu, token, user })
      Local.setStorage('user', payload)
      history.replace('/home')
    })
  },
})

export const asyncLogin = createAsyncThunk(
  'user/setInfo',
  async (data: IAccount) => {
    const res = await login(data)
    if (res.code === 200) {
      return res.data
    }
  },
)

export default userSlice.reducer
