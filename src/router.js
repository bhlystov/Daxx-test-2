import Vue from 'vue';
import VueRouter from 'vue-router'

// import BooksList from './pages/BooksList.vue';
// import BookDescription from './pages/BookDescription.vue';
// import AuthorListOfBooks from './pages/AuthorListOfBooks.vue';
import Analytics from './components/Analytics.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Analytics,
        // props: route => {
        //     return {
        //         setNumberOfPage: parseInt(route.query.setNumberOfPage),
        //         sortBy: route.query.sortBy,
        //         filterBookName: route.query.filterBookName
        //     };
        // },
    },
    // {
    //     path: '/book',
    //     name: 'bookDescription',
    //     component: BookDescription,
    //     props: route => {
    //         return {
    //             idBook: parseInt(route.query.idBook),
    //         };
    //     },
    // },
    // {
    //     path: '/author',
    //     name: 'author',
    //     component: AuthorListOfBooks,
    //     props: route => {
    //         return {
    //             authorId: parseInt(route.query.authorId),
    //         };
    //     },
    // },
    {
        path: '*',
        redirect: {path: '/'},
    },
];

const router = new VueRouter({
    routes,
});

export default router;