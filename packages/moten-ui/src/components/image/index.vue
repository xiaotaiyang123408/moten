<script lang="ts">
import { computed, defineComponent, toRefs } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
import MoLink from "../link/index.vue";
import MoEmpty from "../empty/index.vue";
import { inject } from "vue-demi";
const { name, n } = createNameSpace("image");

//@ts-ignore
export default defineComponent({
  name,
  props,
  components: {
    MoLink,
    MoEmpty,
  },
  setup(props) {
    const platform = inject("platform") as string;
    const { data, viewport } = toRefs(props);
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
      styles,
      display,
      src,
      link,
      width,
      height,
      displayStyle,
    };
  },
});
//mo-image
//mo-image--disable
</script>

<template>
  <div :class="classes" :style="[displayStyle]">
    <mo-link v-if="src" :to="link" target="_blank">
      <img v-bind="$attrs" class="image" alt="" :src="src" :style="styles" />
    </mo-link>
    <div v-else class="no-image">
      <mo-empty description="暂无图片,请上传"></mo-empty>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
