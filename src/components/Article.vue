<template>
  <div class="main">
    <BaseHeader></BaseHeader>
    <div class="article">
      <article>
        <h1 class="title">{{title}}</h1>
        <div class="author">
          <a class="avatar">
            <img :src="avatar" alt="96" class="avatar">
          </a>
          <div class="info">
            <span class="name">
              <a href="#" class="name">{{name}}</a>
            </span>
            <b-badge href="#" variant="info">
              <i class="fas fa-plus"></i>
              关注
            </b-badge>
            <div class="meta">
              <span class="publish-time">{{time}}</span>
              <span class="words-count">字数 {{words_count}}</span>
              <span class="views-count">阅读 {{views_count}}</span>
              <span class="comments-count">评论 {{comments_count}}</span>
              <span class="likes-count">喜欢 {{likes_count}}</span>
            </div>
          </div>
        </div>
        <div ref="article"></div>
      </article>
    </div>
  </div>
</template>

<script>
  import BaseHeader from '@/components/BaseHeader'
  import Editor from '@/components/Editor.vue'

  export default {
    name: "Article",
    components: {
      BaseHeader,
      Editor
    },
    data() {
      return {
        name: "刘钦",
        title: "Hello world",
        avatar: "http://wx3.sinaimg.cn/small/006zFO3gly1flf4xnd5q9j30ku0ku75r.jpg",
        time: "2019-05-10 8:00:00",
        words_count: 1000,
        views_count: 2025,
        comments_count: 3,
        likes_count: 97
      }
    },
    mounted() {
      var md = require('turpan');
      this.$http.get("http://localhost:8080/api/v1/article/getArticle?articleId="+this.$route.params.articleId).then((res)=>{
        console.log(res)
        this.$refs.article.innerHTML = md.render(res.data.content)
      })
      // let article = ""
      // let html = md.render(article)
      // console.log(html)
      // this.$refs.main.innerHTML = html;
    },
    methods:{
    }
  }
</script>

<style scoped>

  /*@import '../assets/css/misty-light-windows.css';*/

  .markdown-body{
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  html, body{
    height: 100%;
    background-color: white;
  }

  .main{

  }

  .article {
    display: flex;
    justify-content: center;
    align-items: center;
  }



  h1 {
    font-size: 34px;
    font-weight: 700;
    line-height: 1.3;
  }

  .author {
    margin: 30px 0 40px;
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 48px;
    height: 48px;
    vertical-align: middle;
    display: inline-block;
  }

  .info {
    display: inline-block;
    margin-left: 8px;
  }

  .name{
    color: black;
    size: 16px;
  }

  .meta{
    color: #909090;
    font-size: 0.875rem;
  }

  @media screen and (min-width: 700px){
    article{
      width: 700px;
      padding: 40px 20px;
      margin-top: 60px;
    }
  }

  @media screen and (max-width: 700px){
    article{
      padding: 20px 10px;
      margin-top: 60px;
      margin-bottom: 60px;
      width: 100%;
    }
  }


</style>
