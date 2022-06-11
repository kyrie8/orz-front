import React from 'react'
import { memo } from 'react'

import { Header } from 'antd/lib/layout/layout'
import * as Icon from '@ant-design/icons'
import styles from '../../layout/layout.module.less'

interface IProps {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

function NavBar(props: IProps) {
  const { collapsed, setCollapsed } = props
  return (
    <Header className={styles['header']}>
      <div>
        {React.createElement(
          collapsed ? Icon.MenuUnfoldOutlined : Icon.MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          },
        )}
      </div>
    </Header>
  )
}

export default memo(NavBar)
