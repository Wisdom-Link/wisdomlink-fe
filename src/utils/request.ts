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
  }).then(res => {
    // 打印后端返回的所有数据
    console.log('Response from backend:', res)
    if (res.statusCode === 200) {
      return res.data
    } else {
      Taro.showToast({ title: '请求失败', icon: 'none' })
      return Promise.reject(res)
    }
  }).catch(error => {
    // 打印错误信息
    console.error('Request error:', error)
    Taro.showToast({ title: '网络错误', icon: 'none' })
    return Promise.reject(error)
  })
}
