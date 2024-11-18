import { createRouter, createWebHistory } from 'vue-router'
import TemplateMessage from '../views/TemplateMessage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Template',
      component: TemplateMessage,
    },
    {
      path: '/templates',
      name: 'Templates',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/__TemplatesList.vue'),
    },
  ],
})

export default router
