import Vue from 'vue'
import VueRouter from 'vue-router'
import './config/rem'
import Login from './components/login/login'
import VueResource from 'vue-resource'
import Goods from './components/goods/goods'
import store from './store/store'
import Buyergoods from './components/buyer/goods'
import Account from './components/account/account'
import Settle from './components/settle/settle'
import Seller from './components/seller/seller'
import Cart from './components/cart/cart'
import Element from 'element-ui'
Vue.use(Element)
Vue.use(VueResource)
Vue.use(require('vue-resource'));
Vue.use(VueRouter)
Vue.http.options.xhr = { withCredentials: true }


const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }


// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '/login', component: Login },
  { path: '/goods', component: Goods},
  { path: '/', redirect: '/goods' },
  { path: '/buyergoods', component: Buyergoods },
  { path: '/account', component: Account },
  { path: '/settle', component: Settle},
  { path: '/seller', component: Seller},
  { path: '/cart', component: Cart}
]


const router = new VueRouter({
	routes
})

new Vue({
  router,
  store
}).$mount('#app')