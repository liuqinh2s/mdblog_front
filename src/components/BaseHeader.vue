<template>
  <div class="header">
    <div class="search-icon">
      <a href="#">
        <i class="fas fa-search"></i><span>搜索</span>
      </a>
    </div>
    <div class="header-left">
      <router-link to="/home" class="logo-link">
        <img src="../assets/logo.png" alt="logo" class="logo">
      </router-link>
    </div>
    <div class="header-center">
      <ul class="nav-list">
        <li>
          <i class="fas fa-hourglass-half"></i>
          <router-link to="home">首页</router-link>
        </li>
        <li>
          <i class="fab fa-hotjar"></i>
          <a href="#">热门</a>
        </li>
        <li>
          <i class="fas fa-tags"></i>
          <a href="#">分类</a>
        </li>
        <li>
          <i class="fas fa-user"></i>
          <a href="#">我的</a>
        </li>
      </ul>
    </div>
    <div class="add-icon">
      <div v-if="this.$store.state.isEditorMode" @click="$emit('save-article')">
        <i class="fas fa-upload"></i>
        <span>保存</span>
      </div>
      <router-link to="/editor" v-else>
        <i class="fas fa-feather"></i>
        <span>创作</span>
      </router-link>
    </div>
    <div class="header-right">
      <!--      <input type="search" placeholder="搜索" class="search"></input>-->
<!--      <div class="user" v-if="isLogin" @mouseover="isDropdown = true" @mouseleave="isDropdown = false">-->
<!--        <div data-hover="dropdown">-->
<!--          <a class="avatar" :href="userPage"><img :src="avatar" alt="头像"></a>-->
<!--        </div>-->
<!--        <ul class="dropdown-menu" v-show="isDropdown">-->
<!--          <li>-->
<!--            <a href="/u/188fd0cec4ed">-->
<!--              <i class="fas fa-user"></i><span>我的主页</span>-->
<!--            </a></li>-->
<!--          <li>-->
<!--          <li>-->
<!--            <a href="/u/188fd0cec4ed">-->
<!--              <i class="fas fa-comment-dots"></i><span>我的消息</span>-->
<!--            </a>-->
<!--          </li>-->
<!--          <li>-->
<!--            &lt;!&ndash; TODO bookmarks_path &ndash;&gt;-->
<!--            <a href="/bookmarks">-->
<!--              <i class="fas fa-bookmark"></i><span>收藏的文章</span>-->
<!--            </a>-->
<!--          </li>-->
<!--          <li>-->
<!--            <a href="/users/188fd0cec4ed/liked_notes">-->
<!--              <i class="fas fa-heart"></i><span>喜欢的文章</span>-->
<!--            </a></li>-->
<!--          <li>-->
<!--            <a href="/settings">-->
<!--              <i class="fas fa-cog"></i><span>设置</span>-->
<!--            </a></li>-->
<!--          <li>-->
<!--            <a href="/faqs">-->
<!--              <i class="fas fa-reply"></i><span>帮助与反馈</span>-->
<!--            </a></li>-->
<!--          <li>-->
<!--            <a rel="nofollow" data-method="delete" href="/sign_out">-->
<!--              <i class="fas fa-sign-out-alt"></i><span>退出</span>-->
<!--            </a></li>-->
<!--        </ul>-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        <div class="user-button">-->
<!--          <el-button type="danger" round @click="login">登陆/注册</el-button>-->
<!--        </div>-->
<!--        <div class="user-icon">-->
<!--          <a href="/login">-->
<!--            <i class="fas fa-user"></i>-->
<!--          </a>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="header-search">
      <!--      <el-input v-model="input" placeholder="请输入内容"></el-input>-->
      <b-input-group
        :key=""
      >
        <b-form-input placeholder=""></b-form-input>
        <b-input-group-append>
          <b-button size="sm" text="Button" variant="secondary">搜索</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import 'bootstrap/dist/js/bootstrap.min.js'
  import BootstrapVue from 'bootstrap-vue'
  import Vue from 'vue'
  /*引入公共方法*/
  import {setCookie, getCookie, delCookie} from '../assets/js/cookie.js'

  Vue.use(BootstrapVue);

  export default {
    name: "BaseHeader",
    data() {
      return {
        avatar: "",
        userPage: "#",
        isLogin: false,
        isDropdown: false
      }
    },
    methods: {
      toggleMenu() {

      },
      login() {
        this.$router.push({path: '/login'})
      },
    },
    mounted() {
      this.$http.get("http://localhost:8080/api/v1/user/getAvatar").then((res)=>{
        console.log(res);
        this.avatar = res.bodyText;
        // this.avatar = res.data.
      });
    },
  }


</script>

<style scoped>

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
    background: #F5F5F5;
    cursor: pointer;
  }

  button:focus {
    outline: none;
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

  @media screen and (max-width: 1042px) {
    .header-center {
      text-align: center;
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: white;
    }

    .search-icon, .user-icon {
      display: block;
      margin: auto;
    }

    .header-search, .header-right {
      display: none;
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
    margin-right: 8px;
  }

  .search-icon svg {
    margin-right: 8px;
  }

</style>
