import Vue from 'vue';
import App from './App';
import router from './router';

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ru-RU';

Vue.use(ElementUI, {locale});

//Add Lodash for pagination
import VueLodash from 'vue-lodash';
const options = { name: 'lodash' };
Vue.use(VueLodash, options);

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