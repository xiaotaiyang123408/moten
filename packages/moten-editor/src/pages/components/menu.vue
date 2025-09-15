<template>
  <div class="list_menu">
    <template v-for="(item, index) in list" :key="index">
      <!-- 不显示隐藏的路由 -->
      <template v-if="!item.meta?.hidden">
        <!-- 没有子路由的直接显示 -->
        <menu-item v-if="!item.children" @click="router.push(item.path)" class="menu-item">
          <el-icon v-if="item.meta?.icon" :size="24"><component :is="item.meta?.icon" /></el-icon>
          <span>{{ item.meta?.title }}</span>
        </menu-item>

        <!-- 有子路由的处理 -->
        <template v-else>
          <!-- 如果子路由只有一个，直接显示子路由 -->
          <menu-item
            v-if="item.children.length === 1 && !item.children[0].meta?.hidden"
            @click="router.push(item.children[0].path)"
            class="menu-item"
          >
            <el-icon v-if="item.children[0].meta?.icon" :size="24"
              ><component :is="item.children[0].meta?.icon"
            /></el-icon>
            <span>{{ item.children[0].meta?.title }}</span>
          </menu-item>

          <!-- 如果子路由有多个，显示子菜单 -->
          <sub-menu v-else-if="item.children.length > 1">
            <template v-for="(child, childIndex) in item.children" :key="childIndex">
              <menu-item
                v-if="!child.meta?.hidden"
                @click="router.push(child.path)"
                class="menu-item"
              >
                <el-icon v-if="child.meta?.icon" :size="24"
                  ><component :is="child.meta?.icon"
                /></el-icon>
                <span>{{ child.meta?.title }}</span>
              </menu-item>
            </template>
          </sub-menu>
        </template>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
interface RouteItem {
  meta?: {
    title?: string
    hidden?: boolean
    icon?: string
  }
  children?: RouteItem[]
  [key: string]: any
}

const props = defineProps({
  list: {
    type: Array as () => RouteItem[],
    required: true,
    default: () => [],
  },
})
</script>

<style lang="scss" scoped>
.list_menu {
  width: var(--edit-menu-width);
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: beige;
  padding: 45px 0 0 10px;
  .menu-item {
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 15px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    span {
      margin-left: 10px;
    }
    &:hover {
      background-color: #fbf3f3;
    }
    &:active {
      background-color: #eaf8fe;
    }
  }
}
</style>
