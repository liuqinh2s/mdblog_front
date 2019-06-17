<template>
  <div>
    <BaseHeader></BaseHeader>
    <div class="move-wrap">
      <div class="back" @click="back2Mine">
        <i class="fas fa-angle-left"></i>
        <span>返回到笔记本</span>
      </div>
      <div class="button-group">
        <button @click="show=true">新建文件夹</button>
        <button @click="changeDir">移动到此处</button>
      </div>
      <div class="back" v-if="isSub>0" @click="back">
        <i class="fas fa-angle-double-left"></i>
        <span class="parent-dir">上一级</span>
      </div>
      <ul>
        <li v-for="(item,index) in this.$store.state.books">
          <div class="line">
            <div>
              <i class="far fa-folder"></i>
              <span @click="getSubBooks(item)">{{item.name}}</span>
            </div>
          </div>
          <div class="time">{{timeStamp2Date(item.createTime)}}</div>
        </li>
      </ul>
      <!-- use the modal component, pass in the prop -->
      <div class="modal-mask modal-transition" v-if="show">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <span>新建文件夹</span>
            </div>
            <div class="modal-body">
              <input v-model="currentName" class="rename-input" autofocus="autofocus" @keyup.enter="confirm"></input>
            </div>
            <div class="modal-footer">
              <span class="modal-cancel" @click="show=false">
                取消
              </span>
              <span class="modal-confirm" @click="confirm">
                确定
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseHeader from "../components/BaseHeader";
  import {timeStamp2Date} from "../assets/js/common.js"

  export default {
    name: "Move",
    data(){
      return{
        isSub: 0,
        show: false,
        currentName: ""
      }
    },
    components: {BaseHeader},
    methods:{
      getSubBooks(item) {
        this.$store.commit('setParent', item.id)
        let data = {
          bookId: item.id
        }
        this.$http.post("http://localhost:8080/book/getSubBooks", data).then((res) => {
          console.log(res)
          this.$store.commit('setBooks', res.data)
          this.isSub += 1
        })
      },
      back2Mine(){
        this.$store.commit('setParent', this.$store.state.currentDir)
        this.$router.back()
      },
      timeStamp2Date(time){
        return timeStamp2Date(time)
      },
      back() {
        let that = this
        let data = {
          bookId: this.$store.state.parent,
        }
        this.$http.post("http://localhost:8080/book/getSupBooks", data).then((res) => {
          console.log(res)
          this.$store.commit('setBooks', res.data)
          this.isSub -= 1
          this.$store.commit('setParent', res.data[0].parent)
        })
      },
      confirm(){
        let data={
          parentId: this.$store.state.parent,
          bookName: this.currentName
        }
        this.$http.post("http://localhost:8080/book/createBook", data).then((res)=>{
          console.log(res)
          this.show = false
          let data = {
            bookId: this.$store.state.parent
          }
          this.$http.post("http://localhost:8080/book/getSubBooks", data).then((res) => {
            console.log(res)
            this.$store.commit('setBooks', res.data)
          })
        })
      },
      changeDir(){
        let data
        if (this.$route.query.type === 'book') {
          data = {
            bookId: this.$route.query.id,
            parentId: this.$store.state.parent
          }
        }else{
          data = {
            articleId: this.$route.query.id,
            parentId: this.$store.state.parent
          }
        }
        this.$http.post("http://localhost:8080/book/changeDir", data).then((res) => {
          console.log(res)
          this.$store.commit('setParent', this.$store.state.currentDir)
          this.$router.back()
        })
      }
    },
    mounted() {
      this.$store.commit('setParent', '0')
      let data = {
        bookId: '0'
      }
      this.$http.post("http://localhost:8080/book/getSubBooks", data).then((res) => {
        console.log(res)
        if (res.data === "请先登录") {
          this.$router.push("/login")
        } else {
          this.$store.commit('setBooks', res.data)
        }
      })
    }
  }
</script>

<style scoped>
.move-wrap{
  padding-top: 60px;
  margin: 0 auto;
  max-width: 900px;
}

.move-wrap .back {
  padding: 1rem;
  cursor: pointer;
}

.move-wrap li {
  list-style-type: none;
  padding: 1rem;
  border-bottom: 1px solid #f7f7f7;
}

.move-wrap li span {
  cursor: pointer;
}

.move-wrap ul {
  padding: 0;
}

.move-wrap li svg {
  margin-right: 8px;
}

.move-wrap .time {
  font-size: 12px;
  color: #b4b4b4;
  padding-top: 5px;
}

.move-wrap .back {
  padding: 1rem;
  cursor: pointer;
}

  .parent-dir{
    font-size: 14px;
  }

  .button-group{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .button-group button{
    border: none;
    outline: none;
    padding: 5px 20px;
    background-color: #F2F3F4;
    color: #4D4D4D;
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

.move-wrap .rename-input {
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
  .move-wrap {
    padding-bottom: 60px;
  }
}
</style>
