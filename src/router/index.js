import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import Login from '@/views/Login.vue';
import Users from '@/views/Users.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/users', component: Users, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/users');
  } else {
    next();
  }
});

export default router;