<template>
  <div class="config-files">
    <el-form-item :label="label" :prop="key + '.' + viewport">
      <el-upload
        class="avatar-uploader"
        :http-request="upload"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <v-icon v-else class="icon" icon="upload" />
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

const imageUrl = ref('')
const upload = async (data: any) => {
  const { file } = data
  console.log(file, 'file')
  await mediaUploadApi(file)
}
const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(imageUrl.value, 'imageUrl.value')
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const imageRegex = /\.(png|jpg|jpeg|gif|bmp|webp)$/i
  if (!imageRegex.test(rawFile.name)) {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
watch(
  () => formData,
  (value) => {
    imageUrl.value = value?.[props.viewport] || defaultValue
  },
  {
    immediate: true,
  },
)
watch(
  () => imageUrl.value,
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
