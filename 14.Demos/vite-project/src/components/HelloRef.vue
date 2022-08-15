<template>
  <h2>======= 学习 ref =======</h2>
  <div>
    <div>msg: { msg }}</div>
    <div>msg2: {{ msg2.name }}</div>
    <div>msg3: {{ msg3.name }}</div>
    <button @click="changeMsg">改变message</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, Ref, isRef, shallowRef, triggerRef } from 'vue'

type Obj = {
  name: string
}

const msg: Ref<string> = ref('msg')
const notRef: number = 3
const msg2: Ref<Obj> = shallowRef({
  name: 'test'
})
const msg3: Ref<Obj> = shallowRef({
  name: 'test'
})

const changeMsg = () => {
  msg.value = '改变后的'
  console.log(isRef(msg))
  console.log(isRef(notRef))

  msg2.value = { name: 'milly' } // shallowRef 创建的，可以通过 value 重新赋值的方式产生响应式，节省性能

  msg2.value.name = '小小'
  // shallowRef 创建的响应式到 .value 那一层？它里面的属性不是响应式的？因为该组件中同时引入的 ref ，并且在changeMsg中操作了ref的更新，ref的更新会造成shallowRef的视图更新

  msg3.value.name = 'Milly'  
  triggerRef(msg3)
}
</script>

<style lang="less" scoped>
  
</style>