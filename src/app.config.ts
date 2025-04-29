export default defineAppConfig({
  pages: [
    'pages/login/index',
    'pages/goodAnswerer/index',
    'pages/index/index',
    'pages/personInfo/index',
    'pages/personalCenter/index',
    'pages/changeInfo/index',
    'pages/chat/index',
    'pages/community/index'
  ],
  tabBar: {
    list: [
      { pagePath: 'pages/index/index', text: '主页' },
      { pagePath: 'pages/chat/index', text: '对话' },
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

