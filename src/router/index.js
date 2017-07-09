import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import details from '@/components/details'
import booklist from '@/components/booklist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      redirect: '/booklist',
      children: [{
      	path: '/booklist',
      	component:booklist
      },{
      	path: '/details/:id',
      	component:details
      }]
    }
  ]
})
