<template>
  <div class="config-color">
    <el-form-item :label="label"> </el-form-item>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
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
defineEmits(['callback'])
const label = ref<string>('')
const { title } = props.data.properties[props.viewport]
label.value = title
</script>

<style lang="scss" scoped>
.config-color {
  :deep(.el-input__wrapper) {
    background-color: var(--color-config-block-bg);
  }
}
</style>
