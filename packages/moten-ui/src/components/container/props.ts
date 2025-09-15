import type { BaseBlock, ComponentViewPort } from "@/types/component";
import type { PropType } from "vue-demi";

export type MoContainerPropsContent = {
  /**
   * 图片是否在对应屏幕显示
   */
  block: BaseBlock[];
  page: any;
};

export const props = {
  /**
   * 数据
   */
  content: {
    type: Object as PropType<MoContainerPropsContent>,
    default: () => [],
  },
  viewport: {
    type: String as PropType<ComponentViewPort>,
    default: "desktop",
    validator(val: string) {
      return ["desktop", "mobile"].includes(val);
    },
  },
};
