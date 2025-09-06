export interface UserMessageResponse {
  user_id: string
  username: string
  create_time: Date
  disable: number
  role_id: number
}
export interface UserMessageRequire {
  username: string
  password: string
}
export interface UserLoginResponse extends UserMessageResponse {
  token: string
}

export type UserMessageList = UserMessageResponse[]

export interface UserDisableRequire {
  user_id: string
  disable: number
}
