import type { PropType } from "vue-demi";
export type MoLinkPropsTarget = "_blank" | "_self" | "_parent" | "_top";
export const props = {
  to: {
    type: String,
    default: "",
  },
  target: {
    type: String as PropType<MoLinkPropsTarget>,
    default: "_blank",
  },
};
