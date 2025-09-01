<template>
  <div class="edit-config-block">
    <edit-config-render :list="list" @callback="callback" :schema="schema">
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
import { type BlockSchema, blockSchema, type BlockSchemaKeys } from '@/config/schema'
import { useEditStore } from '@/stores/edit'
import type { BaseBlock } from '@/types/edit'
import deepmerge from 'deepmerge'
import { ref, watch } from 'vue'

const edit = useEditStore()
const list = ref<BaseBlock[]>([])
const schema = ref<BlockSchema[BlockSchemaKeys]>()
watch(
  () => edit.currentSelect,
  () => {
    const code = edit.currentSelect?.code as BlockSchemaKeys
    const properties = blockSchema[code]?.properties
    if (!code || !properties) {
      list.value = []
      return
    }
    schema.value = blockSchema[code]
    const { id, formData } = edit.currentSelect as any
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
    deep: true,
    immediate: true,
  },
)
const callback = (params: { data: object; id: string }) => {
  const { data, id } = params
  if (!id) return
  const blockConfig = edit.blockConfig || []
  const newBlockConfig = findNodeById(blockConfig, id, (params: any) => {
    const { array, index, node } = params
    const overwriteMerge = (_destinationArray: any, sourceArray: any) => sourceArray
    array[index].formData = deepmerge(node.formData, data, {
      arrayMerge: overwriteMerge,
    })

    if (node.nested && node.code === 'column') {
      const cols = node.formData?.cols?.desktop || [0.5, 0.5]
      const oldCols = node.children || [[], []]
      if (oldCols.length > cols.length) {
        const count = oldCols.length - cols.length
        array[index].children?.splice(oldCols.length - count, count)
      } else {
        const count = cols.length - oldCols.length
        const diff = Array.from({ length: count }, () => [])
        array[index].children?.push(...diff)
      }
    }
  })
  edit.setBlockConfig(newBlockConfig)
}
</script>
<style scoped lang="scss">
.edit-config-block {
  width: 100%;
}
</style>
