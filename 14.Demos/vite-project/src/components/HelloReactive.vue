<template>
  <h2>学习下 reactive 系列</h2>
  <div>
    <div>personName：{{ person.name }}</div>
    <div>msg{{ msg }}</div>
    <div>state{{ state }}</div>
    <button @click="change">change</button>
    <button @click="change1">change1</button>
    <button @click="change2">change2</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, readonly, shallowReactive } from 'vue'

const person = reactive({
  name: 'milly'
})

const msg = reactive<number[]>([])
const change = () => {
  person.name = '小小'
  msg.push(100)
}

// shallowReactive
const obj = {
  a: 1,
  first: {
    b: 2,
    second: {
      c: 3
    }
  }
}
const state = shallowReactive(obj)
 
function change1() {
  state.a = 7
}
function change2() {
  state.first.b = 8
  state.first.second.c = 9
  console.log(state);
}

// change1()
// change2() // 如果在这里调用，深层也会被修改后展示在视图上，原因是在 DOM 挂载之前的阶段这个操作是会被生效的，如果是挂载之后操作数据就是无法被监听的
</script>