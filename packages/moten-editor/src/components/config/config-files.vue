<template>
  <div class="config-files">
    <el-form-item :label="label" :prop="key + '.' + viewport">
      <div class="avatar-uploader" @click="fileClick">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <v-icon v-else class="icon" icon="upload" />
      </div>
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

const imageUrl = ref('')
const label = ref<string>('')
label.value = title

const fileClick = () => {
  const urls = [
    'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
    'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
    'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
    'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
    'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
    'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
    'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
  ]
  imageUrl.value = urls[Math.floor(Math.random() * urls.length)]
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
