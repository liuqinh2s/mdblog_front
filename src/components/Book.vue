<template>
  <div class="mine-main">
    <div class="back" v-if="this.$store.state.isSub>0" @click="back">
      <i class="fas fa-angle-left"></i>
      <span>返回</span>
    </div>
    <ul>
      <li v-for="(item,index) in this.$store.state.books">
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
          <li @click="deleteBook(item)">删除</li>
          <li @click="gotoMove(item.id,'book')">移动</li>
          <li @click="toRename(item.name, 'book', item.id)">重命名</li>
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
          <li @click="deleteArticle(item)">删除</li>
          <li @click="gotoMove(item.id,'article')">移动</li>
          <li @click="toRename(item.title, 'article', item.id)">重命名</li>
        </ul>
      </li>
    </ul>
    <!-- use the modal component, pass in the prop -->
    <div class="modal-mask modal-transition" v-if="show">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <span>重命名</span>
          </div>
          <div class="modal-body">
            <input v-model="currentName" class="rename-input" autofocus="autofocus" @keyup.enter="rename"></input>
          </div>
          <div class="modal-footer">
              <span class="modal-cancel" @click="cancel">
                取消
              </span>
            <span class="modal-confirm" @click="rename">
                确定
              </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {timeStamp2Date} from "../assets/js/common.js";

  export default {
    name: "Book",
    data() {
      return {
        articles: [],
        selected: -1,
        selectedBook: -1,
        show: false,
        currentName: "",
        userId: ""
      }
    },
    methods: {
      getSubBooks(item) {
        this.selectedBook = -1
        this.$store.commit('setParent', item.id)
        let data = {
          bookId: item.id
        }
        this.$axios.post("/book/getSubBooks", data).then((res) => {
          console.log(res)
          this.$store.commit('setBooks', res.data)
          this.$store.commit('setIsSub', this.$store.state.isSub + 1)
        })
        this.$axios.post("/article/getSubArticles", data).then((res) => {
          console.log(res)
          this.articles = res.data
        })
      },
      back() {
        let that = this
        this.selected = -1
        this.selectedBook = -1
        let data = {
          bookId: this.$store.state.parent
        }
        this.$axios.post("/book/getSupBooks", data).then((res) => {
          console.log(res)
          this.$store.commit('setBooks', res.data)
          this.$store.commit('setIsSub', this.$store.state.isSub - 1)
          this.$store.commit('setParent', res.data[0].parent)
          data = {
            bookId: this.$store.state.parent
          }
          this.$axios.post("/article/getSubArticles", data).then((res) => {
            console.log(res)
            this.articles = res.data
          })
        })
      },
      gotoEditor(item) {
        this.$store.commit("setArticleBookId", this.$store.state.parent)
        this.$router.push("/editor/" + item.id)
      },
      toggleTools(index) {
        this.$nextTick(() => {
          if (this.selected === index) {
            this.selected = -1
          } else {
            this.selected = index
          }
        })
      },
      toggleBooks(index) {
        this.$nextTick(() => {
          if (this.selectedBook === index) {
            this.selectedBook = -1
          } else {
            this.selectedBook = index
          }
        })
      },
      deleteArticle(item) {
        let that = this
        let data = {
          articleId: item.id
        }
        this.$axios.post("/article/deleteArticle", data).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.selected = -1
            data = {
              bookId: that.$store.state.parent
            }
            this.$axios.post("/book/getSubBooks", data).then((res) => {
              console.log(res)
              this.$store.commit('setBooks', res.data)
            })
            this.$axios.post("/article/getSubArticles", data).then((res) => {
              console.log(res)
              this.articles = res.data
            })
          }
        })
      },
      deleteBook(item) {
        let that = this
        let data = {
          bookId: item.id
        }
        this.$axios.post("/book/deleteBook", data).then((res) => {
          console.log(res)
          if (res.data.code === 200) {
            this.selectedBook = -1
            data = {
              bookId: that.$store.state.parent
            }
            this.$axios.post("/book/getSubBooks", data).then((res) => {
              console.log(res)
              this.$store.commit('setBooks', res.data)
            })
            this.$axios.post("/article/getSubArticles", data).then((res) => {
              console.log(res)
              this.articles = res.data
            })
          }
        })
      },
      rename() {
        let that = this
        if (this.type === "book") {
          let data = {
            bookId: this.id,
            bookName: this.currentName
          }
          this.$axios.post("/book/changeBookName", data).then((res) => {
            console.log(res)
            if (res.data.code === 200) {
              this.selectedBook = -1
              data = {
                bookId: that.$store.state.parent
              }
              this.$axios.post("/book/getSubBooks", data).then((res) => {
                console.log(res)
                this.$store.commit('setBooks', res.data)
              })
              this.$axios.post("/article/getSubArticles", data).then((res) => {
                console.log(res)
                this.articles = res.data
              })
            }
          })
        } else {
          let data = {
            articleId: this.id,
            articleName: this.currentName
          }
          this.$axios.post("/article/changeArticleName", data).then((res) => {
            console.log(res)
            if (res.data.code === 200) {
              this.selected = -1
              data = {
                bookId: that.$store.state.parent
              }
              this.$axios.post("/book/getSubBooks", data).then((res) => {
                console.log(res)
                this.$store.commit('setBooks', res.data)
              })
              this.$axios.post("/article/getSubArticles", data).then((res) => {
                console.log(res)
                this.articles = res.data
              })
            }
            this.currentName = ""
          })
        }
        this.show = false
      },
      toRename(name, type, id) {
        this.currentName = name
        this.type = type
        this.id = id
        this.show = true
      },
      cancel() {
        this.show = false;
        this.selected = -1;
        this.selectedBook = -1;
      },
      gotoMove(id, type) {
        this.$store.commit('setCurrentDir', this.$store.state.parent)
        this.$router.push("/move?id=" + id + "&type=" + type)
      },
      timeStamp2Date(time) {
        return timeStamp2Date(time)
      },
    },
    mounted() {
      this.$store.commit("setMode", "book")
      let data = {
        bookId: this.$store.state.parent
      }
      this.$axios.post("/book/getSubBooks", data).then((res) => {
        console.log(res)
        if (res.data === "请先登录") {
          this.$router.push("/login")
        } else {
          this.$store.commit('setBooks', res.data)
          this.$axios.post("/article/getSubArticles", data).then((res) => {
            console.log(res)
            this.articles = res.data
          })
        }
      })
    }
  }
