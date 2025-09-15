import { Type, type TSchema } from "@sinclair/typebox";
import type { App } from "vue-demi";

/**
 *
 * @param params Schema加上视口
 * @returns
 */
export const schemaAllViewport = <T extends TSchema>(params: T) => {
  return Type.Object({
    desktop: params,
    mobile: params,
  });
};
/**
 * 组件安装，组件加上install函数
 * @param component
 * @returns
 */
export const componentInstall = (component: any) => {
  component.install = function (app: App) {
    const { name } = component;
    if (name) {
      app.component(name, component);
    }
  };
  return component;
};
/**
 *
 * @param prefix 创建命名空间，包含组件名和公共class
 * @returns
 */
//mo-image
//mo-image--disable
export function createNameSpaceFn(prefix: string) {
  return (name: string) => {
    const componentName = `${prefix}-${name}`;
    const createBEM = (suffix?: string) => {
      if (!suffix) return componentName;
      return suffix.startsWith("--")
        ? `${componentName}${suffix}`
        : `${componentName}__${suffix}`;
    };
    return {
      name: componentName,
      n: createBEM,
    };
  };
}
export const createNameSpace = createNameSpaceFn("mo");

export const renderComponentCode = (element: any) => {
  return "mo-" + element.code;
};
