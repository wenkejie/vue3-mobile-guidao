<script setup lang="ts">
// import router from "@/router/index"

definePage({
  name: 'profile',
  meta: {
    level: 1,
    title: 'profile',
    i18n: '我的',
  },
})

const { t } = useI18n()
const router = useRouter()

const baseUrl = ref(`${import.meta.env.VITE_APP_PUBLIC_PATH}`)

const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')))

function loginOut() {
  localStorage.clear()
  router.replace('/login')
}

console.log(userInfo.value.claimTypes, 'claimTypes')
</script>

<template>
  <Container>
    <div mx-auto mb-60 pt-100 text-center text-16 text-dark dark:text-white>
      <van-image
        width="100"
        height="100"
        :src="`${baseUrl}/img/cat.jpeg`"
      />
      <p><span class="mr-10 inline-block v-middle">{{ userInfo.fullName }}</span><van-button class="inline-block v-middle" type="danger" size="mini" @click="loginOut">登出</van-button></p>
      <!-- <div class="p10" v-if="userInfo.claimTypes[0] === '*:*'">
        <van-grid square :gutter="10">
          <van-grid-item icon="description-o" text="我的文件" to="/file" />
          <van-grid-item icon="bar-chart-o" text="我的下发" to="/profile/circulateList" />
        </van-grid>
      </div> -->
    </div>
  </Container>
</template>
