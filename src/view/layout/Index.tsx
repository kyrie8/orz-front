import { memo } from 'react'

import styles from './layout.module.less'
function Layout() {
  return <div className={styles.layout}>layout</div>
}

export default memo(Layout)
