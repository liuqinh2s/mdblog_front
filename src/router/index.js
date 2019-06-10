import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Hot from '@/views/Hot'
import Mine from '@/views/Mine'
import Move from '@/views/Move'
import Editor from '@/components/Editor.vue'
import BaseHeader from '@/components/BaseHeader'
import ArticleList from '@/components/ArticleList'
import Article from '@/components/Article'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/hot',
      name: 'Hot',
      component: Hot
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/editor/:articleId',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/baseHeader',
      name: 'BaseHeader',
      component: BaseHeader
    },
    {
      path: '/article-list',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/article/:articleId',
      name: 'Article',
      component: Article
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/move',
      name: 'Move',
      component: Move
    }
  ]
})
