<template>
  <div class="home">
    <BaseHeader selected-nav="0"></BaseHeader>
    <el-row class="container">
      <div class="main" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <ArticleList :articles="articles"></ArticleList>
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
        name: '',
        type: 'new',
        articles: [],
        busy: false,
        count: 0
      }
    },
    methods:{
      getArticles() {
        this.$axios.get('/article/getArticleList?type='+this.type+'&page='+this.count).then((res) => {
          console.log(res);
          this.articles = res.data;
          this.count++
        })
      },
      loadMore(){
        this.busy = true;
        this.$axios.get('/article/getArticleList?type='+this.type+'&page='+this.count).then((res) => {
          console.log(res);
          if(res.data.length===0){
            return
          }
          for(let i=0;i<res.data.length;i++){
            this.articles.push(res.data[i]);
          }
          this.count++;
          this.busy = false;
        })
      }
    },
    mounted() {
      // this.getArticles()
      this.$store.commit("setMode", "new")
      // this.$store.commit("setSelectedNav", "0")
    }
  }
</script>

<style scoped>
  .container{
    max-width: 1032px;
    width: 100%;
    margin: 0px auto;
    padding-top: 60px;
  }

  .main{
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
