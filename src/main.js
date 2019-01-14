// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import '@styles/index.scss'
import '@styles/iconfont.css'
import '@styles/default.scss'
import '@styles/elementDefault.scss'
// import '@styles/home.scss'

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
