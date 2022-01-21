import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import CartPage from "../views/CartPage";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cart/',
    name: 'CartPage',
    component: CartPage
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
