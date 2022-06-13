import React from 'react'
import { memo } from 'react'
import { Avatar, Button } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import * as Icon from '@ant-design/icons'
import styles from './navBar.module.less'
import { useAppSelector } from '@/store/hook'

interface IProps {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

function NavBar(props: IProps) {
  const { collapsed, setCollapsed } = props
  const { avatar, username } = useAppSelector((state) => state.user.user)
  return (
    <Header className={styles['header']}>
      <div>
        {React.createElement(
          collapsed ? Icon.MenuUnfoldOutlined : Icon.MenuFoldOutlined,
          {
            className: styles['trigger'],
            onClick: () => setCollapsed(!collapsed),
          },
        )}
      </div>
      <div className={styles.right}>
        <Avatar src={avatar}></Avatar>
        <span>{username}</span>
      </div>
    </Header>
  )
}

export default memo(NavBar)
