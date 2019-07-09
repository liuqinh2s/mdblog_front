<template>
  <div class="hot-main">
    <BaseHeader selected-nav="1"></BaseHeader>
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
        this.$axios.get('/article/getArticleList?type=' + this.type + '&page=' + this.count).then((res) => {
          console.log(res);
          if (res.data.length === 0) {
            return
          }
          for (let i = 0; i < res.data.length; i++) {
            this.articles.push(res.data[i]);
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
