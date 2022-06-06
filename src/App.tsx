import { memo } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Login from '@/view/login/Index'
import Layout from '@/view/layout/Index'

export const history = createBrowserHistory({ window })

function App() {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />}></Route>
          <Route path="/home" element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </HistoryRouter>
    </Provider>
  )
}

export default memo(App)
