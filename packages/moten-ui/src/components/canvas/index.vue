<template>
  <div :class="classes" :style="[displayStyle, styles]">
    <div class="item" :style="[itemStyle]">
      <slot :item="itemComputed"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
import { inject } from "vue-demi";
const { name, n } = createNameSpace("canvas");

export default defineComponent({
  name,
  props,
  setup(props) {
    const platform = inject("platform") as string;
    const { data, viewport, children } = toRefs(props);

    const classes = computed(() => [n()]);
    const display = computed(() => {
      if (typeof data.value?.display?.[viewport.value] === "boolean") {
        return data.value?.display?.[viewport.value];
      } else {
        return true;
      }
    });
    const background = computed(
      () => data.value?.background?.[viewport.value] || ""
    );
    const height = computed(() => data.value?.height?.[viewport.value] || "");
    const styles = computed(() => ({
      background: background.value,
    }));
    const itemStyle = computed(() => ({
      height: height.value,
    }));

    const itemComputed = computed(() => children.value?.[0] || []);
    const displayStyle = computed(() => {
      if (platform === "editor") {
        return !display.value
          ? { opacity: 0.4, filter: "brightness(0.7)" }
          : {};
      } else {
        return !display.value ? { display: "none" } : {};
      }
    });
    return {
      display,
      classes,
      displayStyle,
      itemStyle,
      background,
      styles,
      itemComputed,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
