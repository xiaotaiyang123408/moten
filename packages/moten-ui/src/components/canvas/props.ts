import type { PropType } from "vue-demi";
import type { ComponentViewPort } from "@/types/component";
export type MoCanvasPropsData = {
  display?: {
    desktop: boolean;
    mobile: boolean;
  };
  background?: {
    desktop: string;
    mobile: string;
  };
  height?: {
    desktop: string;
    mobile: string;
  };
};
export type ChildComponentList = any[][];
export const props = {
  data: {
    type: Object as PropType<MoCanvasPropsData>,
    default: () => ({
      display: {
        desktop: "",
        mobile: "",
      },
      background: {
        desktop: "",
        mobile: "",
      },
      height: {
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
