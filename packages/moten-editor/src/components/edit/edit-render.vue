<template>
  <div class="edit-render" :class="edit.configPanelShow ? 'show-render' : ''">
    <edit-render-drag
      :list="list"
      :group="dragGroup"
      :class="edit.isMobileViewPort ? 'is-mobile' : 'is-desktop'"
      :style="pageStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { dragGroup } from '@/config/nested'
import { computed, ref, watch } from 'vue'
import { useEditStore } from '@/stores/edit'
import type { BaseBlock } from '@/types/edit'
const edit = useEditStore()
const list = ref<BaseBlock[]>([])
const pageStyle = computed(() => {
  return {
    background: edit.pageConfig.background?.[edit.viewport] || '',
  }
})
watch(
  () => list.value,
  (value) => {
    edit.setBlockConfig(value)
  },
  {
    deep: true,
  },
)
watch(
  () => edit.blockConfig,
  (value) => {
    list.value = value
  },
  {
    deep: true,
  },
)
</script>

<style lang="scss" scoped>
.edit-render {
  container-type: inline-size;
  position: relative;
  height: calc(100vh - var(--edit-header-height));
  width: calc(100vw - var(--edit-block-width));
  background: var(--color-bg);
  z-index: 1;
  overflow-x: scroll;
  &.show-render {
    width: calc(100vw - var(--edit-block-width) - var(--edit-config-width));
  }
  .is-desktop {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    background: var(--color-edit-render-block-bg);
  }
  .is-mobile {
    width: 375px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    background: var(--color-edit-render-block-bg);
  }
}
</style>
