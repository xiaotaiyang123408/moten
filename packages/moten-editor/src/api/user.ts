import { get, post } from '@/composable/use-request'
import type { UserDisableRequire, UserMessageRequire } from '@/api/type/user'
export const getUserListApi = async () => {
  const res = await get('/rest/v1/user')
  return res
}
export const userDisable = async (data: UserDisableRequire) => {
  const res = await get('/rest/v1/user/disable', data)
  return res
}
export const userLoginApi = async (data: UserMessageRequire) => {
  const res = await post('/rest/v1/user/login', data)
  return res
}
export const userRegisterApi = async (data: UserMessageRequire) => {
  const res = await post('/rest/v1/user/register', data)
  return res
}
