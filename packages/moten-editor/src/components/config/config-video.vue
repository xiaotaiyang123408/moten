<template>
  <div class="config-files">
    <el-form-item :label="label" :prop="key + '.' + viewport">
      <el-upload
        :http-request="upload"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      >
        <template #trigger>
          <el-button type="primary">选择视频</el-button>
        </template>
      </el-upload>
    </el-form-item>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useFormItem, type UploadProps, ElMessage } from 'element-plus'
import { mediaUploadApi } from '@/api/media'
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

const videoUrl = ref('')
const upload = async (data: any) => {
  const { file } = data
  await mediaUploadApi(file)
}
const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  videoUrl.value = URL.createObjectURL(uploadFile.raw!)
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const videoRegex = /\.(mp4|webm|ogg|quicktime)$/i
  if (!videoRegex.test(rawFile.name)) {
    ElMessage.error('Video must be MP4 WEBM OGG QUICKTIME format!')
    return false
  }
  return true
}
watch(
  () => formData,
  (value) => {
    videoUrl.value = value?.[props.viewport] || defaultValue
  },
  {
    immediate: true,
  },
)
watch(
  () => videoUrl.value,
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

<style lang="scss" scoped></style>
