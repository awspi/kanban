import qs from 'qs'
import * as auth from '@/auth-provider'
import { useAuth } from '@/context/auth-context'
const apiUrl = process.env.REACT_APP_API_URL
/**
 *
 * @param endpoint /xxx
 * @param param1
 * @returns
 */
interface Config extends RequestInit {
  token?: string
  data?: object
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig //覆盖前面的默认值
  }
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return await window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (res) => {
      if (res.status === 401) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({ message: '请重新登录' })
      }
      const data = await res.json()
      if (res.ok) {
        return data
      } else {
        console.log('errrrr')

        return Promise.reject(data)
      }
    })
}
/**
 * 自动携带token
 * @returns
 */
export const useHttp = () => {
  const { user } = useAuth()
  // return ([endpoint,config]:[string,Config])=>http(endpoint,{...config,token:user?.token})
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token })
}
