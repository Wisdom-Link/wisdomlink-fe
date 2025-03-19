export default defineAppConfig({
  pages: [
    'pages/main/index',
    'pages/index/index',
    'pages/personalCenter/index',
    'pages/community/index'
  ],
  tabBar: {
    list: [
      { pagePath: 'pages/main/index', text: '主页' },
      { pagePath: 'pages/index/index', text: '首页' },
      { pagePath: 'pages/community/index', text: '社区' },
      { pagePath: 'pages/personalCenter/index', text: '我的' }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})

