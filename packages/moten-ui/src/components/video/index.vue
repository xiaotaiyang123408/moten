<script lang="ts">
import { defineComponent } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
import MoEmpty from "../empty/index.vue";
//import { inject } from "vue-demi";
const { name, n } = createNameSpace("video");

//@ts-ignore
export default defineComponent({
  name,
  props,
  components: {
    MoEmpty,
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
    src() {
      return this.data?.src?.[this.viewport] || "";
    },
    autoplay() {
      return this.data?.autoplay?.[this.viewport] || true;
    },
    muted() {
      return this.data?.muted?.[this.viewport] || false;
    },
    width() {
      return this.data?.width?.[this.viewport] || "";
    },
    height() {
      return this.data?.height?.[this.viewport] || "";
    },
    styles() {
      return {
        width: this.width,
        height: this.height,
      };
    },
  },
});
//mo-image
//mo-image--disable
</script>

<template>
  <div :class="classes" :style="[displayStyle]">
    <template v-if="src">
      <video
        v-bind="$attrs"
        class="video"
        :autoplay="autoplay"
        :muted="muted"
        controls
        loop
        playsinline="true"
        :src="src"
        :style="styles"
      />
    </template>
    <div v-else class="no-video">
      <mo-empty description="暂无视频,请上传"></mo-empty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
