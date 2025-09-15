<template>
  <div class="main_page">
    <div class="page_header">
      <el-button type="primary" @click="dialogVisible = true">新建页面</el-button>
      <div class="page_search">
        <el-input
          v-model="id"
          placeholder="请输入页面ID"
          style="width: 240px; margin-right: 10px"
        />
        <el-button type="primary" @click="search">
          搜索<el-icon style="margin-left: 5px"><Search /></el-icon>
        </el-button>
      </div>
    </div>

    <div class="page_content">
      <el-table :data="tableData" style="width: 100%" show-overflow-tooltip class="page_table">
        <el-table-column prop="page_id" label="ID" width="120" />
        <el-table-column prop="name" label="name" width="180" />
        <el-table-column prop="content" label="content" width="260" />
        <el-table-column prop="create_time" label="createTime" width="180" />
        <el-table-column prop="update_time" label="updateTime" width="180" />
        <el-table-column label="Operations" min-width="120">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleDelete(scope.row)">
              删除<el-icon style="margin-left: 5px"><Delete /></el-icon>
            </el-button>
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">
              编辑<el-icon style="margin-left: 5px"><Edit /></el-icon>
            </el-button>
            <el-button type="primary" size="small" @click="dialogVisibleLog = true">
              日志
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      style="margin-left: 10px"
      v-model:current-page="page"
      v-model:page-size="size"
      layout="sizes, prev, pager, next"
      :total="50"
      :page-sizes="[10, 15, 20, 25]"
      @change="handleChange"
    />
    <el-dialog v-model="dialogVisible" :title="title" width="500">
      <el-form :model="form" label-width="120px">
        <el-form-item label="页面名">
          <el-input v-model="form.name" placeholder="请输入页面名" />
        </el-form-item>
        <el-form-item label="页面内容">
          <el-input v-model="form.content" placeholder="请输入页面内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="submit"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisibleLog" :title="title" width="500">
      <Log />
      <template #footer>
        <div>
          <el-button @click="dialogVisibleLog = false">关闭</el-button>
          <el-button type="primary" @click="dialogVisibleLog = false"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisibleDelete" title="警告" width="500">
      <span style="font-size: 16px; font-weight: bold; color: red">确定要删除{{ name }}吗?</span>
      <template #footer>
        <div>
          <el-button @click="dialogVisibleDelete = false">关闭</el-button>
          <el-button type="primary" @click="submitDelete()"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  createPageApi,
  deletePageApi,
  getPageByIdApi,
  getPageListApi,
  upadtePageApi,
} from '@/api/page'
import { useRouter } from 'vue-router'
const router = useRouter()
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { Delete, Edit, Search } from '@element-plus/icons-vue'
import Log from './log.vue'
const page = ref(1)
const size = ref(10)
const tableData = ref([])
const tableDataFormat = (tableData: any) => {
  tableData.map((item: any) => {
    item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss')
    item.update_time = dayjs(item.update_time).format('YYYY-MM-DD HH:mm:ss')
    item.content = JSON.stringify(item.content)
    return item
  })
  return tableData
}
onMounted(async () => {
  const res = await getPageListApi()
  tableData.value = tableDataFormat(res.data)
})
const id = ref<number>()
const search = async () => {
  const res = await getPageByIdApi(Number(id.value))
  tableData.value = tableDataFormat(res.data)
  id.value = undefined
}
const dialogVisibleDelete = ref(false)
const rowRef = ref()
const name = ref()
const handleDelete = async (row: any) => {
  dialogVisibleDelete.value = true
  rowRef.value = row
  name.value = row.name
}
const submitDelete = async () => {
  const res = await deletePageApi(Number(rowRef.value.page_id))
  if (res.code === 200) {
    ElMessage.success('删除成功')
    tableData.value = tableData.value.filter((item: any) => item.page_id !== rowRef.value.page_id)
  } else {
    ElMessage.error('删除失败')
  }
  dialogVisibleDelete.value = false
}
const sign = ref({
  1: '新增页面',
  0: '编辑页面',
})
const title = ref(sign.value[1])
const handleEdit = (row: any) => {
  dialogVisible.value = true
  id.value = row.page_id
  form.value.name = row.name
  form.value.content = row.content
  title.value = sign.value[0]
}
const dialogVisible = ref(false)
const dialogVisibleLog = ref(false)
const form = ref({
  name: '',
  content: '',
})
const submit = async () => {
  if (title.value === '新增页面') {
    const res = await createPageApi({
      name: form.value.name,
      content: form.value.content,
    })
    if (res.code === 200) {
      ElMessage.success('新增成功')
      const res = await getPageListApi()
      tableData.value = tableDataFormat(res.data)
    } else {
      ElMessage.error('新增失败')
    }
  } else {
    const res = await upadtePageApi({
      id: id.value as number,
      name: form.value.name,
      content: form.value.content,
    })
    if (res.code === 200) {
      ElMessage.success('编辑成功')
      const res = await getPageListApi()
      tableData.value = tableDataFormat(res.data)
    } else {
      ElMessage.error('编辑失败')
    }
  }
  form.value.name = ''
  form.value.content = ''
  dialogVisible.value = false
}

const handleChange = async () => {
  const res = await getPageListApi({
    page: page.value,
    size: size.value,
  })
  tableData.value = tableDataFormat(res.data)
}
</script>

<style lang="scss" scoped>
.main_page {
  .page_header {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 10px 20px;
    .page_search {
      display: flex;
    }
  }
  .page_content {
    width: 100%;
    padding: 10px;
    .page_table {
      height: calc(100vh - var(--edit-header-height) - 120px);
    }
  }
}
</style>
