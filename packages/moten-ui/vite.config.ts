import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { createVuePlugin } from "vite-plugin-vue2";
import { isVue2 } from "vue-demi";
const name: string = isVue2 ? "vue2" : "vue3";
// https://vite.dev/config/
export default defineConfig({
  plugins: [isVue2 ? createVuePlugin() : vue()],
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
});
