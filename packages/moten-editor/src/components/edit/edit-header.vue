<template>
  <div class="header">
    <div class="header-left">
      <div class="block">
        <v-icon-tooltip content="页面" icon="back" />
        <div class="left-item-text">页面</div>
      </div>
      <div class="line"></div>
      <v-select @change="change" v-model="viewport" />
    </div>
    <div>
      <el-button size="default">
        <v-icon icon="preview" />
        <span>预览</span>
      </el-button>
      <el-button size="default" type="primary" @click="submit">
        <v-icon icon="publish" />
        <span>发布</span>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { findNodeById } from '@/config/nested'
import { blockSchema, type BlockSchemaKeys } from '@/config/schema'
import { useEditStore } from '@/stores/edit'
import type { Viewports } from '@/types/edit'
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import { nextTick, ref, watch } from 'vue'
const ajv = new Ajv({ allErrors: true })
ajv.addKeyword({
  keyword: ['placeholder', 'rules', 'code', 'isCanvas'],
})
AjvErrors(ajv)

interface VaildateData {
  id: string
  value: object
  schema: object
}
const validateAll = ({ id, value, schema }: VaildateData) => {
  const validate = ajv.compile(schema)
  const valid = validate(value)
  if (!valid) {
    validate.errors?.forEach(async (item) => {
      const [, , pathViewport] = item.instancePath.split('/')
      viewport.value = pathViewport as Viewports
      await nextTick() //确保更新以后在进行渲染
      edit.setConfigPanelShow(true)
      edit.setViewports(pathViewport as Viewports)
      //找到对应id节点，然后填充currentSelect，在配置面板展示
      findNodeById(edit.blockConfig, id, (params: any) => {
        const { node } = params
        edit.setCurrentSelect(node)
      })
    })
  }
}
const submit = () => {
  const list = edit.blockConfig.map((item) => {
    return {
      id: item.id,
      value: item.formData,
      schema: blockSchema[item.code as BlockSchemaKeys],
    }
  })
  list.forEach((item) => {
    validateAll(item)
  })
}
const viewport = ref<Viewports>('desktop')
const edit = useEditStore()
const change = (data: Viewports) => {
  edit.setViewports(data)
}
watch(viewport, (val) => {
  edit.setViewports(val)
  edit.setConfigPanelShow(val === 'mobile')
  edit.setCurrentSelect({})
})
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: var(--edit-header-height);
  background: white;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .header-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    .block {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 16px;
      flex-shrink: 0;
      .left-item-text {
        font-size: 14px;
        padding-left: 4px;
      }
    }
    .line {
      width: 2px;
      height: 20px;
      border-left: 1px solid var(--color-border);
      padding-right: 16px;
    }
  }
}
</style>
