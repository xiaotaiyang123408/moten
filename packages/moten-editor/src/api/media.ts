import { get, post } from '@/composable/use-request'
export const mediaUploadApi = async (params: FormData) => {
  const res = await post('/rest/v1/media/upload', params, {
    headers: { 'Content-Type': 'application/form-data' },
  })
  console.log(res, 'res')
  return res
}
