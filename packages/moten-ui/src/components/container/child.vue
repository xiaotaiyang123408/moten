<template>
  <component
    :is="renderComponentCode(element)"
    v-for="(element, index) in block"
    :key="index"
    :data="element.formData"
    :parent="element.parent"
    :children="element.children"
    :viewport="viewport"
  >
    <template #default="{ item }">
      <mo-container-child :block="item" :viewport="viewport" />
    </template>
  </component>
</template>

<script lang="ts">
import { createNameSpace, renderComponentCode } from "@/utils/components";
import type { BaseBlock, ComponentViewPort } from "@/types/component";
import { defineComponent, type PropType } from "vue-demi";

const { name } = createNameSpace("container-child");

export default defineComponent({
  name,
  props: {
    block: {
      type: Array as PropType<BaseBlock[]>,
      default: () => [],
    },
    viewport: {
      type: String as PropType<ComponentViewPort>,
      default: "desktop",
      validator(val: string) {
        return ["desktop", "mobile"].includes(val);
      },
    },
  },
  methods: {
    renderComponentCode,
  },
});
</script>
