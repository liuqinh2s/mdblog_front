<template>
  <div class="hot-main">
    <BaseHeader selected-nav="hotNav"></BaseHeader>
    <el-row class="container">
      <div class="main">
        <ArticleList mode="hot"></ArticleList>
      </div>
      <div class="aside"></div>
    </el-row>
  </div>
</template>

<script>
  import BaseHeader from '@/components/BaseHeader'
  import ArticleList from '@/components/ArticleList'

  export default {
    components: {
      BaseHeader,
      ArticleList,
    },
    name: "Hot",
    mounted() {
      this.$store.commit("setMode", "hot")
    }
  }
</script>

<style scoped>
  .container {
    max-width: 1032px;
    width: 100%;
    margin: 0px auto;
  }

  .main {
    margin-top: 60px;
    padding-top: 30px;
    padding-right: 0;
    width: 70%;
  }

  @media screen and (max-width: 855px) {
    .main {
      width: 100%;
    }
  }
</style>
