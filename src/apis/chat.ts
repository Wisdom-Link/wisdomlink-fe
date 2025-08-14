import Taro from '@tarojs/taro';
import { request } from '../utils/request';

export interface ChatMessage {
  senderId: string;
  senderUsername: string;
  content: string;
  timestamp: string;
}

export interface ChatData {
  _id?: string;
  questionUserId?: string;
  questionUsername: string;
  answerUserId?: string;
  answerUsername: string;
  content: string;
  tags: string[];
  community: string; // 添加社区字段
  status: 'ongoing' | 'completed';
  messages: ChatMessage[];
}

const API_PREFIX = '/chat'

export const AIchat = (messages: any[]) =>
  request({ url: `${API_PREFIX}/AIchat`, method: 'POST', data: { messages } })

export const getChat = (_id: string) =>
  request({ url: `${API_PREFIX}/getChat?_id=${_id}`, method: 'GET' })

export const saveChat = (data: ChatData) => {
  console.log('saveChat 发送的数据:', JSON.stringify(data, null, 2));

  const token = Taro.getStorageSync('token');

  return request({
    url: `${API_PREFIX}/saveChat`,
    method: 'POST',
    data,
    header: token ? {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json'
    }
  });
};

export const getChatWithDetails = (_id: string) =>
  request({ url: `${API_PREFIX}/getChatWithDetails?chatId=${_id}`, method: 'GET' })

export const searchChat = (q: string) =>
  request({ url: `${API_PREFIX}/searchChat?q=${q}`, method: 'GET' })

// 根据状态获取用户的对话列表
export const getChatsByStatus = async (params?: {
  status?: 'ongoing' | 'completed';
}) => {
  try {
    const token = Taro.getStorageSync('token');
    if (!token) {
      throw new Error('用户未登录');
    }

    const response = await request({
      url: '/chat/getChatsByStatus',
      method: 'GET',
      data: params,
      header: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('获取对话列表失败:', error);
    throw error;
  }
};

// 根据用户角色获取对话列表
export const getChatsByUserRole = async (params: {
  role: 'questioner' | 'answerer';
  status?: 'ongoing' | 'completed';
}) => {
  try {
    const token = Taro.getStorageSync('token');
    if (!token) {
      throw new Error('用户未登录');
    }

    const response = await request({
      url: '/chat/getChatsByStatus',
      method: 'GET',
      data: params,
      header: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('根据角色获取对话列表失败:', error);
    throw error;
  }
};

// 获取提问对话（用户作为提问者）
export const getQuestionerChats = async (status?: 'ongoing' | 'completed') => {
  return getChatsByUserRole({ role: 'questioner', status });
};

// 获取答题对话（用户作为回答者）
export const getAnswererChats = async (status?: 'ongoing' | 'completed') => {
  return getChatsByUserRole({ role: 'answerer', status });
};

// 获取所有对话
export const getAllChats = async (status?: 'ongoing' | 'completed') => {
  return getChatsByStatus({ status });
};

// 更新对话状态
export const updateChatStatus = async (chatId: string, status: 'ongoing' | 'completed') => {
  try {
    const token = Taro.getStorageSync('token');
    if (!token) {
      throw new Error('用户未登录');
    }

    const response = await request({
      url: `${API_PREFIX}/updateChatStatus`,
      method: 'PUT',
      data: { chatId, status },
      header: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('更新对话状态失败:', error);
    throw error;
  }
};

// 向对话添加消息
export const addMessageToChat = async (chatId: string, content: string) => {
  try {
    const token = Taro.getStorageSync('token');
    const userInfo = Taro.getStorageSync('userInfo');

    if (!token) {
      throw new Error('用户未登录');
    }

    const response = await request({
      url: `${API_PREFIX}/addMessage`,
      method: 'POST',
      data: {
        chatId,
        content,
        senderUsername: userInfo?.username
      },
      header: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('发送消息失败:', error);
    throw error;
  }
};

// 评价用户
export const evaluateUser = async (username: string, rating: 'excellent' | 'average' | 'poor') => {
  try {
    const token = Taro.getStorageSync('token');
    if (!token) {
      throw new Error('用户未登录');
    }

    const response = await request({
      url: `${API_PREFIX}/evaluateUser`,
      method: 'POST',
      data: {
        username,
        rating
      },
      header: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('评价用户失败:', error);
    throw error;
  }
};


