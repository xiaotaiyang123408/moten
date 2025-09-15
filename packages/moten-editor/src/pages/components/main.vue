<template>
  <div class="list_main">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.list_main {
  width: calc(100vw - var(--edit-menu-width));
  height: calc(100vh - var(--edit-header-height));
  div {
  }
}
</style>
