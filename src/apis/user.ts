import { request } from '../utils/request'

const API_PREFIX = '/user'

export const login = (data: { username: string; password: string }) =>
  request({ url: `${API_PREFIX}/login`, method: 'POST', data })

export const register = (data: { username: string; password: string }) =>
  request({ url: `${API_PREFIX}/register`, method: 'POST', data })

export const getInfo = () =>
  request({ url: `${API_PREFIX}/getInfo`, method: 'GET' })

export const updateInfo = (data: any) =>
  request({ url: `${API_PREFIX}/updateInfo`, method: 'PUT', data })

export const deleteUser = (data: { username: string }) =>
  request({ url: `${API_PREFIX}/deleteUser`, method: 'DELETE', data })
