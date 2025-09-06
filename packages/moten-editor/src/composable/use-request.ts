import axios, { type AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { removeToken } from '@/utils/storage'
const router = useRouter()
const userStore = useUserStore()
const http = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 30000,
})

http.interceptors.request.use(
  (config) => {
    if (userStore.token) config.headers['Authorization'] = 'Bearer ' + userStore.token
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (res) => {
    if (res.data.code === 401) {
      userStore.setToken('')
      removeToken()
      router.push('/login')
    }
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  },
)
export async function get(url: string, data?: any, config?: AxiosRequestConfig) {
  const res = await http.get(url, { ...config, params: data })
  return res
}
export async function post(url: string, data?: any, config?: AxiosRequestConfig) {
  const res = await http.post(url, data, config)
  return res
}
