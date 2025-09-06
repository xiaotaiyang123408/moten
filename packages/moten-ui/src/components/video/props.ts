import type { ComponentViewPort } from "@/types/component";
import type { PropType } from "vue-demi";
export type MoVideoPropsData = {
  display?: {
    desktop: boolean;
    mobile: boolean;
  };
  src?: {
    desktop: string;
    mobile: string;
  };
  /**
   * 是否自动播放
   */
  autoplay?: {
    desktop: boolean;
    mobile: boolean;
  };
  /**
   * 是否静音
   */
  muted?: {
    desktop: boolean;
    mobile: boolean;
  };
  width?: {
    desktop: string;
    mobile: string;
  };
  height?: {
    desktop: string;
    mobile: string;
  };
};

export const props = {
  data: {
    type: Object as PropType<MoVideoPropsData>,
    default: () => ({
      display: {
        desktop: true,
        mobile: true,
      },
      src: {
        desktop: "",
        mobile: "",
      },
      autoplay: {
        desktop: true,
        mobile: true,
      },
      muted: {
        desktop: true,
        mobile: true,
      },
      width: {
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
    validator(val: string) {
      return ["desktop", "mobile"].includes(val);
    },
  },
};
