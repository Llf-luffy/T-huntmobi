import Vue from 'vue'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
// import './utils/error-log' // error log

// import './utils/directives.js'
import { getCookies } from '@/utils/auth'

// import * as filters from './filters' // global filters
import VueParticles from 'vue-particles'

// import stickyDirective from '@/utils/stick'
// Vue.use(stickyDirective)

// 权限指令
// import permission from './components/Permission'
// import Pagination from '@/components/Pagination'
// import draggable from 'vuedraggable'
// 自定义表格工具扩展
// import Toolbar from '@/components/Toolbar'
// import DateRangePicker from '@/components/DateRangePicker'
// import DatePicker from '@/components/DatePicker'
// import DateMonthPicker from '@/components/DateMonthPicker'
// import DateMonthRangePicker from '@/components/DateMonthRangePicker'
// import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
// import Select from '@/components/Select/index'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
Vue.use(VueParticles)
// Vue.use(permission)

// 全局组件挂载
// Vue.component('Pagination', Pagination)
// Vue.component('Toolbar', Toolbar)
// Vue.component('draggable', draggable)
// Vue.component('DateRangePicker', DateRangePicker)
// Vue.component('DatePicker', DatePicker)
// Vue.component('DateMonthPicker', DateMonthPicker)
// Vue.component('DateMonthRangePicker', DateMonthRangePicker)
// Vue.component('ElImageViewer', ElImageViewer)
// Vue.component('Select', Select)

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

Vue.use(Element, {
  size: getCookies('size') || 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
