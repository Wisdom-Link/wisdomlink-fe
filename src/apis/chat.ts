import { request } from '../utils/request'

const API_PREFIX = '/chat'

export const AIchat = (messages: any[]) =>
  request({ url: `${API_PREFIX}/AIchat`, method: 'POST', data: { messages } })

export const getChat = (_id: string) =>
  request({ url: `${API_PREFIX}/getChat?_id=${encodeURIComponent(_id)}`, method: 'GET' })

export const saveChat = (data: any) =>
  request({ url: `${API_PREFIX}/saveChat`, method: 'POST', data })

// 根据ID获取对话
export const getChatById = (_id: string) =>
  request({ url: `${API_PREFIX}/getChatById?_id=${encodeURIComponent(_id)}`, method: 'GET' })

// 搜索对话
export const searchChat = (q: string) =>
  request({ url: `${API_PREFIX}/searchChat?q=${encodeURIComponent(q)}`, method: 'GET' })

// 根据状态获取用户的对话列表
export const getChatsByStatus = (userId: string, status: 'ongoing' | 'completed') =>
  request({ url: `${API_PREFIX}/getChatsByStatus?userId=${encodeURIComponent(userId)}&status=${status}`, method: 'GET' })

// 更新对话状态
export const updateChatStatus = (chatId: string, status: 'ongoing' | 'completed') =>
  request({ url: `${API_PREFIX}/updateChatStatus`, method: 'PUT', data: { chatId, status } })


