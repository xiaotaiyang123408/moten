import { defineStore } from 'pinia'
import type { BaseBlock, BasePage, Viewports } from '@/types/edit'
export const useEditStore = defineStore('edit', {
  state: () => ({
    currentSelect: null as BaseBlock | null,
    viewport: 'desktop' as Viewports,
    configPanelShow: false,
    blockConfig: [] as BaseBlock[],
    pageConfig: {} as BasePage,
  }),
  actions: {
    setViewports(viewport: Viewports) {
      this.viewport = viewport
    },
    setCurrentSelect(element: BaseBlock | null) {
      this.currentSelect = element
    },
    setConfigPanelShow(value: boolean) {
      this.configPanelShow = value
    },
    setBlockConfig(value: BaseBlock[]) {
      this.blockConfig = value
    },
    setPageConfig(value: BasePage) {
      this.pageConfig = value
    },
  },
  getters: {
    isMobileViewPort: (state) => state.viewport === 'mobile',
  },
})
