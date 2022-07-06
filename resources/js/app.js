require('./bootstrap');

import VueRouter from "vue-router";
import Vuex from 'vuex';
import Index from './Index';
import router from './routes';

window.Vue = require('vue').default;
Vue.use(VueRouter);
Vue.use(Vuex);

const app = new Vue({
    el: '#app',
    router,
    components: {
        'index': Index,
    },
});