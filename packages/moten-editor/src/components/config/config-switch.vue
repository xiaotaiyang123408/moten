<template>
  <div class="config-files">
    <el-form-item :label="label" :prop="key + '.' + viewport">
      <el-switch v-model="videoSwitch" size="large" active-text="是" inactive-text="否" />
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useFormItem } from 'element-plus'
const { formItem } = useFormItem() //调用element-plus校验规则
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
const emit = defineEmits(['callback', 'update'])
const { formData, key, id } = props.data
const { title, default: defaultValue } = props.data.properties[props.viewport]
const label = ref<string>('')
label.value = title
const videoSwitch = ref<boolean>(true)
watch(
  () => formData,
  (value) => {
    videoSwitch.value = value?.[props.viewport] || defaultValue
  },
  {
    immediate: true,
  },
)
watch(
  () => videoSwitch.value,
  (value) => {
    formItem?.validate('change').catch((err: any) => console.warn(err))
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
.config-files {
  .avatar-uploader {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 90px;
    background: #f5f7fa;
    border: 1px dashed #c0ccda;
    border-radius: var(--border-radius);
    .avatar {
      width: 90px;
      height: 90px;
      background: cover;
      border-radius: var(--border-radius);
    }
    .icon {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
