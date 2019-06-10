<template>
  <div class="home">
    <BaseHeader></BaseHeader>
    <el-row class="container">
      <div class="main">
        <ArticleList mode="home"></ArticleList>
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
    data() {
      return {
        name: ''
      }
    },
    mounted() {
      this.$store.commit("setIsEditorMode", false)
    }
  }
</script>

<style scoped>
  .container{
    max-width: 1032px;
    width: 100%;
    margin: 0px auto;
  }

  .main{
    margin-top: 60px;
    padding-top: 30px;
    padding-right: 0;
    width: 70%;
    /*margin: 60px auto;*/
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  @media screen and (max-width: 855px){
    .main{
      width: 100%;
    }
  }
</style>
