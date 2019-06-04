<template>
  <ul class="article-list">
    <li v-for="article in articles">
      <div class="article">
        <div class="wrap-img">
          <a>
            <img
                 v-if="article.article.image" :src="article.article.image" class="post-img" @click="jumpToArticle(article.article.id)">
          </a>
        </div>
        <div class="content">
          <a class="title" @click="jumpToArticle(article.article.id)">
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
        articles: [
          // {
          //   hasImage: true,
          //   imageSrc: 'https://upload-images.jianshu.io/upload_images/16050459-ef8ab9d3d5481a99.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240',
          //   title: 'Spring AOP是什么？你都拿它做什么？',
          //   summary: '为什么会有面向切面编程（AOP）？我们知道Java是一个面向对象（OOP）的语言，但它有一些弊端，比如当我们需要为多个不具有继承关系的对象引入一...',
          //   nickName: 'liuqinh2s',
          //   comments_count: 4,
          //   likes_count: 49,
          // }
        ],
      }
    },
    components: {
      BaseHeader,
    },
    methods: {
      extractContent(s) {
        let span = document.createElement('span');
        span.innerHTML = s;
        span.querySelectorAll(".markdownIt-Anchor").forEach(function (entry) {
          entry.parentNode.removeChild(entry)
        });
        return span.textContent || span.innerText;
      },
      getSummary(article) {
        console.log("66666666");
        console.log(article);
        return this.extractContent(this.getHtml(article)).substring(0,100)
      },
      getArticles() {
        /*接口请求*/
        let that = this;
        this.$http.get('http://localhost:8080/api/v1/article/getArticleList').then((res) => {
          console.log(res);
          that.articles = res.body;
          // console.log(that.articles)
        })
      },
      jumpToArticle(articleId){
        this.$router.push('/article/'+articleId)
      }
    },
    computed: {},
    mounted() {
      this.getArticles()
    }
  }
</script>

<style scoped>
  .block {

  }


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

  .summary{
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
