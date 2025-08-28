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
import { computed, defineComponent, toRefs } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
const { name, n } = createNameSpace("column");

export default defineComponent({
  name,
  props,
  setup(props) {
    const { data, viewport, children } = toRefs(props);
    const classes = computed(() => [n()]);
    const cols = computed(
      () => data.value?.cols?.[viewport.value] || [0.5, 0.5]
    );
    const background = computed(
      () => data.value?.background?.[viewport.value] || ""
    );
    const styles = computed(() => ({ background: background.value }));
    const itemStyle = computed(() => (item: number) => ({
      width: `${100 * item}%`,
    }));
    const itemComputed = computed(
      () => (index: number) => children.value?.[index] || []
    );
    return {
      classes,
      cols,
      background,
      styles,
      itemStyle,
      itemComputed,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
