<template>
  <div class="edit-config-render">
    <el-form label-width="auto">
      <div v-for="(item, index) in list" :key="index">
        <component
          v-if="getComponent(item)"
          :is="getComponent(item)"
          :data="item"
          :viewport="edit.viewport"
          @callback="callback"
          @update="update"
        >
        </component>
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { useEditStore } from '@/stores/edit'
import { batchDynamicComponents } from '@/utils'

const edit = useEditStore()
defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['callback', 'update'])
const callback = (data: any) => {
  emit('callback', data)
}
const update = (data: any) => {
  emit('update', data)
}
const getComponent = (item: any) => {
  const code = item.properties[edit.viewport].code
  return batchDynamicComponents(code, import.meta.glob('@/components/config/**/*.vue'))
}
</script>
