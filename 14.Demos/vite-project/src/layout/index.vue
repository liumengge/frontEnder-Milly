<template>
  <div class="layout">
    <Menu />
    <div class="layout-right">
      <Header />
      <Content />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from './Menu/index.vue'
import Header from './Header/index.vue'
import Content from './Content/index.vue'
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  &-right {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

</style>