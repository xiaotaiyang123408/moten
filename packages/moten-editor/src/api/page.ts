import { get, post } from '@/composable/use-request'
import type { CreatePageRequire, UpdatePageRequire } from '@/api/type/page'
export const getPageListApi = async () => {
  const res = await get('/rest/v1/page')
  return res
}
export const getPageByIdApi = async (id: number) => {
  const res = await get('/rest/v1/page:id', id)
  return res
}
export const createPageApi = async (data: CreatePageRequire) => {
  const res = await post('/rest/v1/page/create', data)
  return res
}
export const upadtePageApi = async (data: UpdatePageRequire) => {
  const res = await post('/rest/v1/page/update', data)
  return res
}
export const deletePageApi = async (id: number) => {
  const res = await post('/rest/v1/page/delete', id)
  return res
}
