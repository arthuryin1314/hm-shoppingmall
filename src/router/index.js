import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/store/index.js'
import layoutFrame from '@/views/layout/layoutFrame.vue'
import detail from '@/views/detail/detailIndex.vue'
import login from '@/views/login/loginIndex.vue'
import management from '@/views/management/manageIndex.vue'
import payment from '@/views/payment/payIndex.vue'
import searchPage from '@/views/search/searchPage.vue'
import searchList from '@/views/search/searchList.vue'
import home from '@/views/layout/firstPage.vue'
import divideClass from '@/views/layout/divideClass.vue'
import cartIndex from '@/views/layout/cartIndex.vue'
import myInfo from '@/views/layout/myInfo.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layoutFrame,
    redirect: '/home',
    children: [
      { path: '/home', component: home },
      { path: '/divideClass', component: divideClass },
      { path: '/cartIndex', component: cartIndex },
      { path: '/myInfo', component: myInfo }
    ]
  },
  { path: '/detail/:id', component: detail },
  { path: '/login', component: login },
  { path: '/management', component: management },
  { path: '/payment', component: payment },
  { path: '/searchPage', component: searchPage },
  { path: '/searchList', component: searchList }
]

const router = new VueRouter({
  routes
})
const authUrl = ['/payment', 'myInfo']
router.beforeEach((to, from, next) => {
  if (!authUrl.includes(to.path)) {
    next()
  } else {
    const token = getToken()
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
