<template>
  <div class="home">
    <BaseHeader></BaseHeader>
    <el-row class="container">
      <div class="main">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <ArticleList></ArticleList>
      </div>
      <div class="aside"></div>
    </el-row>

  </div>
</template>

<script>
  import BaseHeader from '@/components/BaseHeader'
  import ArticleList from '@/components/ArticleList'
  /*引入公共方法*/
  import {setCookie, getCookie, delCookie} from '../assets/js/cookie.js'

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
      /*页面挂载获取保存的cookie值，渲染到页面上*/
      // let uerName = getCookie('username');
      // /*如果cookie不存在，则跳转到登录页*/
      // if (uerName === "") {
      //   this.$router.push('/')
      // }
    },
    methods: {
      // quit() {
      //   /*删除cookie*/
      //   delCookie('username')
      // }
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
