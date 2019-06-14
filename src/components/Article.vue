<template>
  <div class="article-main">
    <BaseHeader></BaseHeader>
    <div class="article">
      <article>
        <h1 class="title">{{title}}</h1>
        <div class="author">
          <a >
            <img :src="avatar" alt="96" class="avatar">
          </a>
          <div class="info">
            <span class="name">
              <a href="#" class="name">{{name}}</a>
            </span>
            <div  v-if="!isSame()" class="concern-div">
              <b-badge href="#" variant="info" class="concern" v-if="!isDone['concern']" @click="toggleDo('concern',true)">
                <i class="fas fa-plus"></i>
                关注
              </b-badge>
              <b-badge href="#" variant="success" class="concern" v-else @click="toggleDo('concern',false)">
                <i class="fas fa-plus"></i>
                已关注
              </b-badge>
            </div>
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
        <div v-if="!isAuthor" class="footer-meta">
          <Button class="like-active" v-if="isDone['like']" @click="toggleDo('like',false)">
            <i class="far fa-heart"></i>
            喜欢
          </Button>
          <Button class="like" v-else @click="toggleDo('like',true)">
            <i class="far fa-heart"></i>
            喜欢
          </Button>
        </div>
        <Comment :article-id="this.$route.params.articleId"></Comment>
      </article>
    </div>
  </div>
</template>

<script>
  import BaseHeader from '@/components/BaseHeader'
  import Editor from '@/components/Editor.vue'
  import Comment from "./Comment";

  export default {
    name: "Article",
    components: {
      Comment,
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
        likes_count: 0,
        isAuthor: true,
        isDone: {
          "like": false,
          "concern": false
        }
      }
    },
    mounted() {
      var md = require('turpan');
      this.$http.get("http://104.129.182.209:8080/api/v1/article/getArticle?articleId=" + this.$route.params.articleId).then((res) => {
        console.log(res)
        this.$refs.article.innerHTML = md.render(res.data.article.content)
        this.title = res.data.article.title
        this.words_count = res.data.article.wordsCount
        this.time = this.getTime(res.data.article.createTime)
        this.name = res.data.authorName
        this.userId = this.$store.state.userId
        this.authorId = res.data.authorId
        if (this.userId === this.authorId) {
          this.isAuthor = true
        } else {
          this.isAuthor = false
        }
        this.avatar = res.data.avatar
        this.views_count = res.data.viewsCount
        this.comments_count = res.data.commentsCount
        this.likes_count = res.data.likesCount
      })
      let data = [
        {
          objectId: this.$route.params.articleId,
          type: "like",
        },
        {
          objectId: this.authorId,
          type: "concern"
        }
      ]
      for(let i=0;i<data.length;i++){
        this.$http.post("http://104.129.182.209:8080/api/v1/article/isDone", data[i]).then((res) => {
          console.log(res)
          if(data[i].type==="like")
          this.isDone[data[i].type] = res.data
        })
      }
    },
    methods: {
      getTime(time = +new Date()) {
        var date = new Date(time + 8 * 3600 * 1000);
        return date.toJSON().substr(0, 19).replace('T', ' ');
      },
      isSame() {
        return this.userId === this.authorId
      },
      toggleDo(type, isDo) {
        let objectId = {
          "like": this.$route.params.articleId,
          "concern": this.authorId
        }
        let data = {
          objectId: objectId[type],
          type: type
        }
        let key = ""
        if(isDo){
          key = "justDo"
        }else{
          key = "cancel"
        }
        this.$http.post("http://104.129.182.209:8080/api/v1/article/"+key, data).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.isDone[type] = isDo
            if(data.type==="like"){
              if(isDo){
                this.likes_count++
              }else{
                this.likes_count--
              }
            }
          }
        })
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
    max-width: 100%;
    margin: 0 auto;
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

  @media screen and (min-width: 1042px) {
    article {
      width: 700px;
      padding: 40px 20px;
      margin-top: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  @media screen and (max-width: 1042px) {
    article {
      padding: 20px 10px;
      margin-top: 60px;
      margin-bottom: 60px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .article-main .avatar {
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    vertical-align: middle;
    display: inline-block;
  }

  .article-main .concern {
    /*border: 1px solid #ddd;*/
    /*border-radius: 40%;*/
  }

  .like {
    border: 1px solid #F8907A;
    background-color: white;
    padding: 5px 20px;
    border-radius: 8px;
    color: #F8907A;
    margin: 0 auto;
    outline: none;
  }

  .like-active {
    border: 1px solid #F8907A;
    background-color: #F8907A;
    padding: 5px 20px;
    border-radius: 8px;
    color: white;
    margin: 0 auto;
    outline: none;
  }

  .markdown-body {
    padding-bottom: 2rem;
  }

  .article-main .footer-meta{
    display: flex;
    justify-content: center;
    font-size: 16px;
  }

  .concern-div{
    display: inline-block;
  }

  a.badge-info:focus, a.badge-success:focus{
    outline: none;
  }

</style>
