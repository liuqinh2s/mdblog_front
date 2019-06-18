// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'
import brands from '@fortawesome/fontawesome-free-brands'
import 'font-awesome/css/font-awesome.min.css'
import 'github-markdown-css'
import hljs from 'highlight.js'
import 'highlight.js/styles/googlecode.css' //样式文件
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import BootstrapVue from 'bootstrap-vue'
import 'babel-polyfill'
import infiniteScroll from 'vue-infinite-scroll'
// import ADDRESS from '@/assets/js/common.js'

// import '@/assets/css/vue.css'

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(infiniteScroll)
// Vue.prototype.ADDRESS = ADDRESS

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false
Vue.http.interceptors.push((request, next) => {
  request.credentials = true;
  next();
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


