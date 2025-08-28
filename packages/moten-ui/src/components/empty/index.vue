<script lang="ts">
import { computed, defineComponent, toRefs } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
import noDataIcon from "@/assets/images/no-data.png";
const { name, n } = createNameSpace("empty");

//@ts-ignore
export default defineComponent({
  name,
  props,
  setup(props) {
    const { image, description } = toRefs(props);
    const classes = computed(() => [n()]);
    const src = computed(() => image.value || noDataIcon);
    return {
      classes,
      src,
      description,
    };
  },
});
//mo-image
//mo-image--disable
</script>

<template>
  <div :class="classes">
    <img class="image" :src="src" />
    <div class="description" v-html="description"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
