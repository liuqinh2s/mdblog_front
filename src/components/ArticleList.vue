<template>
  <div ref="articleList">
    <ul class="article-list">
      <li v-for="article in articles">
        <div class="article">
          <div class="content">
            <div class="title" @click="toArticle(article)">
              {{article.title}}
            </div>
            <div class="summary">
              <div class="cover" v-if="article.image">
                <img :src="article.image" class="post-img" @click="toArticle(article)">
              </div>
              {{article.summary}}
            </div>
            <div class="meta">
              <span class="nick-name" @click="toSocial(article.authorId)">
                {{article.authorName}}
              </span>
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
  </div>
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
      toArticle(article) {
        console.log(article)
        this.$router.push('/article/' + article.id)
      },
      toSocial(authorId) {
        this.$store.commit("setAuthorId", authorId)
        this.$router.push('/social/' + authorId)
      },
    },
    mounted() {
      if (this.$store.state.mode === "search") {
        this.articles = this.$store.state.articles
      }
    }
  }
</script>

<style scoped>
  .article-list {
    min-height: 112px;
    padding: 0.5rem 0;
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

  .article-list .cover{
    float: right;
    margin: 0 0 1em 1em;
  }

  .article-list .post-img{
    width: 152px;
    max-height: 152px;
  }

  .title {
    margin: -7px 0 4px;
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    cursor: pointer;
    text-decoration: black;
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
    cursor: pointer;
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

  .article-list .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .article-list .wrap-content {
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

  @media screen and (min-width: 1042px) {
    /*.article-list .article {*/
    /*  display: flex;*/
    /*  justify-content: center;*/
    /*  align-items: center;*/
    /*}*/
  }
</style>
