<template>
  <ul class="article-list">
    <li v-for="article in articles">
      <div class="article">
        <div class="content">
          <a class="title" @click="jumpToArticle(article)">
            {{article.article.title}}
          </a>
          <div>
            <div class="wrap-img">
              <a>
                <img
                  v-if="article.article.image" :src="article.article.image" class="post-img"
                  @click="jumpToArticle(article)">
              </a>
            </div>
            <p class="summary">
              {{article.article.summary}}
            </p>
            <div class="meta">
              <a class="nick-name" href="#">{{article.authorName}}</a>
              <span>
              <i class="fas fa-comment-alt"></i> {{article.article.commentsCount}}
            </span>
              <span>
              <i class="fas fa-heart"></i> {{article.likesCount}}
            </span>
            </div>
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
      getArticles(type) {
        let that = this;
        this.$http.get('http://localhost:8080/article/getArticleList?type='+type).then((res) => {
          console.log(res);
          that.articles = res.body;
        })
      },
      jumpToArticle(article) {
        console.log(article)
        this.$router.push('/article/' + article.article.id)
      }
    },
    mounted() {
      console.log(this.mode)
      this.getArticles(this.mode)
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
    min-width: 152px;
    max-width: 152px;
    float: right;
    /*margin: 0 0 1em 1em;*/
  }

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

  @media screen and (min-width: 1042px){
    .article-list .article{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row-reverse;
    }
  }
</style>
