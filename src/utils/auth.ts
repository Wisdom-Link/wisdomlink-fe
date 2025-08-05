import Taro from '@tarojs/taro';

// 检查token是否过期
function isTokenExpired(token: string): boolean {
  try {
    // 假设token是JWT格式，解析payload部分
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // JWT的exp是秒数，需要转换为毫秒
    return Date.now() >= exp;
  } catch (e) {
    // 如果解析失败，认为token无效
    return true;
  }
}

// 检查用户是否已登录，未登录则跳转到登录页
export function checkAuth() {
  try {
    const token = Taro.getStorageSync('token');
    if (!token || isTokenExpired(token)) {
      // 清除过期的token
      Taro.removeStorageSync('token');
      Taro.redirectTo({ url: '/pages/login/index' });
      return false;
    }
    return true;
  } catch (e) {
    Taro.redirectTo({ url: '/pages/login/index' });
    return false;
  }
}
