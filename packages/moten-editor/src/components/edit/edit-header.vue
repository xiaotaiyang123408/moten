<template>
  <div class="header">
    <div class="header-left">
      <div class="block">
        <v-icon-tooltip content="页面" icon="back" />
        <div class="left-item-text">页面</div>
      </div>
      <div class="line"></div>
      <v-select @change="change" />
    </div>
    <div>
      <el-button size="default">
        <v-icon icon="preview" />
        <span>预览</span>
      </el-button>
      <el-button size="default" type="primary">
        <v-icon icon="publish" />
        <span>发布</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/stores/edit'
import type { Viewports } from '@/types/edit'
const edit = useEditStore()
const change = (data: Viewports) => {
  edit.setViewports(data)
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: var(--edit-header-height);
  background: white;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    .block {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 16px;
      flex-shrink: 0;
      .left-item-text {
        font-size: 14px;
        padding-left: 4px;
      }
    }
    .line {
      width: 2px;
      height: 20px;
      border-left: 1px solid var(--color-border);
      padding-right: 16px;
    }
  }
}
</style>
