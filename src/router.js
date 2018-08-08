import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: () => import('./components/Analytics.vue'),
    },
    {
        path: '*',
        redirect: {path: '/'},
    },
];

const router = new VueRouter({
    routes,
});

export default router;