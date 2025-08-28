<template>
  <div class="edit-config" :class="{ 'is-show': edit.configPanelShow }">
    <div
      class="icon-group"
      :style="{ right: edit.configPanelShow ? '285px' : '10px' }"
      @click.stop="panelSwitch"
    >
      <v-icon-tooltip
        :icon="edit.configPanelShow ? 'shrink' : 'expand'"
        :content="edit.configPanelShow ? '收起侧边栏' : '展开侧边栏'"
      />
    </div>
    <div class="content" v-show="edit.configPanelShow">
      <transition-group name="fade">
        <h3 class="title" v-if="edit.currentSelect">组件配置</h3>
        <edit-config-block v-if="edit.currentSelect" />
        <h3 class="title">页面配置</h3>
        <edit-config-page />
      </transition-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/stores/edit'
import { watch } from 'vue'
const edit = useEditStore()

const panelSwitch = () => {
  edit.setConfigPanelShow(!edit.configPanelShow)
}
watch(
  () => edit.currentSelect,
  (value) => {
    if (value?.id) {
      edit.setConfigPanelShow(true)
    }
  },
  {
    immediate: true,
  },
)
watch(
  () => edit.isMobileViewPort,
  (value) => {
    if (value) {
      edit.setConfigPanelShow(true)
    } else {
      edit.setConfigPanelShow(false)
    }
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
.edit-config {
  position: relative;
  background: white;
  height: calc(100vh - var(--edit-header-height));
  flex-shrink: 0;
  border-left: 1px solid var(--color-border);
  transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  &.is-show {
    width: var(--edit-config-width);
    height: calc(100vh - var(--edit-header-height));
    margin-right: 10px;
    transition: right 0.5s cubic-bezier(1, 0, 0.61, 1.01);
  }
  .icon-group {
    position: absolute;
    top: 10px;
    cursor: pointer;
    z-index: 3;
    padding: 8px;
    width: 30px;
    height: 30px;
    background: #fdfcfc;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10%;
    border: 1px solid var(--color-border);
  }
  .content {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    padding-left: 10px;
    .title {
      padding: 14px;
      font-size: 20px;
      font-weight: 600;
    }

    :deep(.el-tabs--border-card) {
      border: 0;
    }
    :deep(.el-tabs__content) {
      padding: 0;
    }
  }
}
</style>
