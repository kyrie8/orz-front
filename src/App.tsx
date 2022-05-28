import { memo } from 'react'
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Login from '@/view/login/Index'
import Layout from '@/view/layout/Index'

const history = createBrowserHistory({ window })

function App() {
  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />}></Route>
        <Route path="/home" element={<Layout />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </HistoryRouter>
  )
}

export default memo(App)
