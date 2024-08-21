<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { showNotify } from 'vant'
import { fromByteArray } from 'base64-js'
import { GetUsers, getDepartments, getDocumentToken, getTransFormDetail, updateCirculationDocAnswer, updateCirculationDocStudy } from '@/api'
import router from '@/router/index'

definePage({
  name: 'starredDetail',
  meta: {
    level: 2,
    title: 'starredDetail',
    i18n: '文件信息',
  },
})
const route = useRoute()
const viewUrl = ref('')

function handleView() {
  const _id = route.query.documentId
  const _documentName = route.query.name
  // isFinished.value = route.query.isFinished;
  getDocumentToken(_id).then((res) => {
    const fileToken = res.result
    const host = location.host
    const protocol = location.protocol
    const apiUrl = import.meta.env.VITE_APP_API_HOST
    const url = apiUrl === '/' ? `${protocol}//${host}/` : apiUrl
    const newUrl = `${url}api/document/${_id}/officeviewer?token=${fileToken}&isVersion=false&fullfilename=${_documentName}`
    const byteArray = new TextEncoder().encode(newUrl)
    const stringData = fromByteArray(byteArray)
    viewUrl.value = `http://172.20.153.9:8012/onlinePreview?url=${stringData}`
  })
}

onMounted(() => {
  handleView()
})

</script>

<template>
  <Container>
    <div class="iframe-grid mt-10">
      <iframe ref="iframe" :src="viewUrl" width="100%" height="500px" frameborder="0" allowfullscreen></iframe>
    </div>
  </Container>
</template>

<style scoped>
.iframe-grid {
  display: grid;
  gap: 10px;
}

.mt10 {
  margin-top: 10px;
}

.mt-20 {
  margin-top: 20px;
}

.text-right {
  text-align: right;
}

.m-15 {
  margin: 15px;
}

.text-center {
  text-align: center;
}
</style>
