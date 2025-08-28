import MoImage from "./components/image/index.vue";
import MoColumn from "./components/column/index.vue";
import imageSchema from "./components/image/schema";
import ColumnSchema from "./components/column/schema";
import { schemaAllViewport as _schemaAllViewport } from "./utils/components";
import type { App } from "vue-demi";
import "@/assets/styles/index.scss";
import { COMPONENT_PREFIX as _COMPONENT_PREFIX } from "./config/index";
export const schema = {
  image: imageSchema,
  column: ColumnSchema,
};
const components = [MoImage, MoColumn];

const install = (app: App, options?: {platform: 'editor' | 'user'}) => {
  components.forEach((component) => {
    const { name } = component;
    if (name) {
      app.component(name, component);
    }
  });
  app.provide('platform', options?.platform);
};

export default {
  install,
  MoColumn,
  MoImage,
};
export const COMPONENT_PREFIX = _COMPONENT_PREFIX;

export const schemaAllViewport = _schemaAllViewport;
