import { memo, useEffect, useState } from 'react'
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
  const { token } = useAppSelector((state) => ({
    token: state.user.token,
  }))
  const [routes, setRoutes] = useState([])
  useEffect(() => {
    if (!token) {
      history.replace('/login')
      return
    }
  }, [])
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/*" element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </HistoryRouter>
  )
}

export default memo(App)
