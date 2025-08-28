import type { BlockSchema, BlockSchemaKeys, PageSchema } from '@/config/schema'
export type Viewports = 'desktop' | 'mobile'

export interface BaseBlock {
  /**
   * 唯一标识
   */
  id?: string
  /**
   * 组件名
   */
  code?: string
  /**
   * 物料区标题
   */
  name?: string
  /**
   * 物料区图标
   */
  icon?: string
  /**
   * 是否嵌套
   */
  nested?: boolean
  /**
   * 嵌套子项
   */
  children?: BaseBlock[][]
  /**
   * 配置内容
   */
  formData?: Partial<BlockSchema[BlockSchemaKeys] | object>
  parent?: string
}

export type BasePage = PageSchema

export interface CallbackData {
  cols?: {
    desktop?: number[]
    mobile?: number[]
  }
  [key: string]: unknown
}
