import type { ComponentViewPort } from "@/types/component";
import type { PropType } from "vue-demi";
export type MoImagePropsData = {
  display?: {
    desktop: boolean;
    mobile: boolean;
  };
  src?: {
    desktop: string;
    mobile: string;
  };
  link?: {
    desktop: string;
    mobile: string;
  };
  width?: {
    desktop: string;
    mobile: string;
  };
  height?: {
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
    type: Object as PropType<MoImagePropsData>,
    default: () => ({
      display: {
        desktop: true,
        mobile: true,
      },
      src: {
        desktop: "",
        mobile: "",
      },
      link: {
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
        desktop: "",
        mobile: "",
      },

      left: {
        desktop: "",
        mobile: "",
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
