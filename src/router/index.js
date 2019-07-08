import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import New from '@/views/New.vue'
import Hot from '@/views/Hot'
import Mine from '@/views/Mine'
import Move from '@/views/Move'
import Tags from '@/views/Tags'
import Editor from '@/components/Editor.vue'
import BaseHeader from '@/components/BaseHeader'
import ArticleList from '@/components/ArticleList'
import Article from '@/components/Article'
import Comment from '@/components/Comment'
import Social from '@/views/Social'
import Search from '@/views/Search'
import Chaobi from '@/views/Chaobi'

Vue.use(Router)

export default new Router({
  mode:'history',
  // base: '/blog/',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'New',
      component: New
    },
    {
      path: '/hot',
      name: 'Hot',
      component: Hot
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
    },
    {
      path: '/tags',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {
      path: '/social/:id',
      name: 'Social',
      component: Social,
    },
    {
      path: '/search/:searchContent',
      name: 'Search',
      component: Search,
    },
    {
      path: '/chaobi',
      name: 'Chaobi',
      component: Chaobi
    },
  ]
})
