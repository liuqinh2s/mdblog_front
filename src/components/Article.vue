<template>
  <div class="article-main">
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
            <b-badge href="#" variant="info" class="concern" v-if="!isSame()">
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
        <div ref="article" class="markdown-body"></div>
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
        name: "",
        userName: "",
        userId: "",
        authorId: "",
        title: "",
        avatar: "",
        time: "",
        words_count: 0,
        views_count: 0,
        comments_count: 0,
        likes_count: 0
      }
    },
    mounted() {
      var md = require('turpan');
      this.$http.get("http://localhost:8080/api/v1/article/getArticle?articleId=" + this.$route.params.articleId).then((res) => {
        console.log(res)
        this.$refs.article.innerHTML = md.render(res.data.article.content)
        this.title = res.data.article.title
        this.words_count = res.data.article.wordsCount
        this.time = this.getTime(res.data.article.createTime)
        this.name = res.data.authorName
        this.userId = res.data.userId
        this.authorId = res.data.authorId
        this.avatar = res.data.avatar
        this.views_count = this.$store.state.article.viewsCount
        this.comments_count = this.$store.state.article.commentsCount
        this.likes_count = this.$store.state.article.likesCount
      })
    },
    methods: {
      getTime(time = +new Date()) {
        var date = new Date(time + 8 * 3600 * 1000);
        return date.toJSON().substr(0, 19).replace('T', ' ');
      },
      isSame(){
        return this.userId===this.authorId
      }
    }
  }
</script>

<style>

  html, body {
    height: 100%;
    background-color: white;
  }

  .main {

  }

  .article-main .article {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  article img {
    width: 100%;
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


  .article-main .info {
    display: inline-block;
    margin-left: 8px;
  }

  .name {
    color: black;
    size: 16px;
  }

  .meta {
    color: #909090;
    font-size: 12px;
    padding-top: 5px;
  }

  @media screen and (min-width: 700px) {
    article {
      width: 700px;
      padding: 40px 20px;
      margin-top: 60px;
    }
  }

  @media screen and (max-width: 700px) {
    article {
      padding: 20px 10px;
      margin-top: 60px;
      margin-bottom: 60px;
      width: 100%;
    }
  }

  .article-main .avatar{
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    vertical-align: middle;
    display: inline-block;
  }

  .article-main .concern{
    /*border: 1px solid #ddd;*/
    /*border-radius: 40%;*/
  }

</style>
