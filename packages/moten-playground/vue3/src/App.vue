<script setup lang="ts">
import moten from "@moten/ui";
import "@moten/ui/style";
const { MoImage } = moten;
</script>

<template>
  <div class="container">
    <MoImage
      src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    ></MoImage>
  </div>
</template>

<style scoped>
.container {
  container-type: inline-size;
  width: 100vw;
}
</style>
