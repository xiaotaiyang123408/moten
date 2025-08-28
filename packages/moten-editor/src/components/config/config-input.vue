<template>
  <div class="config-input">
    <el-form-item :label="label">
      <el-input v-model="input" :placeholder="placeholder" class="input" />
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
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
const emit = defineEmits(['callback'])
const input = ref<string>('')
const label = ref<string>('')
const { formData, key, id } = props.data
const { title, placeholder, default: defaultValue } = props.data.properties[props.viewport]
label.value = title

watch(
  () => formData,
  (value) => {
    input.value = value?.[props.viewport] || defaultValue
  },
  {
    immediate: true,
  },
)
watch(
  () => input.value,
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
  },
)
</script>

<style lang="scss" scoped>
.config-input {
  :deep(.el-input__wrapper) {
    background-color: var(--color-config-block-bg);
  }
}
</style>
