<template>
  <draggable
    :list="list"
    :sort="sort"
    :group="group"
    animation="200"
    item-key="id"
    :move="move"
    ghost-class="ghost-class"
    class="edit-render-drag"
  >
    <template #item="{ element }">
      <div class="element">
        <div
          v-if="element.nested && level < 2"
          class="block-nested-render"
          :class="activeClass(element)"
          @click.stop="edit.setCurrentSelect(element)"
          @mouseenter="hoverId = element.id"
          @mouseleave="hoverId = ''"
        >
          <transition name="fade">
            <edit-config-hover
              v-show="hoverId === element.id"
              :id="element.id"
              :name="element.name"
              @copy="copy"
              @clear="clear"
              style="transform: translateX(-50%) translateY(-10px)"
            />
          </transition>
          <component
            :is="renderComponentCode(element)"
            :data="element.formData"
            :viewport="edit.viewport"
            :children="element.children"
            :key="element.id"
          >
            <template #default="{ item, index }">
              <edit-render-canvas
                :class="nestedClass"
                v-if="element.code === 'canvas'"
                :key="element.id + '-canvas-' + index"
                :list="item"
                :parent="element.code"
              />
              <edit-render-drag
                v-else
                :list="item"
                :level="level + 1"
                :group="group"
                class="nested-item"
                :class="nestedClass"
                :key="element.id + '-' + index"
              />
            </template>
          </component>
        </div>
        <div
          v-else
          class="block-render"
          :class="activeClass(element)"
          @click.stop="edit.setCurrentSelect(element)"
          @mouseenter="hoverId = element.id"
          @mouseleave="hoverId = ''"
        >
          <transition name="fade">
            <edit-config-hover
              v-show="hoverId === element.id"
              :id="element.id"
              :name="element.name"
              @copy="copy"
              @clear="clear"
            />
          </transition>
          <component
            :is="renderComponentCode(element)"
            :data="element.formData"
            :viewport="edit.viewport"
          />
        </div>
      </div>
    </template>
  </draggable>
</template>
<script setup lang="ts">
import { handleNodeById, move } from '@/config/nested'
import { useEditStore } from '@/stores/edit'
const edit = useEditStore()
import { computed, defineProps, ref } from 'vue'
import { nestedClass } from '@/config/nested'
import { COMPONENT_PREFIX } from '@/config/code'
import { cloneDeep } from 'lodash'
defineOptions({ name: 'EditRenderDrag' })
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
    required: true,
  },
  group: {
    type: String,
    default: 'group',
    required: true,
  },
  sort: {
    type: Boolean,
    default: true,
  },
  //所在层级
  level: {
    type: Number,
    default: 1,
  },
})
const renderComponentCode = computed(() => {
  return (element: { code: string }) => {
    return COMPONENT_PREFIX + '-' + element.code
  }
})

const activeClass = computed(() => {
  return (element: { id: string }) => {
    const id = edit.currentSelect?.id || ''
    return { 'is-active': element.id === id }
  }
})
const hoverId = ref('')

const copy = (id: string) => {
  if (!edit.blockConfig) return
  const blockconfig = cloneDeep(edit.blockConfig)
  const newBlockConfig = handleNodeById(blockconfig, id, 'copy')
  edit.setCurrentSelect({})
  edit.setBlockConfig(newBlockConfig)
}
const clear = (id: string) => {
  if (!edit.blockConfig) return
  const blockconfig = cloneDeep(edit.blockConfig)
  const newBlockConfig = handleNodeById(blockconfig, id, 'clear')
  edit.setCurrentSelect({})
  edit.setBlockConfig(newBlockConfig)
}
</script>
<style lang="scss" scoped>
.edit-render-drag {
  width: 100%;
  height: 100%;
  .element {
    position: relative;
  }
}
.nested-item {
  border: 1px solid var(--color-edit-render-block-border);
  //   background: var(--color-edit-render-block-bg);
  height: 100%;
  min-height: inherit;
  & + .nested-item {
    border-left: 0;
  }
}
.block-nested-render,
.block-render {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
.block-nested-render {
  &:hover,
  &.is-active {
    // 注意不能像block-render做成after，否则组件无法拖入嵌套容器里
    border: 1px dashed var(--color-edit-render-block-border-hover);
  }
}
.block-render {
  position: relative;
  &:hover,
  &.is-active {
    // 在表面蒙上一层，加上边框，防止组件可以交互
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px dashed var(--color-edit-render-block-border-hover);
    }
  }
}
</style>
