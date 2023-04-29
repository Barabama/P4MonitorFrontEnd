import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import VCharts from 'v-charts'
// import './assets/scss/cover-element.scss'
// import './assets/scss/common.scss'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import global from './Global.vue'
import dataV from '@jiaminghi/data-view'

const echarts = require('echarts')
Vue.prototype.$echarts = echarts
Vue.prototype.global = global
Vue.use(dataV)
Vue.component('chart', echarts)
Vue.use(VCharts)
Vue.use(ElementUI)
import '@/icons' // icon
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
