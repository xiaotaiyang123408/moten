<template>
  <div class="config-input">
    <el-form-item :label="label" :prop="key + '.' + viewport">
      <el-button text @click="table = true">点击打开富文本编辑器</el-button>
      <el-drawer v-model="table" title="富文本编辑器" direction="rtl" size="50%">
        <QuillEditor
          toolbar="essential"
          ref="quillRef"
          theme="snow"
          @textChange="textChange"
          contentType="text"
          style="overflow-y: auto"
        />
      </el-drawer>
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
const table = ref(false)
const { data } = toRefs(props)
const emit = defineEmits(['callback', 'update'])
const quillRef = ref()
const input = ref<string>('')
const textChange = () => {
  input.value = quillRef.value.getHTML()
}
const label = ref<string>('')
const { formData, key, id } = data.value
const { title, default: defaultValue } = data.value.properties[props.viewport]
label.value = title

watch(
  () => formData,
  (value) => {
    input.value = value?.[props.viewport] || defaultValue
    if (quillRef.value) quillRef.value.setHTML(input.value)
  },
  {
    immediate: true,
  },
)
watch(
  () => quillRef.value,
  (value) => {
    if (value) quillRef.value.setHTML(input.value)
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
