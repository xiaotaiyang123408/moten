<template>
  <div class="list_container">
    <Tabbar />
    <div class="list_content">
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <Menu :list="list" />
      </el-menu>
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Main from './components/main.vue'
import Menu from './components/menu.vue'
import Tabbar from './components/tabbar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const list = router.options.routes as Array<any>
</script>

<style lang="scss" scoped>
.list_container {
  .list_content {
    display: flex;
    width: 100vw;
    height: calc(100vh - var(--edit-header-height));
  }
}
</style>
