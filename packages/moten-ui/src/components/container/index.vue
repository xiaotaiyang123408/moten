<template>
  <div :class="classes" :style="styles">
    <mo-container-child :block="block" :viewport="viewport" />
  </div>
</template>

<script lang="ts">
import { createNameSpace } from "@/utils/components";
import { defineComponent } from "vue-demi";
import { props } from "./props";
import MoContainerChild from "./child.vue";

const { name, n } = createNameSpace("container");

export default defineComponent({
  name,
  props,
  components: {
    MoContainerChild,
  },
  data() {
    return {
      platform: localStorage.getItem("$platform") || "user",
    };
  },
  computed: {
    classes() {
      return [n()];
    },
    block() {
      return this.content?.block || [];
    },
    page() {
      return this.content?.page || {};
    },
    styles() {
      return { background: this.page?.background[this.viewport] };
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
