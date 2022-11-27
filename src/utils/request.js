import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use((config) => {
  //
  // if (store.getters.token) {
  //   config.headers.Authorization = `Bearer ${store.getters.token}`
  // }
  return config // 必须返回配置
})
/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (err) => {
    //处理token超时
    // if (err.response?.data?.code === 401) {
    //   store.dispatch('user/logout')
    // }
  }
)
export default service
