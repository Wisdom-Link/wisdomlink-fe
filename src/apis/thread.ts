import { request } from '../utils/request'

const API_PREFIX = '/thread'

export const getThread = (content: string) =>
  request({ url: `${API_PREFIX}/getThread?content=${encodeURIComponent(content)}`, method: 'GET' })

export const saveThread = (data: any) =>
  request({ url: `${API_PREFIX}/saveThread`, method: 'POST', data })

export const deleteThread = (_id: string) =>
  request({ url: `${API_PREFIX}/deleteThread`, method: 'DELETE', data: { _id } })

export const searchThread = (q: string) =>
  request({ url: `${API_PREFIX}/searchThread?q=${encodeURIComponent(q)}`, method: 'GET' })
