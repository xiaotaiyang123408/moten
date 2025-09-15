<script lang="ts">
import { defineComponent } from "vue-demi";
import { createNameSpace } from "@/utils/components";
import { props } from "./props";
import noDataIcon from "@/assets/images/no-data.png";
const { name, n } = createNameSpace("empty");

//@ts-ignore
export default defineComponent({
  name,
  props,
  computed: {
    classes() {
      return [n()];
    },
    src() {
      return this.image || noDataIcon;
    },
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
