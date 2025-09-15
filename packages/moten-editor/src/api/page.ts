import { get, post } from '@/composable/use-request'
import type { CreatePageRequire, UpdatePageRequire } from '@/api/type/page'
export const getPageListApi = async (data?: any) => {
  const page = data?.page || 1
  const size = data?.size || 10
  const res = await get('/rest/v1/page/?page=' + page + '&size=' + size)
  return res
}
export const getPageByIdApi = async (id: number) => {
  const res = await get(`/rest/v1/page/${id}`)
  return res
}
export const createPageApi = async (data: CreatePageRequire) => {
  console.log('data', data)
  const res = await post('/rest/v1/page/create', data)
  return res
}
export const upadtePageApi = async (data: UpdatePageRequire) => {
  console.log('data', data)
  const res = await post('/rest/v1/page/update', data)
  return res
}
export const deletePageApi = async (id: number) => {
  const res = await post('/rest/v1/page/delete', { id })
  return res
}
