import Taro from '@tarojs/taro'
import { request } from '../utils/request'

const API_PREFIX = '/chat'

export const AIchat = (messages: any[]) =>
  request({ url: `${API_PREFIX}/AIchat`, method: 'POST', data: { messages } })

export const getChat = (_id: string) =>
  request({ url: `${API_PREFIX}/getChat`, method: 'GET', data: { _id } })

export const saveChat = (data: any) =>
  request({ url: `${API_PREFIX}/saveChat`, method: 'POST', data })

export const connectOneOneChat = (token: string) =>
  Taro.connectSocket({
    url: `${process.env.API_BASE_URL || ''}/chat/oneoneChat`,
    header: { Authorization: `Bearer ${token}` },
    protocols: ['websocket']
  })
