import { memo } from 'react'
import { useAppSelector } from '@/store/hook'
import styles from './layout.module.less'
function Layout() {
  const user = useAppSelector((state) => {
    return state.user.token
  })
  return <div className={styles.layout}>layout-{user}</div>
}

export default memo(Layout)
