import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import {
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import loadable from '@loadable/component'
import * as Icon from '@ant-design/icons'
import { Layout, Menu, Breadcrumb } from 'antd'
import { useAppSelector } from '@/store/hook'
import styles from './layout.module.less'
import { IMenu } from '@/service/type'

import NavBar from '../components/NavBar'
import Tags from '../components/Tags'

const { Header, Sider, Content } = Layout

type IRoutes = IMenu & { element: any }

function getFlatRoutes(routes) {
  const res = []
  let element = null
  function flatRotes(_routes) {
    _routes.forEach((item) => {
      if (item.path && !item.children) {
        try {
          element = loadable(() => import(`@/views/${item.component}`))
          res.push({ ...item, element })
        } catch (error) {
          console.log(error)
        }
      }
      if (item.children && item.children.length) {
        flatRotes(item.children)
      }
    })
  }
  flatRotes(routes)
  return res
}

//TODO 考虑新的路由写法和菜单写法？
function getMenus(menus) {
  const menuArr = JSON.parse(JSON.stringify(menus))
  function changeKey(menu) {
    menu.forEach((item) => {
      if (item.is_out_link) {
        item.label = (
          <a href={item.path} target="_blank" rel="noopener noreferrer">
            {item.menu_name}
          </a>
        )
      } else {
        item.label = item.menu_name
      }
      if (item.icon) {
        item.icon = React.createElement(Icon[item.icon])
      }
      item.key = item.path
      if (item.children && item.children.length) {
        //item.key = 'SubMenu'
        changeKey(item.children)
      }
    })
  }
  changeKey(menuArr)
  return menuArr
}

function PageLayout() {
  const { menu } = useAppSelector((state) => ({
    menu: state.user.menu,
  }))
  const [collapsed, setCollapsed] = useState(false) //侧边栏开关
  const setSiderCollapsed = useCallback((v: boolean) => {
    setCollapsed(v)
  }, [])
  const routes: IRoutes[] = useMemo(() => getFlatRoutes(menu), [menu]) //路由扁平
  const menus = useMemo(() => getMenus(menu), [menu]) //转成符合antd menu格式
  const [selectedKeys, setSelectedKeys] = useState(['']) //默认选中，根据登录后的跳转地址设置
  const [defaultOpenKeys, setDefaultOpenKeys] = useState(['']) //submenu选中
  const [isShowTags, setShowTags] = useState(true) //是否展示tags
  const [tagsObj, setTagsObj] = useState<any>({}) //Tags信息
  const [bread, setBread] = useState(['']) //面包屑名称
  const nav = useNavigate()
  const local = useLocation()

  useEffect(() => {
    setSelectedKeys([local.pathname])
    selectOpenKeys(local.pathname)
  }, [local.pathname])

  function selectOpenKeys(key) {
    const selectArr = [] //key值
    const bread = [] //name
    function getSubMenu(key, menus) {
      menus.forEach((item) => {
        if (key.includes(item.path)) {
          selectArr.push(item.path)
          bread.push(item.menu_name)
          if (item.children && item.children.length) {
            getSubMenu(key, item.children)
          }
        }
      })
    }
    getSubMenu(key, menus)
    console.log('selectArr', selectArr, bread)
    setBread(bread)
    setDefaultOpenKeys(selectArr)
  }

  function selectMenuItem(v) {
    const { key, item } = v
    if (isShowTags) {
      const obj = {
        key: item.props.path,
        label: item.props.menu_name,
      }
      setTagsObj(obj)
    }
    nav(key)
  }

  return (
    <Layout className={styles.layout}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={styles['logo']} />
        <Menu
          items={menus}
          theme="dark"
          mode="inline"
          onSelect={(v) => selectMenuItem(v)}
          selectedKeys={selectedKeys}
          openKeys={defaultOpenKeys}
          onOpenChange={(key) => setDefaultOpenKeys(key)}
        />
      </Sider>
      <Layout className={styles['layout-wrapper']}>
        <NavBar collapsed={collapsed} setCollapsed={setSiderCollapsed}></NavBar>
        <Tags tagsObj={tagsObj} isShow={isShowTags}></Tags>
        <div className={styles['layout-content']}>
          <Breadcrumb className={styles['breadcrumb']}>
            {bread.map((item) => {
              return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            })}
          </Breadcrumb>
          <Content className={styles['content']}>
            <Routes>
              {routes.map((item) => {
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    element={<item.element />}
                  />
                )
              })}
            </Routes>
            <Outlet></Outlet>
          </Content>
        </div>
      </Layout>
    </Layout>
  )
}

export default memo(PageLayout)
