/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { createVuePlugin } from "vite-plugin-vue2";
import { isVue2 } from "vue-demi";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
const name: string = isVue2 ? "vue2" : "vue3";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    isVue2 ? createVuePlugin() : vue(),
    tailwindcss(),
    dts({
      tsconfigPath: "tsconfig.app.json",
      insertTypesEntry: true,
      copyDtsFiles: true,
      // 指定需要为哪些文件生成类型定义
      include: ["src/**/*.d.ts", "src/**/*.vue", "src/**/*.ts"],
      outDir: `dist/${name}`,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: `dist/${name}`,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "moten",
      fileName: "moten",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "vue-demi"],
      output: {
        // Provide global variables to use in the UMD build
        // add the external deps here
        // 在UMD构建中提供全局变量
        globals: {
          vue: "Vue",
          "vue-demi": "VueDemi",
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      //配置mixin.scss混合文件的全局引入
      scss: {
        additionalData: `@import "@/assets/styles/resources.scss";`,
      },
    },
  },
  test: {
    environment: "jsdom",
    coverage: {
      include: ["src/components/**/*"],
      exclude: ["src/**/schema.ts"],
    },
  },
});
