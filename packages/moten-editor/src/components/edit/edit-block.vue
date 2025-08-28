<template>
  <div class="block">
    <div class="left">
      <div
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        :class="{ isactive: index === activeMenu }"
        @click="activeMenu = index"
      >
        <v-icon
          :icon="index === activeMenu ? item.iconActive : item.icon"
          style="width: 40px; height: 40px"
        />
        <div class="menu-name">{{ item.name }}</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="right">
      <el-collapse v-model="activeName" class="collapse">
        <el-collapse-item title="基础组件" name="1">
          <edit-block-drag
            :list="baseBlocks"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
        <el-collapse-item title="高级组件" name="2">
          <edit-block-drag
            :list="seniorBlocks"
            :sort="false"
            :group="{ name: dragGroup, pull: 'clone', put: false }"
          />
        </el-collapse-item>
        <el-collapse-item title="画布组件" name="3">
          <edit-block-drag :list="canvasBlocks" />
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="line"></div>
  </div>
</template>

<script setup lang="ts">
import { dragGroup } from '@/config/nested'
import { ref } from 'vue'
import { baseBlocks, seniorBlocks, canvasBlocks } from '@/config/block'
const menuList = ref([
  {
    icon: 'block',
    iconActive: 'blockActive',
    name: '组件',
  },
  {
    icon: 'kit',
    iconActive: 'kitActive',
    name: '套件',
  },
])
const activeMenu = ref(0)
const activeName = ref('1')
</script>

<style lang="scss" scoped>
.block {
  flex-shrink: 0;
  width: var(--edit-block-width);
  background: white;
  height: calc(100vh - var(--edit-header-height));
  display: flex;
  overflow: scroll;
  .left {
    width: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .menu-item {
      width: 70px;
      height: 70px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 10px 0;
      &.isactive {
        background-color: var(--color-icon-hover);
      }
    }
  }
  .line {
    width: 2px;
    height: 100%;
    background-color: rgb(200, 200, 200);
  }
  .right {
    display: flex;
    justify-content: center;
    width: 220px;
    .collapse {
      width: 100%;
      padding: 10px;
    }
  }
}
</style>
