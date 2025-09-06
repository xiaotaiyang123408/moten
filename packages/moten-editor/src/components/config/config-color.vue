<template>
  <div class="config-color">
    <el-form-item :label="label" :prop="data.key + '.' + viewport">
      <el-color-picker v-model="color" show-alpha />
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  viewport: {
    type: String,
    default: () => 'desktop',
  },
})
const { data } = toRefs(props)
const emit = defineEmits(['callback', 'update'])
const label = ref<string>('')
const color = ref<string>()
const { title } = props.data.properties[props.viewport]
const { formData, key, id } = data.value
label.value = title
watch(
  () => formData,
  (value) => {
    color.value = value?.[props.viewport] || ''
  },
  {
    immediate: true,
  },
)
watch(
  color,
  (value) => {
    let data = {}
    const _value = value || ''
    if (Object.values(formData || {}).length < 2) data = { desktop: _value, mobile: _value }
    else data = { [props.viewport]: _value }
    //向外面传值
    emit('callback', {
      data: {
        [key]: data,
      },
      id, //传递id，进行区分
    })
    emit('update', {
      [key]: data,
    })
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.config-color {
  :deep(.el-input__wrapper) {
    background-color: var(--color-config-block-bg);
  }
}
</style>
