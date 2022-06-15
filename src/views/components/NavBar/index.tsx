import React from 'react'
import { memo } from 'react'
import { Avatar, Dropdown, Menu } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { useAppSelector } from '@/store/hook'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import styles from './navBar.module.less'

import { history } from '@/App'
import local from '@/utils/storage'
interface IProps {
  collapsed: boolean
  setCollapsed: () => void
}

const onClick = ({ key }) => {
  console.log('key', key)
  switch (key) {
    case '3':
      local.clearStorage()
      history.replace('/login')
      break

    default:
      break
  }
}

const menu = (
  <Menu
    onClick={onClick}
    items={[
      {
        label: '个人中心',
        key: '0',
      },
      {
        label: '设置',
        key: '1',
      },
      {
        label: '退出',
        key: '3',
      },
    ]}
  />
)

function NavBar(props: IProps) {
  const { collapsed, setCollapsed } = props
  const { avatar, username } = useAppSelector((state) => state.user.user)
  function toggleClick(e: React.MouseEvent) {
    e.stopPropagation()
    setCollapsed()
  }
  return (
    <Header className={styles['header']}>
      <div className={styles['trigger']} onClick={(e) => toggleClick(e)}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
      <div className={styles.right}>
        <Dropdown
          overlayClassName={styles.drop}
          overlayStyle={{ paddingTop: '5px' }}
          placement="bottom"
          overlay={menu}
          trigger={['click']}
        >
          <Avatar src={avatar}></Avatar>
        </Dropdown>
        <span>{username}</span>
      </div>
    </Header>
  )
}

export default memo(NavBar)
