<template>
  <div ref="box" class="edit-render-canvas">
    <template v-for="(element, index) in list" :key="index">
      <edit-render-canvas-item :box="box" :element="element" :parent="parent" />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { BaseBlock } from '@/types/edit'
import { defineProps, ref, type PropType } from 'vue'

defineProps({
  list: {
    type: Array as PropType<BaseBlock[]>,
    default: () => [],
    required: true,
  },
  parent: {
    type: String,
    required: true,
  },
})
const box = ref<HTMLElement | null>(null)
</script>
<style lang="scss" scoped>
.edit-render-canvas {
  width: 100%;
  height: 100%;
}
</style>
