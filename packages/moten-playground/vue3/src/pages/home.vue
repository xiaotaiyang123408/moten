<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
// import { getPageByIdAsync } from '@/api/page'
// import { userLoginAsync } from '@/api/user'
const content = ref({});
const router = useRouter();
const newContent = router.currentRoute.value.query.content;
const id = router.currentRoute.value.query.id;
if (newContent) content.value = JSON.parse(newContent);
console.log(content.value);
// const token = ref('')

// const getData = async () => {
//   if (!id) return

//   const { status, data } = await getPageByIdAsync(id, {
//     headers: {
//       Authorization: 'Bearer ' + token.value,
//     },
//   })
//   if (!status) return
//   if (data) {
//     content.value = data.content
//   }
// }
// const login = async () => {
//   const { status, data } = await userLoginAsync({
//     username: 'beibei',
//     password: '25d55ad283aa400af464c76d713c07ad',
//   })
//   if (!status) return
//   if (data) {
//     token.value = data.token
//     await getData()
//   }
// }
// if (id) {
//   login()
// }
</script>

<template>
  <div class="container">
    <mo-container v-if="content.block" :content="content" />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
}
</style>
