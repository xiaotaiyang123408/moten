<template>
  <div :class="inCanvas ? canvasClass : classes" :style="[displayStyle]">
    <mo-link v-if="src" :to="link" target="_blank">
      <img v-bind="$attrs" :src="src" class="image" :style="styles" />
    </mo-link>
    <div v-else class="no-image">
      <mo-empty description="暂无图片，请上传" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
import MoLink from "../link/index.vue";
import MoEmpty from "../empty/index.vue";
// import { inject } from "vue-demi";
const { name, n } = createNameSpace("image");
const { n: cannvasN } = createNameSpace("canvas");
export default defineComponent({
  name,
  props,
  components: {
    MoEmpty,
    MoLink,
  },
  data() {
    return {
      platform: localStorage.getItem("$platform") || "user",
    };
  },
  computed: {
    inCanvas() {
      return this.parent === "canvas";
    },
    canvasClass() {
      return [cannvasN()];
    },
    classes() {
      return [n()];
    },
    display() {
      if (typeof this.data?.display?.[this.viewport] === "boolean") {
        return this.data?.display?.[this.viewport];
      }
      return true;
    },
    src() {
      return this.data?.src?.[this.viewport] || "";
    },
    link() {
      return this.data?.link?.[this.viewport] || "";
    },
    width() {
      return this.data?.width?.[this.viewport] || "";
    },
    height() {
      return this.data?.height?.[this.viewport] || "";
    },
    left() {
      return this.data?.left?.[this.viewport] || "";
    },
    top() {
      return this.data?.top?.[this.viewport] || "";
    },
    positionStyle() {
      return this.inCanvas ? { top: this.top, left: this.left } : {};
    },
    displayStyle() {
      if (this.platform === "editor") {
        return !this.display ? { opacity: 0.4, filter: "brightness(0.7)" } : {};
      } else {
        return !this.display ? { display: "none" } : {};
      }
    },
    styles() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "./canvas.scss";
</style>
