import MoImage from "./components/image/index.vue";
import MoColumn from "./components/column/index.vue";
import MoText from "./components/text/index.vue";
import MoRow from "./components/row/index.vue";
import MoVideo from "./components/video/index.vue";
import MoCanvas from "./components/canvas/index.vue";
import imageSchema from "./components/image/schema";
import textSchema from "./components/text/schema";
import ColumnSchema from "./components/column/schema";
import RowSchema from "./components/row/schema";
import VideoSchema from "./components/video/schema";
import CanvasSchema from "./components/canvas/schema";
import { schemaAllViewport as _schemaAllViewport } from "./utils/components";
import type { App } from "vue-demi";
import "@/assets/styles/index.scss";
import { COMPONENT_PREFIX as _COMPONENT_PREFIX } from "./config/index";
export const schema = {
  image: imageSchema,
  column: ColumnSchema,
  text: textSchema,
  row: RowSchema,
  video: VideoSchema,
  canvas: CanvasSchema,
};
const components = [MoImage, MoColumn, MoText, MoRow, MoVideo, MoCanvas];

const install = (app: App, options?: { platform: "editor" | "user" }) => {
  components.forEach((component) => {
    const { name } = component;
    if (name) {
      app.component(name, component);
    }
  });
  app.provide("platform", options?.platform);
};

export default {
  install,
  MoColumn,
  MoImage,
  MoText,
  MoRow,
  MoVideo,
  MoCanvas,
};
export const COMPONENT_PREFIX = _COMPONENT_PREFIX;

export const schemaAllViewport = _schemaAllViewport;
