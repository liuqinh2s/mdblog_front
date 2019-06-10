<template>
  <ul class="article-list">
    <li v-for="article in articles">
      <div class="article">
        <div class="wrap-img">
          <a>
            <img
              v-if="article.article.image" :src="article.article.image" class="post-img"
              @click="jumpToArticle(article)">
          </a>
        </div>
        <div class="content">
          <a class="title" @click="jumpToArticle(article)">
            {{article.article.title}}
          </a>
          <p class="summary">
            {{article.article.summary}}
          </p>
          <div class="meta">
            <a class="nick-name" href="#">{{article.authorName}}</a>
            <span>
              <i class="fas fa-comment-alt"></i> {{article.commentsCount}}
            </span>
            <span>
              <i class="fas fa-heart"></i> {{article.likesCount}}
            </span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import BaseHeader from '@/components/BaseHeader'

  export default {
    name: "ArticleList",
    data() {
      return {
        articles: [],
      }
    },
    components: {
      BaseHeader,
    },
    props: ['mode'],
    methods: {
      getArticles() {
        /*接口请求*/
        let that = this;
        this.$http.get('http://localhost:8080/api/v1/article/getArticleList').then((res) => {
          console.log(res);
          that.articles = res.body;
          // console.log(that.articles)
        })
      },
      getHot() {
        let that = this;
        this.$http.get('http://localhost:8080/api/v1/article/getHotList').then((res) => {
          console.log(res);
          that.articles = res.body;
          // console.log(that.articles)
        })
      },
      jumpToArticle(article) {
        console.log(article)
        this.$store.commit("setArticleViewsCount", article.viewsCount)
        this.$store.commit("setArticleLikesCount", article.likesCount)
        this.$store.commit("setArticleCommentsCount", article.commentsCount)
        this.$store.commit("setArticleAuthorName", article.authorName)
        this.$router.push('/article/' + article.article.id)
      }
    },
    computed: {},
    mounted() {
      console.log(this.mode)
      if (this.mode === "home") {
        this.getArticles()
      }
      if (this.mode === "hot") {
        this.getHot()
      }

    }
  }
</script>

<style scoped>
  .article-list {
    min-height: 112px;
    padding: 0;
    margin-bottom: 60px;
  }

  .article-list li {
    margin: 0 0 15px;
    padding: 15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    word-wrap: break-word;
    list-style-type: none;
  }

  .title {
    margin: -7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    cursor: pointer;
    text-decoration: black;
  }

  .wrap-img {
    width: 152px;
    float: right;
    /*margin: 0 0 1em 1em;*/
  }

  /*.article{*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*  flex-direction: row-reverse;*/
  /*}*/

  .post-img {
    width: 100%;
    cursor: pointer;
  }

  .meta {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }

  .nick-name {
    margin-right: 10px;
    color: #b4b4b4;
  }

  .nick-name:hover {
    text-decoration: none;
    color: #333;
  }

  .meta span {
    margin-right: 10px;
    color: #b4b4b4;
  }

  .summary {
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
  }

  @media screen and (max-width: 855px) {
    .title {
      font-size: 1rem;
      font-weight: 600;
    }

    .summary {
      font-size: 0.875rem;
    }
  }
</style>
