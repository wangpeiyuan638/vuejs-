import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    }
  ]
})