</script>

<style scoped>
  .mine-main li {
    list-style-type: none;
    padding: 1rem 0.5rem;
    border-bottom: 1px solid #f7f7f7;
  }

  .mine-main li span {
    cursor: pointer;
  }

  .mine-main li .tools {
    cursor: pointer;
  }

  .mine-main li .line {
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
    /*padding: 1rem;*/
    cursor: pointer;
  }

  .modal-mask {
    background-color: rgba(0, 0, 0, .5);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    display: table;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    margin: auto;
    top: 50%;
    background-color: white;
    width: 90%;
    max-width: 500px;
    padding: 8px;
    border-radius: 5px;
  }

  .modal-header {
    /*margin-top: 30px;*/
    /*color:#42b983;*/
    text-align: center;
    border-bottom: none;
  }

  .modal-body {
    /*margin: 20px 0 40px;*/
    text-align: center;
  }

  .modal-default-button {
    background: #EE4D4D;
    color: white;
    border: none;
    width: 80%;
    line-height: 20px;
    height: 30px;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .modal-footer {
    text-align: center;
    border-top: none;
  }

  .mine-main .rename-input {
    border: none;
    outline: none;
    border-bottom: 2px #01a0e4 solid;
    width: 100%;
  }

  .modal-cancel {
    margin-right: 1rem;
    cursor: pointer;
  }

  .modal-confirm {
    color: #01a0e4;
    cursor: pointer;
  }

  @media screen and (max-width: 1042px) {
    .mine-wrap {
      padding-bottom: 60px;
    }
  }
</style>
