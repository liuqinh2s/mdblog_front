<template>
  <div class="home">
<!--    <BaseHeader selected-nav="newNav"></BaseHeader>-->
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
        this.$http.get('http://localhost:8080/article/getArticleList?type='+this.type+'&page='+this.count).then((res) => {
          console.log(res);
          this.articles = res.body;
          this.count++
        })
      },
      loadMore(){
        this.busy = true;
        this.$http.get('http://localhost:8080/article/getArticleList?type='+this.type+'&page='+this.count).then((res) => {
          console.log(res);
          if(res.body.length===0){
            return
          }
          for(let i=0;i<res.body.length;i++){
            this.articles.push(res.body[i]);
          }
          this.count++;
          this.busy = false;
        })
      }
    },
    mounted() {
      // this.getArticles()
      this.$store.commit("setMode", "new")
      this.$store.commit("setSelectedNav", "newNav")
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
