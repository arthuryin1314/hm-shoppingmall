import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 1. 新增：引入 Message 组件
import { Menu, MenuItem, Submenu, MenuItemGroup } from 'element-ui'
// 2. 新增：引入 Message 对应的样式文件（按需引入必须加，否则样式会丢失）

import tabBar from '@/components/tabBar.vue'
import '@/styles/common.less'

Vue.component('tabBar', tabBar)
Vue.config.productionTip = false

Vue.use(Menu) // 对应 <el-menu>
Vue.use(MenuItem) // 对应 <el-menu-item>
Vue.use(Submenu) // 对应 <el-submenu>
Vue.use(MenuItemGroup) // 示例中没用到，但建议一起注册（防止后续扩展）

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
