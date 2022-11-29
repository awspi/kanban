import { User } from '@/types/user'
const apiUrl = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'
export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  console.log(data)
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(await res.json())
    }
  })
}
export const register = (data: { username: string; password: string }) => {
  console.log(data)
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json())
    } else {
      return Promise.reject(await res.json())
    }
  })
}
//? 普通函数前加async一定会返回promise 就可以调用.then方法
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey)
