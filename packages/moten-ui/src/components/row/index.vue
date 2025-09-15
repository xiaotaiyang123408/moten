<template>
  <div :class="classes" :style="[displayStyle, styles]">
    <div class="item">
      <slot :item="itemComputed"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
// import { inject } from "vue-demi";
const { name, n } = createNameSpace("row");

export default defineComponent({
  name,
  props,
  data() {
    return {
      platform: localStorage.getItem("$platform") || "user",
    };
  },
  computed: {
    itemComputed() {
      return this.children?.[0] || [];
    },
    classes() {
      return [n()];
    },
    displayStyle() {
      if (this.platform === "editor") {
        return !this.display ? { opacity: 0.4, filter: "brightness(0.7)" } : {};
      } else {
        return !this.display ? { display: "none" } : {};
      }
    },
    display() {
      if (typeof this.data?.display?.[this.viewport] === "boolean") {
        return this.data?.display?.[this.viewport];
      }
      return true;
    },
    background() {
      return this.data?.background?.[this.viewport] || "";
    },
    styles() {
      return { background: this.background };
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
