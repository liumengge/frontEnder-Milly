<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>活动管理</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">活动列表</el-menu-item>
              <el-menu-item index="1-2">活动详情</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
            <el-menu-item-group>
              <template slot="title">风衣</template>
              <el-menu-item index="2-1">长款</el-menu-item>
              <el-menu-item index="2-2">短款</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="棉服">
              <el-menu-item index="2-3">学生款</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">长筒靴</template>
              <el-menu-item index="2-4-1">8孔</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <bread-crumb />
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BreadCrumb from './views/bread-crumb.vue'

export default {
  name: 'App',
  components: {
    BreadCrumb
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
