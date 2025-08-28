<script lang="ts">
import { computed, defineComponent, toRefs } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
const { name, n } = createNameSpace("link");

//@ts-ignore
export default defineComponent({
  name,
  props,
  setup(props) {
    const { to, target } = toRefs(props);
    const isExternalLink = computed(() => {
      return to.value.match(
        /^(http:\/\/|https:\/\/|javascript:.*|tel:.*|mailto:.*)/
      );
    });
    const classes = computed(() => [n()]);
    const tag = computed(() => {
      if (to.value) {
        return "span";
      }
      return isExternalLink.value ? "a" : "router-link";
    });
    return {
      classes,
      tag,
      target,
      to,
    };
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
