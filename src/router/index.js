import { createRouter, createWebHistory } from 'vue-router'
import Home from '../vews/Home.vue';
import Register from '../vews/Register.vue';
import Login from '../vews/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', component: Home },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '', redirect: '/home' }
  ]
});

export default router