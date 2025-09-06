/**
 * 随机生成id
 * @param length
 * @returns
 */

import { customAlphabet } from 'nanoid'
import { defineAsyncComponent, markRaw, type Component } from 'vue'
import CryptoJS from 'crypto-js'

export const nanoid = (length = 8) => {
  const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', length)
  return nanoid()
}
//md5加密
export const md5 = (str: string) => {
  if (!str) return ''
  return CryptoJS.MD5(str).toString(CryptoJS.enc.Hex)
}

/**
 * 延迟函数
 * @param delay 延迟时间
 * @returns
 */
export const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
/**
 * 动态引入组件
 * @param name 组件名
 * @param importUrl 引入所有的组件 import.meta.glob('@/components/config/**')
 * @returns
 */
export const batchDynamicComponents = (name: string, importUrl: Record<string, Component>) => {
  const components = importUrl
  const componentMap = Object.assign(
    {},
    ...Object.keys(components).map((item) => {
      const name = item?.split('/')?.pop()?.replace('.vue', '') || ''
      return {
        [name]: components[item],
      }
    }),
  )
  const importComponent = componentMap[name]

  if (!importComponent) return ''

  return markRaw(defineAsyncComponent(importComponent))
}
