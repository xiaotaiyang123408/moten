<template>
  <div class="edit-config-page">
    <edit-config-render :list="list" @callback="callback"> </edit-config-render>
  </div>
</template>
<script lang="ts" setup>
import { pageSchema, type PageSchema } from '@/config/schema'
import { useEditStore } from '@/stores/edit'
import deepmerge from 'deepmerge'
import { ref } from 'vue'
const edit = useEditStore()
const properties = pageSchema.properties
const list = ref<(typeof properties)[keyof typeof properties][]>([])

const listResult = Object.fromEntries(
  Object.entries(properties).map(([key, value]) => {
    return [
      key,
      {
        ...value,
        key,
        formData: edit.pageConfig,
      },
    ]
  }),
)
list.value = [...Object.values(listResult)]

const callback = (params: { data: object }) => {
  const { data } = params
  const formData = edit.pageConfig || {}
  edit.setPageConfig(
    deepmerge.all([formData || {}, data], {
      arrayMerge: (target, source) => source,
    }) as PageSchema,
  )

  const key = Object.keys(data)[0]
  list.value.forEach((item) => {
    if (item.key === key) {
      const itemformData = deepmerge.all([item?.formData || {}, data[key]], {
        arrayMerge: (target, source) => source,
      })
      item.formData = itemformData
      return
    }
  })
}
</script>
<style scoped lang="scss">
.edit-config-block {
  width: 100%;
}
</style>
