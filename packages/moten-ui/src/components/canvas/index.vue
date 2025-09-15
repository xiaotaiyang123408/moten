<template>
  <div :class="classes" :style="[displayStyle, styles]">
    <div class="item" :style="[itemStyle]">
      <slot :item="itemComputed"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
// import { inject } from "vue-demi";
const { name, n } = createNameSpace("canvas");

export default defineComponent({
  name,
  props,
  data() {
    return {
      platform: localStorage.getItem("$platform") || "user",
    };
  },
  computed: {
    classes() {
      return [n()];
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
    height() {
      return this.data?.height?.[this.viewport] || "";
    },
    styles() {
      return {
        background: this.background,
      };
    },
    itemStyle() {
      return {
        height: this.height,
      };
    },
    itemComputed() {
      return this.children?.[0] || [];
    },
    displayStyle() {
      if (this.platform === "editor") {
        return !this.display ? { opacity: 0.4, filter: "brightness(0.7)" } : {};
      } else {
        return !this.display ? { display: "none" } : {};
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
