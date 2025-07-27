import Taro from '@tarojs/taro';

/**
 * 删除用户登录状态和相关数据
 */
export function clearUserData() {
  try {
    // 删除 token
    Taro.removeStorageSync('token');

    // 删除用户信息
    Taro.removeStorageSync('userInfo');

    // 删除其他可能的用户相关数据
    Taro.removeStorageSync('chatID');

    console.log('用户数据已清除');
    return true;
  } catch (error) {
    console.error('清除用户数据失败:', error);
    return false;
  }
}

/**
 * 登出并跳转到登录页
 */
export function logout() {
  try {
    clearUserData();
    Taro.showToast({ title: '已退出登录', icon: 'success' });
    Taro.reLaunch({ url: '/pages/login/index' });
  } catch (error) {
    console.error('退出登录失败:', error);
    Taro.showToast({ title: '退出失败', icon: 'error' });
  }
}

/**
 * 仅删除 token
 */
export function clearToken() {
  try {
    Taro.removeStorageSync('token');
    console.log('Token 已删除');
    return true;
  } catch (error) {
    console.error('删除 Token 失败:', error);
    return false;
  }
}
