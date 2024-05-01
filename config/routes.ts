export default [
  { path: '/', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/home', name: '主页', icon: 'home', component: './Index' },
  { path: '/interface_info/:id', name: '查看接口', component: './InterfaceInfo', hideInMenu: true },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '用户管理', icon: 'table', path: '/admin/userinfo', component: './Admin/UserList' },
      {
        name: '接口管理',
        icon: 'table',
        path: '/admin/interfaceInfo',
        component: './Admin/InterfaceList',
      },
    ],
  },
  {
    path: '/account',
    name: '个人页',
    icon: 'user',
    routes: [
      {path: '/account', redirect: '/account/center'},
      { name: '个人设置', path: '/account/center', component: './Account/Center' },
      {
        name: '个人中心',
        path: '/account/setting',
        component: './Account/Settings',
      },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
