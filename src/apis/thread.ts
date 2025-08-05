import Taro from '@tarojs/taro'
import { request } from '../utils/request'

const API_PREFIX = '/thread'

// 保存帖子
export const saveThread = (data: any) =>
  request({ url: `${API_PREFIX}/saveThread`, method: 'POST', data })

// 根据内容获取帖子
export const getThreadByContent = (content: string) =>
  request({ url: `${API_PREFIX}/getThreadByContent?content=${content}`, method: 'GET' })

// 根据ID删除帖子
export const deleteThreadById = (_id: string) =>
  request({ url: `${API_PREFIX}/deleteThreadById?_id=${_id}`, method: 'DELETE' })

// 根据社区获取帖子
export const getThreadsByCommunity = (community: string) =>
  request({ url: `${API_PREFIX}/threadsByCommunity?community=${community}`, method: 'GET' })

// 搜索帖子
export const searchThread = (q: string) =>
  request({ url: `${API_PREFIX}/searchThread?q=${q}`, method: 'GET' })

// 根据用户名获取帖子
export const getThreadsByUsername = (username: string) =>
  request({ url: `${API_PREFIX}/getThreadsByUsername?username=${username}`, method: 'GET' })

// 获取随机帖子
export const getRandomThreads = (count: number = 5) =>
  request({ url: `${API_PREFIX}/getRandomThreads?count=${count}`, method: 'GET' })

// 更新帖子
export const updateThread = async (threadId: string, updateData: {
  content?: string;
  community?: string;
  location?: string;
  tags?: string[];
}) => {
  try {
    // 获取当前用户信息
    const userInfo = Taro.getStorageSync("userInfo");
    const username = userInfo?.username;
    const token = Taro.getStorageSync('token');

    if (!username || !token) {
      throw new Error('用户未登录或缺少token');
    }

    const response = await request({
      url: `/thread/updateThread/${threadId}`,
      method: 'PUT',
      data: {
        ...updateData,
        username
      },
      header: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('更新帖子失败:', error);
    throw error;
  }
};
