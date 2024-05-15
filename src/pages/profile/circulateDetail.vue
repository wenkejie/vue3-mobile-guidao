<script setup lang="ts">
import EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

definePage({
  name: 'circulateDetail',
  meta: {
    level: 2,
    title: 'circulateDetail',
    i18n: '统计数据',
  },
})

const { t } = useI18n()

const headers: Header[] = [
  { text: '用户名', value: 'player' },
  { text: '查阅情况', value: 'team' },
  { text: '答题情况', value: 'number', width: 80 },
]

const items: Item[] = [
  { player: '张三', team: 'GSW', number: 30, position: 'G', indicator: { height: '6-2', weight: 185 }, lastAttended: 'Davidson', country: 'USA' },
  { player: '李四', team: 'LAL', number: 6, position: 'F', indicator: { height: '6-9', weight: 250 }, lastAttended: 'St. Vincent-St. Mary HS (OH)', country: 'USA' },
  { player: '王五', team: 'BKN', number: 7, position: 'F', indicator: { height: '6-10', weight: 240 }, lastAttended: 'Texas-Austin', country: 'USA' },
  { player: '赵六', team: 'MIL', number: 34, position: 'F', indicator: { height: '6-11', weight: 242 }, lastAttended: 'Filathlitikos', country: 'Greece' },
]
</script>

<template>
  <Container>
    <div class="ui-grid">
      <h3 class="m-0 pb-15 pt-10">
        文件名
      </h3>
      <van-row>
        <van-col span="8">
          <p class="m-0 pb-5">
            12009
          </p>
          <p class="m-0">
            查阅总次数
          </p>
        </van-col>
        <van-col span="8">
          <p class="m-0 pb-5">
            89/1000
          </p>
          <p class="m-0">
            查阅人数
          </p>
        </van-col>
        <van-col span="8">
          <p class="m-0 pb-5">
            85<em class="font-size-5">%</em>
          </p>
          <p class="m-0">
            答题完成率
          </p>
        </van-col>
      </van-row>
    </div>
    <div>
      <EasyDataTable
        :headers="headers"
        :items="items"
        rows-per-page-message="limit:"
        alternating
        class="mt-15"
      />
    </div>
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
