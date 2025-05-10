export default defineAppConfig({
  pages: [
    'pages/goodAnswerer/index',
    'pages/personalCenter/index',
    'pages/chatList/index',
    'pages/allChats/index',
    'pages/changePosts/index',
    'pages/login/index',
    'pages/index/index',
    'pages/personInfo/index',
    'pages/changeInfo/index',
    'pages/chat/index',
    'pages/community/index'
  ],
  tabBar: {
    list: [
      { pagePath: 'pages/index/index', text: '主页' },
      { pagePath: 'pages/chatList/index', text: '对话' },
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

