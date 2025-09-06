<template>
  <div class="edit-config-render">
    <el-form label-width="auto" :rules="rules" :model="form" ref="ruleFormRef">
      <transition-group name="fade">
        <div v-for="(item, index) in list" :key="index">
          <component
            v-if="
              (getComponent(item) && !itemCanvas(item)) ||
              (itemCanvas(item) && inCanvas && getComponent(item))
            "
            :is="getComponent(item)"
            :data="item"
            :viewport="edit.viewport"
            @callback="callback"
            @update="update"
          >
          </component>
        </div>
      </transition-group>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { transfer } from '@/config/nested'
import { type BlockSchema, type BlockSchemaKeys } from '@/config/schema'
import { useEditStore } from '@/stores/edit'
import { batchDynamicComponents } from '@/utils'
import { computed, ref, watch } from 'vue'

const edit = useEditStore()
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  schema: {
    type: Object as () => BlockSchema[BlockSchemaKeys],
    default: () => {},
  },
})
const emit = defineEmits(['callback'])
const callback = (data: any) => {
  emit('callback', data)
}
const itemCanvas = (item: any) => {
  return item.properties[edit.viewport].inCanvas
}
const inCanvas = computed(() => edit.currentSelect?.parent === 'canvas')
const getComponent = (item: any) => {
  const code = item.properties[edit.viewport].code
  return batchDynamicComponents(code, import.meta.glob('@/components/config/**/*.vue'))
}

const ruleFormRef = ref()
const form = ref<any>({})
const rules = ref(transfer(props.schema, 'rules'))

const update = (params: any) => {
  const list = Object.entries(params || {})
  list.forEach(([key, value]) => {
    form.value[key] = value
  })
}
//先对JSONschema进行校验
//然后对表单进行校验
//将rules从JSONschema中取出
const submitForm = () => {
  setTimeout(() => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid: any, fields: any) => {
      if (valid) {
        console.warn('form submit!')
        return
      }
      console.warn('form error !', fields)
    })
  }, 200)
}
//啥时候校验呢？
submitForm() //页面每次渲染进行一次校验
watch(
  () => form.value,
  () => {
    submitForm()
  },
  {
    deep: true,
  },
)
</script>
