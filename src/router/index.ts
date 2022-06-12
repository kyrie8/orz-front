const routes = [
  {
    component: 'home/index',
    is_out_link: 0,
    menu_name: 'Dashboard',
    path: '/home',
    icon: 'DashboardOutlined',
    hidden: false,
  },
  {
    component: 'noMatch/index',
    is_out_link: 0,
    menu_name: '404',
    path: '*',
    icon: 'BugOutlined',
    hidden: true,
  },
]

export default routes
