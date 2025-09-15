import MoImage from "./components/image/index.vue";
import MoColumn from "./components/column/index.vue";
import MoText from "./components/text/index.vue";
import MoRow from "./components/row/index.vue";
import MoVideo from "./components/video/index.vue";
import MoCanvas from "./components/canvas/index.vue";
import MoContainer from "./components/container/index.vue";
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
const components = [
  MoImage,
  MoColumn,
  MoText,
  MoRow,
  MoVideo,
  MoCanvas,
  MoContainer,
];

const install = (app: App, options?: { platform: "editor" | "user" }) => {
  components.forEach((component) => {
    const { name } = component;
    if (name) {
      app.component(name, component);
    }
  });
  if (options?.platform) {
    localStorage.setItem("$platform", options?.platform);
  }
  //app.provide("platform", options?.platform);
  //app.provide 是vue3的写法，所以在打包之后，运行在vue2项目中就会报错，
  //因为vue2中没有provide，所以对这个地方进行了修改，采用localstorage进行存储
};

export default {
  install,
  MoColumn,
  MoImage,
  MoText,
  MoRow,
  MoVideo,
  MoCanvas,
  MoContainer,
};
export const COMPONENT_PREFIX = _COMPONENT_PREFIX;

export const schemaAllViewport = _schemaAllViewport;
