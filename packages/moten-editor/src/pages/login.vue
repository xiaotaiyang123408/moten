<template>
  <el-row>
    <el-col :span="12" :xs="0" />
    <el-col :span="12" :xs="24">
      <div class="login-container">
        <el-form label-width="auto" :model="form" :rules="rules" v-show="loginSign">
          <div class="form-title">欢迎登录 Moten</div>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="form.password" type="password" show placeholder="请输入密码" />
          </el-form-item>
          <div style="display: flex; justify-content: right">
            <el-button type="primary" style="width: 80%" @click="submitLogin">登录</el-button>
          </div>
          <div
            @click="loginSign = false"
            style="display: flex; justify-content: right; cursor: pointer; margin-top: 10px"
          >
            <span style="color: #fff">没有账号?去注册</span>
          </div>
        </el-form>
        <el-form label-width="auto" :model="form" :rules="rules" v-show="!loginSign">
          <div class="form-title">欢迎注册 Moten系统</div>
          <el-form-item prop="username" label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              v-model="form.password"
              type="password"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item prop="password" label="确认密码">
            <el-input
              v-model="form.configPassword"
              type="password"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>

          <div style="display: flex; justify-content: space-between">
            <el-icon
              :size="20"
              :color="'#fff'"
              @click="loginSign = true"
              style="cursor: pointer; margin-top: 10px"
            >
              <Back />
            </el-icon>
            <el-button type="primary" style="width: 80%" @click="submitRegister">注册</el-button>
          </div>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { userLoginApi, userRegisterApi } from '@/api/user'
import { ref } from 'vue'
import { Back } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { md5 } from '@/utils'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const router = useRouter()
const loginSign = ref(true)
const form = ref({
  username: '',
  password: '',
  configPassword: '',
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 6, max: 20, message: '请至少输入6个字符,最多20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 32, message: '请至少输入8个字符,最多32个字符', trigger: 'blur' },
  ],
}
interface User {
  username: string
  password: string
}
const submitLogin = async () => {
  form.value.password = md5(form.value.password)
  const data: User = {
    username: form.value.username,
    password: form.value.password,
  }
  const res = await userLoginApi('/rest/v1/user/login', data)
  if (res.code === 200) {
    ElMessage.success('登录成功')
    userStore.setToken(res.data.token)
    userStore.setRoleId(res.data.role_id)
    router.push('/')
  } else {
    ElMessage.error('登录失败! ' + res.message)
  }
}
const submitRegister = async () => {
  if (form.value.password !== form.value.configPassword) {
    form.value.configPassword = ''
    alert('两次密码不一致')
    return
  }
  form.value.password = md5(form.value.password)
  form.value.configPassword = md5(form.value.configPassword)
  const data = {
    username: form.value.username,
    password: form.value.password,
  }
  const res = await userRegisterApi('/rest/v1/user/register', data)
  if (res.code === 200) {
    ElMessage.success('注册成功')
    loginSign.value = true
  } else {
    ElMessage.error('注册失败! ' + res.message)
  }
}
</script>
<style scoped lang="scss">
.el-row {
  height: 100vh;
  width: 100vw;
  background: url(@/assets/images/background.jpg) no-repeat;
  .login-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      padding: 20px;
      .form-title {
        font-size: 24px;
        font-weight: bold;
        color: #fff;
        text-align: center;
        margin-bottom: 27px;
      }
      width: 400px;
      height: 300px;
      border-radius: 10px;
      background: url(@/assets/images/login_form.png) no-repeat;
      :deep {
        .el-form-item__label {
          color: #fff;
        }
      }
    }
  }
}
</style>
