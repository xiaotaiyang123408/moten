<template>
  <div class="edit-config-block">
    <edit-config-render :list="list" @callback="callback" @update="update">
      <div v-if="!edit.currentSelect">
        <el-empty description="请在左侧拖入组件，点击组件进行配置">
          <template #image>
            <v-icon icon="dragBlank" class="icon" />
          </template>
        </el-empty>
      </div>
    </edit-config-render>
  </div>
</template>
<script lang="ts" setup>
import { findNodeById } from '@/config/nested'
import { blockSchema, type BlockSchemaKeys } from '@/config/schema'
import { useEditStore } from '@/stores/edit'
import type { BaseBlock, CallbackData } from '@/types/edit'
import deepmerge from 'deepmerge'
import { ref, watch } from 'vue'
import { cloneDeep } from 'lodash'

const edit = useEditStore()
const list = ref<BaseBlock[]>([])
watch(
  () => edit.currentSelect,
  (value) => {
    if (!value || !value.code) {
      list.value = []
      return
    }
    const code = value.code as BlockSchemaKeys
    const properties = blockSchema[code]?.properties
    if (!properties) return
    const { id, formData } = value as any
    const listResult = Object.fromEntries(
      Object.entries(properties).map(([key, value]) => {
        return [
          key,
          {
            ...value,
            id,
            key,
            formData: formData?.[key] || {},
          },
        ]
      }),
    )
    list.value = [...Object.values(listResult)]
  },
  {
    immediate: true,
    deep: true,
  },
)
const callback = (params: { data: CallbackData; id: string }) => {
  const { data, id } = params
  if (!id) return
  const blockConfig = edit.blockConfig || [] //存储所有Config信息
  const newBlockConfig = findNodeById(blockConfig, id, data)
  edit.setBlockConfig(newBlockConfig)
  if (edit.currentSelect?.id === id) {
    const currentNode = cloneDeep(edit.currentSelect)
    currentNode.formData = deepmerge.all([edit.currentSelect.formData || {}, data], {
      arrayMerge: (target, source) => source,
    })
    if (currentNode.nested && currentNode.code === 'column') {
      const children = cloneDeep(currentNode.children || [])
      const length = data.cols?.desktop?.length
      const childrenLength = children.length
      if (length && childrenLength < length) {
        for (let i = 0; i < length - children.length; i++) {
          children.splice(children.length, 0, [])
        }
        currentNode.children = children
      } else if (length) {
        currentNode.children = children.slice(0, length)
      }
    }
    edit.setCurrentSelect(currentNode)
  }
}
const update = (params: object) => {
  console.log(params, 'update')
}
</script>
<style scoped lang="scss">
.edit-config-block {
  width: 100%;
}
</style>
