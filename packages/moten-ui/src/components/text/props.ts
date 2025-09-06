import type { ComponentViewPort } from "@/types/component";
import type { PropType } from "vue-demi";
export type MoTextPropsData = {
  display?: {
    desktop: boolean;
    mobile: boolean;
  };
  text?: {
    desktop: string;
    mobile: string;
  };
  height?: {
    desktop: string;
    mobile: string;
  };
  width?: {
    desktop: string;
    mobile: string;
  };
  top?: {
    desktop: string;
    mobile: string;
  };
  left?: {
    desktop: string;
    mobile: string;
  };
};

export const props = {
  data: {
    type: Object as PropType<MoTextPropsData>,
    default: () => ({
      display: {
        desktop: true,
        mobile: true,
      },
      text: {
        desktop: "",
        mobile: "",
      },
      width: {
        desktop: "",
        mobile: "",
      },
      height: {
        desktop: "",
        mobile: "",
      },
      top: {
        desktop: "0px",
        mobile: "0px",
      },
      left: {
        desktop: "0px",
        mobile: "0px",
      },
    }),
  },
  viewport: {
    type: String as PropType<ComponentViewPort>,
    default: "desktop",
    validator(val: string) {
      return ["desktop", "mobile"].includes(val);
    },
  },
  parent: {
    type: String,
    default: "",
  },
};
