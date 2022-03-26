import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/pages/Home'
import Details from '@/views/pages/Details'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:filter',
    name: 'Filter',
    redirect: to =>{
      return { path:'/', query:{type:to.params.filter} };
    }
  },
  {
    path: '/details',
    name: 'Details',
    component:Details
  },
  {
    path: '/details/:key',
    name: 'Key',
    redirect: to =>{
      return { path:'/details', query:{pokemons:to.params.key} };
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
