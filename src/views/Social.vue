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
            <div class="meta-key" @click="showList(concernList)">
              <span>关注</span>
              <i class="fas fa-angle-right"></i>
            </div>
          </li>
          <li>
            <span class="words-count">{{fansList.length}}</span>
            <div class="meta-key" @click="showList(fansList)">
              <span>粉丝</span>
              <i class="fas fa-angle-right"></i>
            </div>
          </li>
          <li>
            <span class="words-count">{{articleList.length}}</span>
            <div class="meta-key" @click="showList(articleList)">
              <span>文章</span>
              <i class="fas fa-angle-right"></i>
            </div>
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
  </div>
</template>

<script>

  export default {
    name: "Social",
    data() {
      return {
        userName: "",
        avatar: "",
        articleList: [],
        concernList: [],
        fansList: []
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
      showList(){

      }
    },
    mounted() {
      console.log(this.userId)
      let data = {
        userId: this.userId
      }
      this.$http.post("http://localhost:8080/social/getSocial", data).then((res) => {
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

  .social-main .author ul {
    padding: 0;
    display: flex;
    flex-wrap: wrap;
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

  .social-main .author li:last-child{
    border: none;
  }

  .social-main .author li .meta-key{
    color: #969696;
  }

  .social-main .author .avatar{
    float: left;
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    border-radius: 50%;
    cursor: pointer;
  }

  .social-main .author{
    padding: 30px 1rem 20px;
  }

  .social-main .author .info{
    margin-left: 100px;
  }

  .social-main .author li div{
    cursor: pointer;
  }

  .social-main .author .info .name{
    font-size: 21px;
    font-weight: 700;
    color: #333;
    text-decoration: none;
  }

  @media screen and (max-width: 1042px) {
    .social-main .author .avatar{
      float: left;
      width: 60px;
      height: 60px;
      border: 1px solid #ddd;
      border-radius: 50%;
      cursor: pointer;
    }

    .social-main .author .info{
      margin-left: 80px;
    }
  }

</style>
