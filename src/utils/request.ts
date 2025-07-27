import Taro from '@tarojs/taro'

export const baseURL = 'http://127.0.0.1:3000'

export function request(options: Taro.request.Option) {
  // 判断是否为小程序环境
  const isMiniApp = Taro.getEnv && Taro.getEnv() === Taro.ENV_TYPE.WEAPP;
  const url = baseURL + options.url;
  const token = Taro.getStorageSync('token');

  // 确保 token 存在且格式正确
  const headers = {
    'Content-Type': 'application/json',
    ...(options.header || {}),
  };

  // 只有当 token 存在且不为空时才添加 Authorization
  if (token && typeof token === 'string' && token.trim()) {
    headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }

  if (isMiniApp) {
    // 小程序端用Taro.request
    return Taro.request({
      ...options,
      url,
      header: headers,
    }).then(res => {
      console.log('Response from backend:', res)
      console.log('Request headers:', headers) // 调试用
      if (res.statusCode === 200) {
        return res.data
      } else {
        Taro.showToast({ title: '请求失败', icon: 'none' })
        return Promise.reject(res)
      }
    }).catch(error => {
      console.error('Request error:', error)
      console.error('Token value:', token) // 调试用
      // 特殊处理域名错误
      if (error.errMsg && error.errMsg.includes('domain list')) {
        Taro.showToast({ title: '请在小程序后台配置服务器域名', icon: 'none', duration: 3000 })
      } else {
        Taro.showToast({ title: '网络错误', icon: 'none' })
      }
      return Promise.reject(error)
    });
  } else {
    // H5/React/Node等用fetch
    return fetch(url, {
      method: options.method,
      headers,
      body: options.method && options.method.toUpperCase() !== 'GET'
        ? typeof options.data === 'object' ? JSON.stringify(options.data) : options.data
        : undefined,
    })
      .then(async res => {
        const data = await res.json();
        console.log('Response from backend:', data);
        if (res.status === 200) {
          return data;
        } else {
          Taro.showToast({ title: '请求失败', icon: 'none' });
          return Promise.reject(data);
        }
      })
      .catch(error => {
        console.error('Request error:', error);
        Taro.showToast({ title: '网络错误', icon: 'none' });
        return Promise.reject(error);
      });
  }
}
