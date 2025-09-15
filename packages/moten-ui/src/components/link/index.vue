<script lang="ts">
import { defineComponent } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
const { name, n } = createNameSpace("link");

//@ts-ignore
export default defineComponent({
  name,
  props,
  computed: {
    classes() {
      return [n()];
    },
    isExternalLink() {
      return this.to.match(
        /^(http:\/\/|https:\/\/|javascript:.*|tel:.*|mailto:.*)/
      );
    },
    tag() {
      if (!this.to) {
        return "span";
      }
      return this.isExternalLink ? "a" : "router-link";
    },
  },
});
//mo-image
//mo-image--disable
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :target="target"
    :class="classes"
    v-bind="$attrs"
    :href="to"
  >
    <slot></slot>
  </component>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
