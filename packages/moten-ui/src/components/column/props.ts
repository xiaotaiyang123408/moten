import type { PropType } from "vue-demi";
import type { ComponentViewPort } from "@/types/component";
export type MoColumnPropsData = {
  cols?: {
    desktop?: number[];
    mobile?: number[];
    //每列所占比例
  };
  background?: {
    desktop?: string;
    mobile?: string;
  };
};
export type ChildComponentList = any[][];
export const props = {
  data: {
    type: Object as PropType<MoColumnPropsData>,
    default: () => ({
      cols: {
        desktop: [0.5, 0.5],
        mobile: [0.5, 0.5],
      },
      background: {
        desktop: "",
        mobile: "",
      },
    }),
  },
  viewport: {
    type: String as PropType<ComponentViewPort>,
    default: "desktop",
  },
  children: {
    type: Array as PropType<ChildComponentList>,
    default: () => [[], []],
  },
};
