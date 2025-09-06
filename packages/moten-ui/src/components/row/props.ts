import type { PropType } from "vue-demi";
import type { ComponentViewPort } from "@/types/component";
export type MoRowsPropsData = {
  /**
   * 图片是否在对应屏幕显示
   */
  display?: {
    desktop: string;
    mobile: string;
  };
  /**
   * 背景
   */
  background?: {
    desktop: string;
    mobile: string;
  };
};
export type ChildComponentList = any[][];
export const props = {
  data: {
    type: Object as PropType<MoRowsPropsData>,
    default: () => ({
      display: {
        desktop: "",
        mobile: "",
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
    default: () => [[]],
  },
};
