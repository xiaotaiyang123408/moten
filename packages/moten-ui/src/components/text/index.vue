<script lang="ts">
import { defineComponent } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
// import { inject } from "vue-demi";
const { name, n } = createNameSpace("text");
const { n: cannvasN } = createNameSpace("canvas");
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
    classCanvas() {
      return [cannvasN()];
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
    text() {
      return this.data?.text?.[this.viewport] || "";
    },
    width() {
      return this.data?.width?.[this.viewport] || "";
    },
    height() {
      return this.data?.height?.[this.viewport] || "";
    },
    top() {
      return this.data?.top?.[this.viewport] || "";
    },
    left() {
      return this.data?.left?.[this.viewport] || "";
    },
    isCanvas() {
      return this.parent === "canvas";
    },
    styles() {
      return {
        width: this.width,
        height: this.height,
      };
    },
    stylesPosition() {
      return this.platform !== "editor"
        ? { top: this.top, left: this.left }
        : {};
    },
  },
});
//mo-image
//mo-image--disable
</script>

<template>
  <div
    :class="isCanvas ? classCanvas : classes"
    :style="[displayStyle, stylesPosition]"
  >
    <div v-if="text" class="text" v-html="text" :style="styles"></div>
    <div v-else class="empty" :style="styles">请在左侧配置区域进行编辑</div>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
@import "./canvas.scss";
</style>
