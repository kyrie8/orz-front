import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Local from '@/utils/storage'
type IState = {
  isShowBreadcrumb: boolean
  isShowTags: boolean
}

type IPayload = {
  showBread: boolean
  showTags: boolean
}

const initialState: IState = Local.getStorage('setting') || {
  isShowBreadcrumb: true,
  isShowTags: true,
}

export const userSetting = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setShowBreadAndTags: (state, action: PayloadAction<IPayload>) => {
      state.isShowBreadcrumb = action.payload.showBread
      state.isShowTags = action.payload.showTags
      Local.setStorage('setting', state)
    },
  },
})

export const { setShowBreadAndTags } = userSetting.actions

export default userSetting.reducer
