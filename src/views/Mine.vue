<template>
  <div class="mine-main">
    <BaseHeader></BaseHeader>
    <div class="mine-wrap">
      <div class="back" v-if="isSub>0" @click="back">
        <i class="fas fa-angle-left"></i>
        <span>返回</span>
      </div>
      <ul>
        <li v-for="(item,index) in books">
          <div class="line">
            <div>
              <i class="far fa-folder"></i>
              <span @click="getSubBooks(item)">{{item.name}}</span>
            </div>
            <div class="tools" @click="toggleBooks(index)">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
          <div class="time">{{timeStamp2Date(item.createTime)}}</div>
          <ul class="tools" v-if="index===selectedBook">
            <li>删除</li>
            <li>移动</li>
          </ul>
        </li>
        <li v-for="(item,index) in articles">
          <div class="line">
            <div>
              <span @click="gotoEditor(item)">{{item.title}}</span>
            </div>
            <div class="tools" @click="toggleTools(index)">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
          <div class="time">{{timeStamp2Date(item.createTime)}}</div>
          <ul class="tools" v-if="index===selected">
            <li>删除</li>
            <li>移动</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import BaseHeader from "../components/BaseHeader";

  export default {
    name: "Mine",
    components: {BaseHeader},
    data() {
      return {
        books: [],
        isSub: 0,
        parent: 0,
        articles: [],
        selected: -1,
        selectedBook: -1
      }
    },
    methods: {
      timeStamp2Date(timestamp) {
        var time = new Date(timestamp);
        var y = time.getFullYear();
        var m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
        var d = time.getDate()<10?'0' +time.getDate():time.getDate();
        return y + "." + m + "." + d
      },
      getSubBooks(item) {
        this.parent = item.id
        let data = {
          bookId: item.id
        }
        this.$http.post("http://localhost:8080/api/v1/book/getSubBooks", data).then((res) => {
          console.log(res)
          this.books = res.data
          this.isSub += 1
        })
        this.$http.post("http://localhost:8080/api/v1/article/getSubArticles", data).then((res) => {
          console.log(res)
          this.articles = res.data
        })
      },
      back() {
        let that = this
        let data = {
          bookId: this.parent
        }
        this.$http.post("http://localhost:8080/api/v1/book/getSupBooks", data).then((res) => {
          console.log(res)
          this.books = res.data
          this.isSub -= 1
          this.parent = res.data[0].parent
          data = {
            bookId: this.parent
          }
          this.$http.post("http://localhost:8080/api/v1/article/getSubArticles", data).then((res) => {
            console.log(res)
            this.articles = res.data
          })
        })
      },
      gotoEditor(item) {
        this.$store.commit("setArticleBookId", this.parent)
        this.$router.push("/editor/" + item.id)
      },
      toggleTools(index) {
        this.$nextTick(() => {
          if(this.selected===index){
            this.selected = -1
          }else{
            this.selected = index
          }
        })
      },
      toggleBooks(index){
        this.$nextTick(() => {
          if(this.selectedBook===index){
            this.selectedBook = -1
          }else{
            this.selectedBook = index
          }
        })
      }
    },
    mounted() {
      let data = {
        bookId: this.parent
      }
      this.$http.post("http://localhost:8080/api/v1/book/getSubBooks", data).then((res) => {
        console.log(res)
        this.books = res.data
      })
      this.$http.post("http://localhost:8080/api/v1/article/getSubArticles", data).then((res) => {
        console.log(res)
        this.articles = res.data
      })
    }
  }
</script>

<style scoped>
  .mine-main li {
    list-style-type: none;
    padding: 1rem;
    border-bottom: 1px solid #f7f7f7;
  }

  .mine-main li span{
    cursor: pointer;
  }

  .mine-main li .tools{
    cursor: pointer;
  }

  .mine-main li .line{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mine-main ul {
    padding: 0;
  }

  .mine-main li svg {
    margin-right: 8px;
  }

  .mine-wrap {
    padding-top: 60px;
    margin: 0 auto;
    max-width: 900px;
  }

  .mine-main .time {
    font-size: 12px;
    color: #b4b4b4;
    padding-top: 5px;
  }

  .mine-main .back {
    padding: 1rem;
    cursor: pointer;
  }

  @media screen and (max-width: 1042px) {
    .mine-wrap {
      padding-bottom: 60px;
    }
  }
</style>
