export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/goodAnswerer/index',
    'pages/login/index',
    'pages/personalCenter/index',
    'pages/chatList/index',
    'pages/allChats/index',
    'pages/changePosts/index',
    'pages/changeInfo/index',
    'pages/chat/index',
    'pages/AIchat/index',
    'pages/community/index',
    'pages/searchResult/index',
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '主页',
        iconPath: 'assets/tabbar/首页.png',
      },
      {
        pagePath: 'pages/chatList/index',
        text: '对话',
        iconPath: 'assets/tabbar/对话.png',
      },
      {
        pagePath: 'pages/community/index',
        text: '社区',
        iconPath: 'assets/tabbar/社区.png',
      },
      {
        pagePath: 'pages/personalCenter/index',
        text: '我的',
        iconPath: 'assets/tabbar/个人中心.png',
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})

