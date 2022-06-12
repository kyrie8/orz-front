import { configureStore } from '@reduxjs/toolkit'
import userStore from './modules/userStore'
import useSetting from './modules/useSetting'
export const store = configureStore({
  reducer: {
    user: userStore,
    setting: useSetting,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
