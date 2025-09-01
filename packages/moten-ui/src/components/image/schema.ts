import { Type } from "@sinclair/typebox";
import { schemaAllViewport } from "@/utils/components";
import type { Static } from "@sinclair/typebox/type";

const display = Type.Boolean({
  code: "config-viewport",
  title: "屏幕",
  default: true,
  errorMessage: {
    required: "选择一项即可",
  },
  rules: [{ required: true, message: "选择一项即可", trigger: "change" }],
});
const src = Type.String({
  code: "config-files",
  title: "图片",
  default: "",
  minLength: 1,
  errorMessage: {
    required: "最少一个字符",
    minLength: "最少一个字符",
  },
  rules: [
    {
      required: true,
      min: 1,
      message: "最少一个字符",
      trigger: "change",
    },
  ],
});
const link = Type.String({
  code: "config-input",
  title: "链接",
  default: "",
  placeholder: "请输入链接",
  minLength: 1,
  errorMessage: {
    required: "最少一个字符",
    minLength: "最少一个字符",
  },
  rules: [
    {
      required: true,
      min: 1,
      message: "最少一个字符",
      trigger: "change",
    },
  ],
});
const height = Type.String({
  code: "config-input",
  title: "高度",
  default: "295px",
  placeholder: "请输入高度",
  minLength: 1,
  errorMessage: {
    required: "最少一个字符",
    minLength: "最少一个字符",
  },
  rules: [
    {
      required: true,
      min: 1,
      message: "最少一个字符",
      trigger: "change",
    },
  ],
});
const width = Type.String({
  code: "config-input",
  title: "宽度",
  default: "100%",
  placeholder: "请输入宽度",
  minLength: 1,
  errorMessage: {
    required: "最少一个字符",
    minLength: "最少一个字符",
  },
  rules: [
    {
      required: true,
      min: 1,
      message: "最少一个字符",
      trigger: "change",
    },
  ],
});
const schema = Type.Object({
  display: schemaAllViewport(display),
  src: schemaAllViewport(src),
  link: schemaAllViewport(link),
  width: schemaAllViewport(width),
  height: schemaAllViewport(height),
});

type MoImageSchema = Static<typeof schema>;
export default schema;
export type { MoImageSchema };
