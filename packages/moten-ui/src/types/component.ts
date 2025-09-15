/**
 * 组件的视口
 */
export type ComponentViewPort = "desktop" | "mobile";

export interface BaseBlock {
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 组件名
   */
  code?: string;
  /**
   * 物料区标题
   */
  name?: string;
  /**
   * 物料区图标
   */
  icon?: string;
  /**
   * 是否嵌套
   */
  nested?: boolean;
  /**
   * 嵌套子项
   */
  children?: BaseBlock[][];
  /**
   * 配置内容
   */
  formData?: object;
  parent?: string;
}
