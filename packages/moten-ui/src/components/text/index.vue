<script lang="ts">
import { computed, defineComponent, toRefs } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
import { inject } from "vue-demi";
const { name, n } = createNameSpace("text");
const { n: cannvasN } = createNameSpace("canvas");
//@ts-ignore
export default defineComponent({
  name,
  props,
  setup(props) {
    const platform = inject("platform") as string;
    const { data, viewport, parent } = toRefs(props);
    const classes = computed(() => [n()]);
    const classCanvas = computed(() => [cannvasN()]);
    const display = computed(() => {
      if (typeof data.value?.display?.[viewport.value] === "boolean") {
        return data.value?.display?.[viewport.value];
      } else {
        return true;
      }
    });
    const text = computed(() => data.value?.text?.[viewport.value] || "");
    const width = computed(() => data.value?.width?.[viewport.value] || "");
    const height = computed(() => data.value?.height?.[viewport.value] || "");
    const top = computed(() => data.value?.top?.[viewport.value] || "");
    const left = computed(() => data.value?.left?.[viewport.value] || "");
    const displayStyle = computed(() => {
      if (platform === "editor") {
        return !display.value
          ? { opacity: 0.4, filter: "brightness(0.7)" }
          : {};
      } else {
        return !display.value ? { display: "none" } : {};
      }
    });
    const isCanvas = computed(() => parent.value === "canvas");
    const styles = computed(() => ({
      width: width.value,
      height: height.value,
    }));
    const stylesPosition = computed(() => {
      return platform !== "editor" ? { top: top.value, left: left.value } : {};
    });
    return {
      classes,
      classCanvas,
      display,
      displayStyle,
      text,
      stylesPosition,
      isCanvas,
      styles,
    };
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
</style>
