<template>
  <div class="hot-main">
    <BaseHeader></BaseHeader>
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
    name: "Hot",
    data() {
      return {
        name: '',
        articles: [],
        type: 'hot',
        busy: false,
        count: 0
      }
    },
    methods:{
      loadMore() {
        this.busy = true;
        this.$http.get('http://localhost:8080/article/getArticleList?type=' + this.type + '&page=' + this.count).then((res) => {
          console.log(res);
          if (res.body.length === 0) {
            return
          }
          for (let i = 0; i < res.body.length; i++) {
            this.articles.push(res.body[i]);
          }
          this.count++;
          this.busy = false;
        })
      }
    },
    mounted() {
      // this.getArticles('hot')
      this.$store.commit("setMode", "hot")
      this.$store.commit("setSelectedNav", "1")
    }
  }
</script>

<style scoped>
  .container {
    max-width: 1032px;
    width: 100%;
    margin: 0px auto;
    padding-top: 60px;
  }

  .main {
    padding-right: 0;
    width: 70%;
  }

  @media screen and (max-width: 855px) {
    .main {
      width: 100%;
    }
  }
</style>
