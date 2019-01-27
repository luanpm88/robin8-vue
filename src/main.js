// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import "ant-design-vue/lib/table/style/css";
import '@javascripts/validate.js'
import '@styles/iconfont.css'
import '@styles/btn.scss'
import '@styles/grid.scss'
import '@styles/form.scss'
import '@styles/default.scss'
import '@styles/login.scss'
import '@styles/campaigns.scss'
import '@styles/defaultAnt.scss'

Vue.use(VueI18n)
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)

const i18n = new VueI18n({
  // locale: 'zh-CN', // 设置语言
  locale: 'en-US', // 设置语言
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': require('./assets/languages/lib/zh'),   // 中文语言包
    'en-US': require('./assets/languages/lib/en')    // 英文语言包
  }
})

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
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
