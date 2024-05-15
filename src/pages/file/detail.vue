<script setup lang="ts">
definePage({
  name: 'detail',
  meta: {
    level: 2,
    title: 'detail',
    i18n: '文件信息',
  },
})

const { t } = useI18n()

const setting = ref({
  src: "https://m.baidu.com/"
})

const fieldValue = ref('');
    const cascaderValue = ref('');
    // 选项列表，children 代表子选项，支持多级嵌套
    const options = [
      {
        text: '浙江省',
        value: '330000',
        children: [{ text: '杭州市', value: '330100' }],
      },
      {
        text: '江苏省',
        value: '320000',
        children: [{ text: '南京市', value: '320100' }],
      },
    ];
    // 全部选项选择完毕后，会触发 finish 事件
    const onFinish = ({ selectedOptions }) => {
      showLeft.value = false;
      fieldValue.value = selectedOptions.map((option) => option.text).join('/');
    };

const showLeft = ref(false);
    const showPopup = () => {
      showLeft.value = true;
    };

function seadFile() {
  console.log('onload')
}
</script>

<template>
  <Container>
    <div class="text-right mt-20">
      <van-button type="primary" class="mr-5" size="small" @click="showPopup">下发</van-button>
      <van-button type="warning" size="small">答题</van-button>
    </div>
    <iframe class="mt-10" ref="iframe" src="http://172.20.153.9:8012/onlinePreview?url=aHR0cDovLzE3Mi4xNi43MC41MDo1MDAxL2FwaS9kb2N1bWVudC9mMmQ3ZjhiNi1iMDEwLTQwZTctODE2OC0yMjY3YmQxMjhjOTgvb2ZmaWNldmlld2VyP3Rva2VuPTE3NjZlMjQ2LTk5Y2UtNDE3OC1iODc2LTc5NWIzMWQ0NDQ3ZCZpc1ZlcnNpb249ZmFsc2UmZnVsbGZpbGVuYW1lPTIwMjTosaHlsbHpqazmi4kyLmRvY3g%3D" width="100%" height="600px" style="border: 1px solid #ddd;" frameborder="0" allowfullscreen></iframe>
    <!-- 左侧弹出 -->
    <van-popup
      v-model:show="showLeft"
      position="left"
      :style="{ width: '70%', height: '100%' }"
    >
      <van-cascader
        v-model="cascaderValue"
        title="请选择下发人员"
        :options="options"
        @close="show = false"
        @finish="onFinish"
      />
    </van-popup>
  </Container>
</template>

<style lang="less">
.ui-grid {
  margin-top: 20px;
  padding-bottom: 20px;
  background-color: #fff;
  box-shadow: 2px 2px 3px #ddd;
  border-radius: 5px;
  text-align: center;
  color: #666;
}
</style>
