// import Taro from '@tarojs/taro';
import { request } from '../utils/request';

const API_PREFIX = '/chat'

export const AIchat = (messages: any[]) =>
  request({ url: `${API_PREFIX}/AIchat`, method: 'POST', data: { messages } })

export const getChat = (_id: string) =>
  request({ url: `${API_PREFIX}/getChat?_id=${_id}`, method: 'GET' })

export const saveChat = (data: any) =>
  request({ url: `${API_PREFIX}/saveChat`, method: 'POST', data })

// 根据ID获取对话
export const getChatById = (_id: string) =>
  request({ url: `${API_PREFIX}/getChatById?_id=${_id}`, method: 'GET' })

// 搜索对话
export const searchChat = (q: string) =>
  request({ url: `${API_PREFIX}/searchChat?q=${q}`, method: 'GET' })

// 根据状态获取用户的对话列表
export const getChatsByStatus = async (params?: {
  status?: 'ongoing' | 'completed';
  role?: 'questioner' | 'answerer';
}) => {
  try {
    const response = await request({
      url: '/chat/getChatsByStatus',
      method: 'GET',
      data: params
    });

    return response.data;
  } catch (error) {
    console.error('获取对话列表失败:', error);
    throw error;
  }
};

// 获取提问对话（用户作为提问者）
export const getQuestionerChats = async (status?: 'ongoing' | 'completed') => {
  return getChatsByStatus({ role: 'questioner', status });
};

// 获取答题对话（用户作为回答者）
export const getAnswererChats = async (status?: 'ongoing' | 'completed') => {
  return getChatsByStatus({ role: 'answerer', status });
};

// 获取所有对话
export const getAllChats = async (status?: 'ongoing' | 'completed') => {
  return getChatsByStatus({ status });
};

// 更新对话状态
export const updateChatStatus = (chatId: string, status: 'ongoing' | 'completed') =>
  request({ url: `${API_PREFIX}/updateChatStatus`, method: 'PUT', data: { chatId, status } })


