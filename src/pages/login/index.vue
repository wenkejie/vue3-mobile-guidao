<script setup lang="ts">
import { handelLogin } from '@/api'

const router = useRouter()

definePage({
  name: 'home2',
  meta: {
    title: '登录',
    i18n: '登录',
  },
})

const loginForm = ref({
  userName: '', // 944623251@qq.com
  password: '', // 123456
})

function onSubmit() {
  console.log('submit', loginForm.value)
  localStorage.clear()
  handelLogin(loginForm.value)
    .then((res) => {
      if (res) {
        const userInfo = {
          email: res.email,
          fullName: res.firstName + res.lastName,
          id: res.id,
          isAdmin: res.id,
          phoneNumber: res.phoneNumber,
          userName: res.userName,
          claimTypes: res.claimTypes,
        }
        localStorage.setItem('ZR-Token', res.bearerToken)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        if (userInfo.claimTypes.includes('*:*')){
          router.replace('/file')
        }else{
          router.replace('/transform')
        }
      }
      else {
        console.log('login error ', res)
      }
    })
}
</script>

<template>
  <Container>
    <h3 class="text-center">文件传阅学习管理系统</h3>
    <div class="data-content bg-white dark:bg-[--van-background-2]">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="loginForm.userName" name="用户名" label="用户名" placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="loginForm.password" type="password" name="密码" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
        <div class="mt50">
          <van-button round block type="primary" native-type="submit">
            确认
          </van-button>
          <van-button style="margin-top: 15px;" round block type="default" @click="loginForm = {}">
            取消
          </van-button>
        </div>
      </van-form>
    </div>
  </Container>
</template>

<style lang="less" scoped>
.data-label {
  color: #969799;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin-top: 10px;
}

.data-content {
  height: 300px;
  padding: 20px;
  line-height: 30px;
  // margin-top: 20px;
  font-size: 16px;
  border-radius: 15px;
}
</style>
