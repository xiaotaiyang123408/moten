export interface PageMessage {
  page_id: number
  name: string
  content: string
  create_time: Date
  update_time: Date
}
export type PageMessageList = PageMessage[]

export interface CreatePageRequire {
  name: string
  content: string
}

export interface UpdatePageRequire {
  id: number
  name: string
  content: string
}
