import Taro from '@tarojs/taro'

const baseURL = 'http://127.0.0.1:3000'

export function request(options: Taro.request.Option) {
  return Taro.request({
    ...options,
    url: baseURL + options.url,
    header: {
      ...options.header,
      Authorization: Taro.getStorageSync('token') || '',
    },
    // 你可以在这里统一处理 loading、错误等
  }).then(res => {
    if (res.statusCode === 200) {
      return res.data
    } else {
      Taro.showToast({ title: '请求失败', icon: 'none' })
      return Promise.reject(res)
    }
  })
}
