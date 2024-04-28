export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
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
      { name: '用户管理', icon: 'table', path: '/admin/userinfo', component: './Admin/UserInfo' },
      { name: '接口管理', icon: 'table', path: '/admin/interface-info', component: './Admin/InterfaceInfo' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
