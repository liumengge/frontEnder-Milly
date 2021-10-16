<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="item in breadCrumbList" :key="item.path">
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>

export default {
  name: 'BreadCrumb',
  computed: {
    breadCrumbList () {
      return this.$route.matched
    }
  },
  mounted () {
    console.log(this.$route.matched)
  }
}

</script>
