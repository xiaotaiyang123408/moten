<template>
  <div class="page_content">
    <el-table :data="tableData" style="width: 100%" show-overflow-tooltip class="page_table">
      <el-table-column prop="user_id" label="ID" width="120" />
      <el-table-column prop="body" label="name" width="180" />
      <el-table-column prop="create_time" label="createTime" width="180" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { getLogListApi } from '@/api/log'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
const tableData = ref([])
const tableDataFormat = (tableData: any) => {
  tableData.map((item: any) => {
    item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:mm:ss')
    item.body = JSON.stringify(item.body)
    return item
  })
  return tableData
}
onMounted(async () => {
  const res = await getLogListApi()
  console.log('res', res)
  //tableData.value = tableDataFormat(res.data)
})
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
