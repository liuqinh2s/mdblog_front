<template>
  <ul class="article-list">
    <li v-for="article in articles">
      <div class="article">
        <div class="content">
          <a class="title" @click="jumpToArticle(article)">
            {{article.title}}
          </a>
          <div class="wrap">
            <div class="wrap-content">
              <p class="summary">
                {{article.summary}}
              </p>
              <div class="meta" @click="gotoSocial(article.authorId)">
                <a class="nick-name" href="#">{{article.authorName}}</a>
                <span>
              <i class="fas fa-comment-alt"></i> {{article.commentsCount}}
            </span>
                <span>
              <i class="fas fa-heart"></i> {{article.likesCount}}
            </span>
              </div>
            </div>
            <div class="wrap-img">
              <a>
                <img
                  v-if="article.image" :src="article.image" class="post-img"
                  @click="jumpToArticle(article)">
              </a>
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
        // articles: [],
      }
    },
    components: {
      BaseHeader,
    },
    props: ['articles'],
    methods: {
      jumpToArticle(article) {
        console.log(article)
        this.$router.push('/article/' + article.id)
      },
      gotoSocial(authorId){
        this.$store.commit("setAuthorId", authorId)
        this.$router.push('/social')
      },
    },
    mounted() {
      this.$store.commit("setMode", "articleList")
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
    min-height: 160px;
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

  .article-list .wrap{
    display: flex;
  }

  .wrap-img {
    min-width: 152px;
    max-width: 152px;
    min-height: 100px;
    /*float: right;*/
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

  .article-list .wrap-content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 4px;
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
