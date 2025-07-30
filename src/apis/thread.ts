import { request } from '../utils/request'

const API_PREFIX = '/thread'

// 保存帖子
export const saveThread = (data: any) =>
  request({ url: `${API_PREFIX}/saveThread`, method: 'POST', data })

// 根据内容获取帖子
export const getThreadByContent = (content: string) =>
  request({ url: `${API_PREFIX}/getThreadByContent?content=${encodeURIComponent(content)}`, method: 'GET' })

// 根据ID删除帖子
export const deleteThreadById = (_id: string) =>
  request({ url: `${API_PREFIX}/deleteThreadById?_id=${encodeURIComponent(_id)}`, method: 'DELETE' })

// 根据社区获取帖子
export const getThreadsByCommunity = (community: string) =>
  request({ url: `${API_PREFIX}/getThreadsByCommunity?community=${encodeURIComponent(community)}`, method: 'GET' })

// 搜索帖子
export const searchThread = (q: string) =>
  request({ url: `${API_PREFIX}/searchThread?q=${encodeURIComponent(q)}`, method: 'GET' })

// 根据用户名获取帖子
export const getThreadsByUsername = (username: string) =>
  request({ url: `${API_PREFIX}/getThreadsByUsername?username=${encodeURIComponent(username)}`, method: 'GET' })

// 获取随机帖子
export const getRandomThreads = (count: number = 5) =>
  request({ url: `${API_PREFIX}/getRandomThreads?count=${count}`, method: 'GET' })
