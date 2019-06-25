<template>
  <div class="header">
    <!--    移动端搜索小图标-->
    <div class="search-icon" @click="showSearchInput=!showSearchInput">
      <i class="fas fa-search"></i><span>搜索</span>
    </div>
    <input v-model="searchContent" v-if="showSearchInput" class="search-input" placeholder="输入关键词搜索"
           autofocus="autofocus" @keyup.enter="search()"></input>
    <div class="header-left" v-show="!showSearchInput">
      <router-link to="/home" class="logo-link">
        <img src="../assets/logo.png" alt="logo" class="logo">
      </router-link>
    </div>
    <div class="header-center">
      <ul class="nav-list">
        <li ref="nav0">
          <router-link to="/">
            <i class="fas fa-hourglass-half"></i><span>最新</span>
          </router-link>
        </li>
        <li ref="nav1">
          <router-link to="/hot">
            <i class="fab fa-hotjar"></i><span>热门</span>
          </router-link>
        </li>
        <li ref="nav2">
          <router-link to="/tags">
            <i class="fas fa-tags"></i><span>分类</span>
          </router-link>
        </li>
        <li ref="nav3">
          <router-link to="/mine">
            <i class="fas fa-user"></i><span>我的</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="add-icon">
      <div v-if="this.$store.state.mode==='editor'" @click="$emit('save-article')">
        <i class="fas fa-upload"></i>
        <span>保存</span>
      </div>
      <div v-else-if="this.$store.state.mode==='book'" @mouseover="isNew=true" @mouseleave="isNew=false">
        <i class="fas fa-plus-circle"></i>
        <span>新建</span>
        <ul class="new" v-show="isNew">
          <li @click="show=true">
            <i class="fas fa-book"></i>
            <span>新建笔记本</span>
          </li>
          <li @click="gotoEditor">
            <i class="fas fa-feather"></i>
            <span>新建文章</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="header-right">
    </div>
    <div class="header-search">
      <b-input-group
        :key=""
      >
        <b-form-input placeholder="" @keyup.enter.native="search()" v-model="searchContent"></b-form-input>
        <b-input-group-append>
          <b-button size="sm" text="Button" variant="secondary" @click="search()">搜索</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
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
</template>

<script>

  import {getCookie} from "../assets/js/cookie";

  export default {
    name: "BaseHeader",
    data() {
      return {
        avatar: "",
        userPage: "#",
        isLogin: false,
        isDropdown: false,
        isNew: false,
        show: false,
        currentName: "",
        searchContent: "",
        showSearchInput: false
      }
    },
    props: ['selectedNav'],
    methods: {
      search() {
        this.$http.get("https://mdblog.club/article/search?searchContent=" + this.searchContent).then((res) => {
          console.log(res)
          this.$store.commit("setArticles", res.data)
          this.$store.commit("setMode", "search")
          this.$router.push("/search/" + this.searchContent)
        })
      },
      toggleMenu() {

      },
      selectNav(index) {
        for (let i = 0; i < 4; i++) {
          this.$refs["nav" + i.toString()].removeAttribute("style", "color: black;")
        }
        this.$refs["nav" + index.toString()].setAttribute("style", "color: black;")
      },
      login() {
        this.$router.push({path: '/login'})
      },
      gotoHome(index) {
        this.selectNav(index)
        this.$router.push('/home')
      },
      gotoHot(index) {
        this.selectNav(index)
        this.$router.push('/hot')
      },
      gotoMine(index) {
        this.selectNav(index)
        this.$store.commit('setParent', '0')
        this.$store.commit('setIsSub', 0)
        this.$router.push('/mine')
        // if(this.$store.state.mode==='mine'){
        //   this.$router.go(0)
        // }else{
        //   this.$router.push('/mine')
        // }
      },
      gotoTags(index) {
        this.selectNav(index)
        this.$router.push('/tags')
      },
      gotoEditor() {
        this.$store.commit('setCurrentDir', this.$store.state.parent)
        let data = {
          parentId: this.$store.state.parent
        }
        console.log(data)
        this.$http.post("https://mdblog.club/article/createArticle", data).then((res) => {
          console.log(res)
          if (res.data === "请先登录") {
            this.$router.push("/login")
          } else {
            this.$router.push("/editor/" + res.bodyText)
          }
        })
      },
      confirm() {
        let data = {
          parentId: this.$store.state.parent,
          bookName: this.currentName
        }
        this.$http.post("https://mdblog.club/book/createBook", data).then((res) => {
          console.log(res)
          this.show = false
          let data = {
            bookId: this.$store.state.parent
          }
          this.$http.post("https://mdblog.club/book/getSubBooks", data).then((res) => {
            console.log(res)
            this.$store.commit('setBooks', res.data)
          })
          this.currentName = ""
        })
      }
    },
    mounted() {
      console.log(this.selectedNav)
      this.selectNav(this.selectedNav)
    },
    // watch: {
    //   '$store.state.selectedNav':function (old, val) {
    //     console.log(val)
    //     if(val===""){
    //       for(let i=0;i<4;i++){
    //         this.$refs["nav"+i.toString()].removeAttribute("style", "color: black;")
    //       }
    //     }
    //   }
    // }
  }


