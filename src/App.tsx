import { memo, useEffect } from 'react'
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { useAppSelector } from './store/hook'

import Login from '@/views/login/Index'
import Layout from '@/views/layout/Index'

export const history = createBrowserHistory({ window })

function App() {
  const user = useAppSelector((state) => ({
    token: state.user.token,
  }))
  useEffect(() => {
    if (user.token) {
      history.replace('/home')
      return
    }
    history.replace('/login')
  }, [])
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/home" element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </HistoryRouter>
  )
}

export default memo(App)
