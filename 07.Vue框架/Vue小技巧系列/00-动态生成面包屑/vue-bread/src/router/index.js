import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 第一级
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      // 第二级
      {
        path: 'manage',
        name: 'Manage',
        component: () => import(/* webpackChunkName: "manage" */ '../views/manage.vue'),
        meta: {
          title: '活动管理'
        },
        // 第三级
        children: [
          {
            path: 'list',
            name: 'List',
            component: () => import(/* webpackChunkName: "list" */ '../views/list.vue'),
            meta: {
              title: '活动列表'
            }
          },
          {
            path: 'detail',
            name: 'Detail',
            component: () => import(/* webpackChunkName: "detail" */ '../views/detail.vue'),
            meta: {
              title: '活动详情'
            }
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
