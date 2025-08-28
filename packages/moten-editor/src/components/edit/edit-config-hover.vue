<template>
  <div class="edit-config-hover">
    <v-icon-tooltip class="icon" icon="drag" :content="'拖拽' + name" />
    <v-icon-tooltip class="icon" icon="copy" content="复制" @click.stop="copy" />
    <v-icon-tooltip class="icon" icon="delete" content="删除" @click.stop="clear" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['copy', 'clear'])
const copy = () => {
  emit('copy', props.id)
}
const clear = () => {
  emit('clear', props.id)
}
</script>
<style scoped lang="scss">
.edit-config-hover {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  width: 100px;
  height: 40px;
  display: flex;
  padding: 5px;
  background: var(--color-edit-render-block-bg);
  box-shadow: 0px 0 7px 5px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius);
  .icon {
    :deep(.image-box) {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
