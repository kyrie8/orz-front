import { createSlice } from '@reduxjs/toolkit'
import { login } from '@/service/login'
import { IResultData } from '@/service/login'
import { history } from '@/App'
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: [],
    token: '',
    menu: [],
    user: {},
  },
  reducers: {
    updateInfo(state, { payload }: { payload: IResultData }) {
      const { auth, menu, token, user } = payload
      Object.assign(state, { auth, menu, token, user })
    },
  },
})

export const { updateInfo } = userSlice.actions

export const asyncLogin = (payload) => async (dispatch) => {
  const res = await login(payload)
  if (res.code === 200) {
    dispatch(updateInfo(res.data))
    history.replace('/home')
  }
}

export default userSlice.reducer