</script>

<style scoped>

  .header .search-input {
    /*width: 100%;*/
    border: 1px solid #eee;
    border-radius: 4px;
    height: 38px;
    padding: 5px 10px;
    width: 200px;
  }

  .selected-nav {
    color: black;
  }

  .user {
    height: 100%;
  }

  .avatar {
    position: relative;
    width: 40px;
    height: 40px;
    margin: 8px 24px 8px 16px;
    display: block;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }

  .user .avatar:before {
    content: "";
    position: absolute;
    top: 18px;
    right: -14px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid #999;
  }

  .header {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-around;
    height: 60px;
    border-bottom: solid 1px #e6e6e6;
    width: 100%;
    background-color: white;
    z-index: 1000;
    align-items: center;
  }

  .search-icon, .user-icon {
    display: none;
  }

  .header-left {
    text-align: center;
    margin: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-link {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-search {
    display: flex;
    align-items: center;
    margin: auto;
  }

  .header-right {
    margin: auto;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-around;
  }


  .logo {
    max-height: 80%;
    max-width: 80%;
    min-width: 107px;
  }


  .navbar-nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .nav-list li {
    /*display: inline;*/
    /*margin: 0 15px;*/
    font-size: 1rem;
    padding: 20px;
    float: left;
    position: relative;
    display: block;
    line-height: 20px;
    color: #969696;
    /*list-style-type: none;*/
  }

  .nav-list svg {
    margin-right: 5px;
  }


  .search {
    border: 1px solid #c5c5c5;
    border-radius: 20px;
    background-color: #eee;
  }

  input {
    font-size: 1rem;
  }

  input:focus {
    outline: none;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #999999;
  }

  input:-moz-placeholder, textarea:-moz-placeholder {
    color: #999999;
  }

  input::-moz-placeholder, textarea::-moz-placeholder {
    color: #999999;
  }

  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: #999999;
  }

  .nav-list {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }

  .navbar {
    padding: 0;
    height: 100%;
    display: flex;
    align-items: center;
  }

  a {
    color: inherit;
    display: inline-block;
  }

  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  li:hover {
    color: black;
    /*background: #F5F5F5;*/
    cursor: pointer;
  }

  .user:hover {
    background-color: #F5F5F5;
  }

  .dropdown-menu {
    display: block;
    left: auto;
    margin: 0;
  }

  .dropdown-menu li {
    float: none;
    line-height: 20px;
  }

  .dropdown-menu a {
    padding: 10px 20px;
    line-height: 30px;
  }

  .dropdown-menu svg {
    /*margin-left: 15px;*/
    margin-right: 15px;
    font-size: 18px;
    color: #22b6ed;
  }

  input {
    outline: none;
  }

  .header-center ul li {
    height: 100%;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 1042px) {
    .header-center {
      text-align: center;
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: white;
      height: 60px;
    }

    .header-center ul {
      height: 100%;
    }

    .search-icon, .user-icon {
      display: block;
      margin: auto;
    }

    .header-search, .header-right {
      display: none;
    }

    .header {
      border-bottom: solid 1px #f7f7f7;
    }
  }

  @media screen and (min-width: 1042px) {
    .header-center {
      display: flex;
      justify-content: space-around;
      min-width: 500px;
    }

    .header-center svg {
      margin-right: 5px;
    }
  }

  .add-icon {
    display: block;
    margin: auto;
    cursor: pointer;
  }

  .add-icon svg {
    margin-right: 5px;
  }

  .search-icon svg {
    margin-right: 8px;
  }

  .header li {
    list-style-type: none;
    padding: 0.5rem;
  }

  .header .new {
    position: absolute;
    padding: 0;
    margin-left: -3.5rem;
    background-color: white;
    border-color: transparent;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .1);
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

  .header .rename-input {
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

</style>
