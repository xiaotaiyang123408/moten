export interface PackageMessage {
  package_id: number
  name: string
  content: string
  create_time: Date
  update_time: Date
}
export type PackageMessageList = PackageMessage[]

export interface CreatePackageRequire {
  name: string
  content: string
}

export interface UpdatePackageRequire {
  id: number
  name: string
  content: string
}
