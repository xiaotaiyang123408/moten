<template>
  <div :class="classes" :style="styles">
    <div
      v-for="(item, index) in cols"
      :key="index"
      class="item"
      :style="itemStyle(item)"
    >
      <slot :item="itemComputed(index)" :index="index"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
const { name, n } = createNameSpace("column");

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
    cols() {
      return this.data?.cols?.[this.viewport] || [0.5, 0.5];
    },
    background() {
      return this.data?.background?.[this.viewport] || "";
    },
    styles() {
      return { background: this.background };
    },
    itemStyle() {
      return (item: number) => ({ height: `${100 * item}%` });
    },
    itemComputed() {
      return (index: number) => this.children?.[index] || [];
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
