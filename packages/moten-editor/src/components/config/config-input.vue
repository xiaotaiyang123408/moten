<template>
  <div class="config-input">
    <el-form-item :label="label" :prop="key + '.' + viewport">
      <el-input v-model="input" :placeholder="placeholder" class="input" />
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
const input = ref<string>('')
const label = ref<string>('')
const { formData, key, id } = data.value
const { title, placeholder, default: defaultValue } = data.value.properties[props.viewport]
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
  input,
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
.config-input {
  :deep(.el-input__wrapper) {
    background-color: var(--color-config-block-bg);
  }
}
</style>
