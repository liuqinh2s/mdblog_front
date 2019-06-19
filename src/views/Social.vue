<template>
  <div class="social-main">
    <div class="author">
      <a>
        <img :src="avatar" alt="96" class="avatar">
      </a>
      <div class="info">
        <span class="name">
          <a href="#" class="name">{{userName}}</a>
        </span>
        <ul class="meta">
          <li>
            <span class="words-count">{{concernList.length}}</span>
            <span class="meta-key">关注</span>
          </li>
          <li>
            <span class="words-count">{{fansList.length}}</span>
            <span class="meta-key">粉丝</span>
          </li>
          <li>
            <span class="words-count">{{articleList.length}}</span>
            <span class="meta-key">文章</span>
          </li>
          <li>
            <span class="words-count">{{getWordsCount()}}</span>
            <span class="meta-key">字数</span>
          </li>
          <li>
            <span class="words-count">{{getLikesCount()}}</span>
            <span class="meta-key">收获喜欢</span>
          </li>
        </ul>
      </div>
    </div>
    <ul class="nav">
      <li ref="nav0" class="active" @click="showList(0)" v-show="isMine()">笔记本</li>
      <li ref="nav1" @click="showList(1, articleList)">文章</li>
      <li ref="nav2" @click="showList(2, concernList)">关注</li>
      <li ref="nav3" @click="showList(3, fansList)">粉丝</li>
    </ul>
    <div class="book-wrap" v-if="showItems[0]">
      <Book></Book>
    </div>
    <div class="article-wrap" v-if="showItems[1]">
      <ArticleList :articles="articleList"></ArticleList>
    </div>
    <People :items="concernList" v-if="showItems[2]"></People>
    <People :items="fansList" v-if="showItems[3]"></People>
  </div>
</template>

<script>

  import Book from '../components/Book';
  import ArticleList from "../components/ArticleList";
  import People from "../components/People";
  import {getCookie} from "../assets/js/cookie";

  export default {
    name: "Social",
    components: {People, ArticleList, Book},
    data() {
      return {
        userName: "",
        avatar: "",
        articleList: [],
        concernList: [],
        fansList: [],
        showItems: [false, false, false, false],
      }
    },
    props: ['userId'],
    methods: {
      getWordsCount() {
        let wordsCount = 0
        for (let i = 0; i < this.articleList.length; i++) {
          wordsCount += this.articleList[i].wordsCount
        }
        return wordsCount
      },
      getLikesCount() {
        let likesCount = 0
        for (let i = 0; i < this.articleList.length; i++) {
          likesCount += this.articleList[i].likesCount
        }
        return likesCount
      },
      changeNav(item){
        for(let i=0;i<4;i++){
          if(i!==item){
            let n = 'nav'+i.toString()
            console.log(n)
            this.$refs[n].classList.remove('active')
          }
        }
        this.$refs['nav'+item].classList.add("active")
      },
      showList(item, list) {
        this.changeNav(item)
        let len = this.showItems.length
        this.showItems.splice(0,this.showItems.length)
        for(let i=0;i<len;i++){
          this.showItems[i] = false
        }
        this.showItems[item]=true
      },
      isMine(){
        return getCookie('userId')===this.$store.state.authorId
      }
    },
    mounted() {
      console.log(this.$store.state.authorId)
      if(getCookie('userId')===this.$store.state.authorId){
        this.showItems[0]=true
      }else{
        this.$refs['nav1'].classList.add("active")
        this.showItems[1] = true
      }
      let data = {
        userId: this.$store.state.authorId
      }
      this.$http.post("http://mdblog.club:8080/social/getSocial", data).then((res) => {
        console.log(res)
        this.articleList = res.data.articleList
        this.concernList = res.data.concernList
        this.fansList = res.data.fansList
        this.userName = res.data.userName
        this.avatar = res.data.avatar
      })
    }
  }
</script>

<style scoped>

  .social-main{
    padding-top: 60px;
    margin: 0 auto;
    max-width: 900px;
    padding-right: 15px;
    padding-left: 15px;
  }

  .social-main .author{
    display: flex;
    align-items: center;
  }

  .social-main .author ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
  }

  .social-main .author li {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #f0f0f0;
    font-size: 12px;
    margin: 0 7px 6px 0;
    padding: 0 7px 0 0;
  }

  .social-main .author li:last-child {
    border: none;
  }

  .social-main .author li .meta-key {
    color: #969696;
  }

  .social-main .author .avatar {
    float: left;
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
  }

  .social-main .author {
    padding: 30px 0 20px;
  }

  .social-main .author .info {
    margin-left: 1rem;
  }

  .social-main .author .info .name {
    font-size: 21px;
    font-weight: 700;
    color: #333;
    text-decoration: none;
  }

  .social-main .nav {
    padding: 0;
    display: flex;
    border-bottom: 1px solid #f0f0f0;
  }

  .social-main .nav li {
    list-style-type: none;
    padding: 1rem;
    font-weight: 700;
    font-size: 15px;
    color: #969696;
    cursor: pointer;
  }

  .social-main .nav .active {
    border-bottom: 2px solid #646464;
    color: #646464;
  }

  @media screen and (max-width: 1042px) {
    .social-main .author .avatar {
      float: left;
      width: 60px;
      height: 60px;
      border: 1px solid #ddd;
      border-radius: 50%;
      cursor: pointer;
    }
  }

  .social-main .article-wrap{
    margin-top: 1rem;
    padding-left: 8px;
    padding-right: 8px;
  }

  .social-main .book-wrap{
    margin-top: 8px;
  }

  @media screen and (max-width: 1042px) {
    .social-main {
      padding-bottom: 60px;
    }
  }
</style>
