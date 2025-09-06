import { get, post } from '@/composable/use-request'
export const userLoginApi = async (url: string, data: { username: string; password: string }) => {
  const res = await post(url, data)
  return res
}
export const userRegisterApi = async (
  url: string,
  data: { username: string; password: string },
) => {
  const res = await post(url, data)
  return res
}
