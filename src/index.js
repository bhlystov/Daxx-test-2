import Vue from 'vue';
import App from './App';
import router from './router';

import VueLoading from 'vue2-loading';
Vue.use(VueLoading);

//Add bootstrap
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

document.addEventListener('DOMContentLoaded', function (event) {
    const mountPoint = document.getElementById('app');

    new Vue({
        router,
        render: h => h(App),
    }).$mount(mountPoint);
});