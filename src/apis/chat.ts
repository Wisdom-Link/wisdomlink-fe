import { request } from '../utils/request'

const API_PREFIX = '/chat'

export const AIchat = (messages: any[]) =>
  request({ url: `${API_PREFIX}/AIchat`, method: 'POST', data: { messages } })

export const getChat = (_id: string) =>
  request({ url: `${API_PREFIX}/getChat?_id=${encodeURIComponent(_id)}`, method: 'GET' })

export const saveChat = (data: any) =>
  request({ url: `${API_PREFIX}/saveChat`, method: 'POST', data })


