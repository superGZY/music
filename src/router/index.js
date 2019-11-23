import Vue from 'vue'
import VueRouter from 'vue-router'

import index from 'pages/index/index'
import find from 'pages/index/find'
import video from 'pages/index/video'
import my from 'pages/index/my'
import profile from 'pages/profile/profile'
import rankinglist from 'pages/rankinglist/rankinglist'
import everyday from 'pages/everyday/everyday'
import login from 'pages/login/login'
import phonelogin from 'pages/login/phonelogin'
import res from 'pages/login/res'
import number from 'pages/login/number'
import songlistdetail from 'pages/songlistdetail/songlistdetail'
import search from 'pages/search/search'
import searchdetail from 'pages/search/searchdetail'
import videoplay from 'pages/video/videoplay'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    children: [
      {
        path: 'find',
        name: 'indexfind',
        component: find,
      },
      {
        path: 'video',
        name: 'index-video',
        component: video,
      },
      {
        path: 'my',
        name: 'index-my',
        component: my,
      }
    ]
  },
  {
    path: '/profile',
    name: 'profile',
    component: profile
  },
  {
    path: '/rankinglist',
    name: 'rankinglist',
    component: rankinglist
  },
  {
    path: '/everyday',
    name: 'everyday',
    component: everyday,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/phonelogin',
    name: 'phonelogin',
    component: phonelogin,
  },
  {
    path: '/res',
    name: 'res',
    component: res,
  },
  {
    path: '/number',
    name: 'number',
    component: number,
  },
  {
    path: '/songlistdetail',
    name: 'songlistdetail',
    component: songlistdetail,
  },
  {
    path: '/search',
    name: 'search',
    component: search,
  },
  {
    path: '/searchdetail/:keyword',
    name: 'searchdetail',
    component: searchdetail,
  },
  {
    path: '/videoplay/:id',
    name: 'videoplay',
    component: videoplay,
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
