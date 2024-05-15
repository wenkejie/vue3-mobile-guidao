<script setup lang="ts">
definePage({
  name: 'profile',
  meta: {
    level: 1,
    title: 'profile',
    i18n: '我的',
  },
})

const { t } = useI18n()
</script>

<template>
  <Container>
    <div mx-auto mb-60 pt-100 text-center text-16 text-dark dark:text-white>
      <van-image
        width="100"
        height="100"
        src="../../../public/img/cat.jpeg"
      />
      <p>Orange</p>
      <div class="p10">
        <van-grid square>
          <van-grid-item icon="photo-o" text="我的下发" to="/profile/circulateList" />
          <!-- <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" />
          <van-grid-item icon="photo-o" text="文字" /> -->
        </van-grid>
      </div>
    </div>
  </Container>
</template>
