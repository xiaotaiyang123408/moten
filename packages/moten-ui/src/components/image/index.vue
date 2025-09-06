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
import { computed, defineComponent, toRefs } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
import MoLink from "../link/index.vue";
import MoEmpty from "../empty/index.vue";
import { inject } from "vue-demi";
const { name, n } = createNameSpace("image");
const { n: cannvasN } = createNameSpace("canvas");
export default defineComponent({
  name,
  props,
  components: {
    MoEmpty,
    MoLink,
  },
  setup(props) {
    const platform = inject("platform") as string;
    const { data, viewport, parent } = toRefs(props);
    const inCanvas = computed(() => parent.value === "canvas");
    const canvasClass = computed(() => [cannvasN()]);
    const classes = computed(() => [n()]);
    const display = computed(() => {
      if (typeof data.value?.display?.[viewport.value] === "boolean") {
        return data.value?.display?.[viewport.value];
      } else {
        return true;
      }
    });
    const src = computed(() => data.value?.src?.[viewport.value] || "");
    const link = computed(() => data.value?.link?.[viewport.value] || "");
    const width = computed(() => data.value?.width?.[viewport.value] || "");
    const height = computed(() => data.value?.height?.[viewport.value] || "");
    const left = computed(() => data.value?.left?.[viewport.value] || "");
    const top = computed(() => data.value?.top?.[viewport.value] || "");
    const positionStyle = computed(() =>
      platform !== "editor" ? { top: top, left: left } : {}
    );
    const displayStyle = computed(() => {
      if (platform === "editor") {
        return !display.value
          ? { opacity: 0.4, filter: "brightness(0.7)" }
          : {};
      } else {
        return !display.value ? { display: "none" } : {};
      }
    });
    const styles = computed(() => ({
      width: width.value,
      height: height.value,
    }));
    return {
      classes,
      inCanvas,
      canvasClass,
      styles,
      display,
      src,
      link,
      width,
      height,
      displayStyle,
      positionStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
