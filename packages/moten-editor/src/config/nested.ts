import type { BaseBlock, CallbackData } from '@/types/edit'
import { nanoid } from '@/utils/index'
import deepmerge from 'deepmerge'
import { cloneDeep } from 'lodash'

/**
 * column嵌套class
 * 用来在move里面判断是否可以嵌套
 */
export const nestedClass = 'nested-container'

/**
 * 多个draggable组件的group名
 * 相同名可以相互拖拽
 */
export const dragGroup = 'blocks'

/**
 * draggable移动事件
 * 判断是否可以拖入
 *
 */
export const move = (e: any) => {
  const classList = Array.from(e?.to?.classList)
  const isRelatedNested = classList?.includes(nestedClass)
  if (e?.draggedContext?.element?.nested && isRelatedNested) return false
  return true
}
/**
 * 克隆，添加id
 * @param e
 * @returns
 */
export const clone = (e: object) => {
  return cloneDeep({ ...e, id: nanoid(8) })
}
/**
 * 延时
 * @param delay
 * @returns
 */
export const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

/**
 * 找到相应id中的formData，进行更新
 * 因为id不一定在第一层，所以遇到嵌套时要递归调用
 */
export const findNodeById = (blockConfig: BaseBlock[], id: string, data: CallbackData) => {
  const array: BaseBlock[] = cloneDeep(blockConfig)
  for (let i = 0; i < array.length; i++) {
    const node = array[i]

    if (node.id === id) {
      node.formData = deepmerge.all([node.formData, data], {
        arrayMerge: (target, source) => source,
      })
      if (node.nested && node.children?.length && node.code === 'column') {
        const children = cloneDeep(node.children || [])
        const length = data.cols?.desktop?.length
        const childrenLength = children.length
        if (length && childrenLength < length) {
          for (let i = 0; i < length - children.length; i++) {
            children.splice(children.length, 0, [])
          }
          node.children = children
        } else {
          node.children = children.slice(0, length)
        }
      }
      return array
    }
    //该节点不匹配，检查是否为嵌套结构，若嵌套递归
    if (node.nested && node.children?.length) {
      for (let j = 0; j < node.children.length; j++) {
        node.children[j] = findNodeById(node.children[j], id, data)
      }
    }
  }
  return array
  //配置数组属性覆盖，在deepmerge合并时，相同属性使用后面一个覆盖前面一个
  //默认情况是不会进行覆盖相同属性不同值，均会被保留
  //因为我们在修改的时候，可能只会修改mobile或者desktop，如果采用Object.assign({},node.formData,data)的话，会导致另一个数据丢失
  //所以这里使用了deepmerge---库，进行合并
}

export const handleNodeById = (blockconfig: BaseBlock[], id: string, type: string) => {
  //找到对应id
  const array: BaseBlock[] = cloneDeep(blockconfig)
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    if (item.id === id) {
      if (type === 'copy') {
        const newItem = cloneDeep(item)
        newItem.id = nanoid(8)
        array.splice(i + 1, 0, newItem)
      } else {
        array.splice(i, 1)
      }
      console.log(array, 'array')
      return array
    }
    if (item.nested && item.children?.length) {
      for (let j = 0; j < item.children.length; j++) {
        item.children[j] = handleNodeById(item.children[j], id, type)
      }
    }
  }
  return array
}
