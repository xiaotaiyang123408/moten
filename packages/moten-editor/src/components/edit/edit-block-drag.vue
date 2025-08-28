<template>
  <draggable
    :list="list"
    :group="group"
    :sort="sort"
    animation="200"
    item-key="id"
    :clone="clone"
    :move="move"
    class="container"
  >
    <template #item="{ element }">
      <div class="component">
        <v-icon :icon="element.icon" style="width: 30px; height: 30px" />
        <div class="component-name">{{ element.name }}</div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { move, clone } from '@/config/nested'
defineProps({
  list: {
    type: Array,
    required: true,
    default: () => [],
  },
  group: {
    type: [String, Object],
    default: 'group',
  },
  sort: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.3%);
  .component {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
    &:hover {
      background: var(--color-block-hover);
      border: 1px solid var(--color-border);
    }
  }
}
</style>
