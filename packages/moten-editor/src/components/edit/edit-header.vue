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
    <el-dialog v-model="dialogTableVisible" title="页面发布" width="700">
      <el-form :model="pageForm" :rules="pageRules" ref="pageFormRef">
        <el-form-item label="页面名" prop="name">
          <el-input v-model="pageForm.name" placeholder="请输入页面名" autocomplete="off" />
        </el-form-item>
        <div style="display: flex; justify-content: right; margin: 10px 0">
          <el-button type="primary" @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="submitPageForm(pageFormRef)">提交</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { createPageApi } from '@/api/page'
import { findNodeById } from '@/config/nested'
import { blockSchema, type BlockSchemaKeys } from '@/config/schema'
import { useEditStore } from '@/stores/edit'
import type { Viewports } from '@/types/edit'
import Ajv from 'ajv'
import AjvErrors from 'ajv-errors'
import { ElMessage, type FormInstance } from 'element-plus'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const ajv = new Ajv({ allErrors: true })
ajv.addKeyword({
  keyword: ['placeholder', 'rules', 'code', 'inCanvas'],
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
    const path = validate.errors?.[0].instancePath
    if (path) {
      const [, , pathViewport] = path.split('/')
      viewport.value = pathViewport as Viewports
      setTimeout(() => {
        edit.setViewports(pathViewport as Viewports)
      }, 0)
    }
    edit.setConfigPanelShow(true)
    findNodeById(edit.blockConfig, id, (params: any) => {
      const { node } = params
      edit.setCurrentSelect(node)
    })
    console.warn('ajv error: ', id, validate.errors?.[0].instancePath, validate.errors)
    return true
  }
}

const dialogTableVisible = ref(false)
const pageFormRef = ref()
const pageForm = ref({
  name: '',
})
const pageRules = ref({
  name: [
    { required: true, message: '请输入页面名', trigger: 'blur' },
    { min: 1, max: 20, message: '请至少输入6个字符,最多20个字符', trigger: 'blur' },
  ],
})
const submit = () => {
  const list = edit.blockConfig.map((item) => {
    return {
      id: item.id,
      value: item.formData,
      schema: blockSchema[item.code as BlockSchemaKeys],
    }
  })
  const hasError = list.some((item) => validateAll(item))
  if (hasError) {
    return
  }
  dialogTableVisible.value = true
}
const submitPageForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (!valid) {
      console.log('error submit!', fields)
      return
    }
  })
  const res = await createPageApi({
    name: pageForm.value.name,
    content: JSON.stringify({ block: edit.blockConfig, page: edit.pageConfig }),
  })
  const { code, message } = res
  if (code === 200) {
    dialogTableVisible.value = false
    ElMessage.success('发布成功')
    //router.go(-1)
  } else {
    dialogTableVisible.value = false
    ElMessage.error(message)
  }
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
  z-index: 10;
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
