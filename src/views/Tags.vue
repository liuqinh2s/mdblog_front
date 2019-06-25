<template>
  <div class="tags-main">
    <BaseHeader selected-nav="2"></BaseHeader>
    <div class="tags-wrap">
<!--      <ul>-->
<!--        <li v-for="tag in concerns">-->
<!--          <div class="tag-title">{{tag.tagName}}</div>-->
<!--          <div class="info-div">-->
<!--            <span class="tag-info">{{tag.concernsCount}}关注</span>-->
<!--            <span class="tag-info">{{tag.articlesCount}}文章</span>-->
<!--          </div>-->
<!--          <div class="button-div">-->
<!--            <button>已关注</button>-->
<!--          </div>-->
<!--        </li>-->
<!--      </ul>-->

      <ul v-if="!showArticleList">
        <li v-for="tag in tags">
          <div class="tag-title" @click="getArticleListByTag(tag.tagName)">{{tag.tagName}}</div>
          <div class="info-div">
<!--            <span class="tag-info">{{tag.concernsCount}}关注</span>-->
            <span class="tag-info">{{tag.articlesCount}}文章</span>
          </div>
<!--          <div class="button-div">-->
<!--            <button>关注</button>-->
<!--          </div>-->
        </li>
      </ul>
      <div v-if="showArticleList" @click="goback" class="articles">
        <div class="go-back">
          <i class="fas fa-angle-left"></i>
          <span>返回</span>
        </div>
        <ArticleList :articles="articles"></ArticleList>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseHeader from "../components/BaseHeader";
  import ArticleList from '@/components/ArticleList'

  export default {
    name: "Tags",
    components: {BaseHeader, ArticleList},
    data() {
      return {
        tags: [],
        concerns: [],
        articles: [],
        showArticleList: false
      }
    },
    methods:{
      getArticleListByTag(tag){
        this.$http.get("https://mdblog.club/tag/getArticleListByTag?tag="+tag).then((res) => {
          console.log(res)
          this.articles = res.data
          this.showArticleList = true
        })
      },
      goback(){
        this.showArticleList = false
      }
    },
    mounted() {
      this.$store.commit('setMode', 'tags')
      this.$store.commit("setSelectedNav", "2")
      this.$http.get("https://mdblog.club/tag/getAllTags").then((res) => {
        console.log(res)
        this.tags = res.data
      })
    }
  }
</script>

<style scoped>
  .tags-wrap .articles{
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .tags-wrap {
    padding: 70px 0;
    margin: 0 auto;
    max-width: 900px;
  }

  .tags-wrap .go-back{
    margin: 1rem 0;
    cursor: pointer;
  }

  .tags-wrap .tag-title {
    font-size: 1.4rem;
    line-height: 2rem;
    color: #333;
    display: flex;
    justify-content: center;
    padding: 1rem;
    cursor: pointer;
  }

  .tags-wrap .tag-info {
    font-size: 14px;
    color: #909090;
  }

  .tags-wrap li button {
    display: block;
  }

  .tags-wrap li{
    min-height: 100px;
  }

  .tags-wrap .info-div {
    display: flex;
    justify-content: space-around;
  }

  .tags-wrap .button-div{
    display: flex;
    justify-content: center;
    padding: 1rem;
  }

  .tags-wrap .button-div button{
    background-color:  #37c700;
    border-radius: 2px;
    border: none;
    padding: 5px 1.3rem;
    outline: none;
    color: white;
    font-size: 14px;
  }

  @media screen and (min-width: 1042px) {
    .tags-wrap ul {
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    }

    .tags-wrap li {
      list-style-type: none;
      min-width: 172px;
      margin: 10px;
      border: 1px solid #f1f1f1;
    }
  }

  @media screen and (max-width: 1042px) {
    .tags-wrap ul {
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }

    .tags-wrap li {
      list-style-type: none;
      min-width: 140px;
      margin: 5px;
      border: 1px solid #f1f1f1;
    }

    .tags-wrap .tag-title {
      font-size: 1.2rem;
      line-height: 2rem;
      color: #333;
      display: flex;
      justify-content: center;
      padding: 1rem;
    }
  }
</style>
