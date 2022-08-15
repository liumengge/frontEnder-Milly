<template>
  <table>
    <thead border>
      <tr>
        <th>名称</th>
        <th>数量</th>
        <th>价格</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in shopList" :key="item.name">
        <td>{{ item.name }}</td>
        <td>
          <button @click="AddAndSub(item, false)">-</button>
          {{ item.count }}
          <button @click="AddAndSub(item, true)">+</button>
        </td>
        <td>
          {{ item.count * item.price }}
        </td>
        <td>
          <button @click="del(index)">删除</button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td></td>
        <td></td>
        <td>总价: {{ totalPrice }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'

type Shop = {
  name: string,
  count: number,
  price: number
}

const shopList = reactive<Shop[]>([
  {
    name: '连衣裙',
    count: 1,
    price: 399
  },
  {
    name: '牛仔裤',
    count: 1,
    price: 199
  }
])

const AddAndSub = (item: Shop, type: boolean = false): void => {
  if (item.count > 1 && !type) {
    item.count--
  }
  if (item.count <= 99 && type) {
    item.count++
  }
}
const del = (index: number) => {
  shopList.splice(index, 1)
}

const totalPrice = computed<number>(() => {
  return shopList.reduce((prev, next) => {
      return prev + (next.count * next.price)
   }, 0)
})
</script>

<style scoped>
tr > th, tr > td {
  width: 180px;
  text-align: center;
}
</style>