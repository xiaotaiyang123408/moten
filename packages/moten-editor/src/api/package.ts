import { get, post } from '@/composable/use-request'
import type { CreatePackageRequire, UpdatePackageRequire } from '@/api/type/package'
export const getPackageListApi = async () => {
  const res = await get('/rest/v1/package')
  return res
}
export const getPackageByIdApi = async (id: number) => {
  const res = await get('/rest/v1/package:id', id)
  return res
}
export const createPackageApi = async (data: CreatePackageRequire) => {
  const res = await post('/rest/v1/package/create', data)
  return res
}
export const upadtePackageApi = async (data: UpdatePackageRequire) => {
  const res = await post('/rest/v1/package/update', data)
  return res
}
export const deletePackageApi = async (id: number) => {
  const res = await post('/rest/v1/package/delete', id)
  return res
}
