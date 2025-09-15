import { get } from '@/composable/use-request'
export const getLogListApi = async () => {
  const res = await get('/rest/v1/log')
  return res
}
