<template>
  <div class="edit">
    <edit-header />
    <div class="container">
      <edit-block />
      <edit-render class="render" />
      <edit-config />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useEditStore } from '@/stores/edit'

const edit = useEditStore()

watch(
  () => edit.isMobileViewPort,
  (value) => {
    if (value) {
      edit.setConfigPanelShow(true)
    }
  },
  {
    deep: true,
  },
)
</script>

<style lang="scss" scoped>
.edit {
  position: relative;
  width: 100%;
  user-select: none;
  .container {
    position: fixed;
    top: var(--edit-header-height);
    display: flex;
    width: 100%;
    min-width: 100%;
    &.mobile-background {
      background: var(--color-bg);
    }
    // &.render {
    //   flex: 1;
    // }
  }
}
</style>
