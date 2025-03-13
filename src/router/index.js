import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Registration from '../views/Registration.vue';
import Home from '../views/Home.vue';
import AllUsers from '../views/AllUsers.vue';
import ProductList from '../views/products/ProductList.vue';
import ProductDetails from '../views/products/ProductDetails.vue';
import Profile from '../views/Profile.vue';
import Cart from '../views/Cart.vue';


const routes = [
  { path: '/login', component: Login },
  { path: '/home', component: Home },
  { path: '/registration', component: Registration },
  { path: '/users', component: AllUsers } ,
  { path: '/products', component: ProductList },
  { path: '/products/:id', component: ProductDetails,props: true } ,
  { path: '/profile', component: Profile } ,
  { path: '/cart', component: Cart } 

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
