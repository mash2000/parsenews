require('./bootstrap');

import VueRouter from "vue-router";
import Vuex from 'vuex';
import Index from './Index';
import router from './routes';
import storeDefinition from './store';
import VueObserveVisibility from 'vue-observe-visibility';

window.Vue = require('vue').default;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueObserveVisibility);

const store = new Vuex.Store(storeDefinition);

window.axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (401 === error.response.status) {
            store.dispatch("logout");
        }

        return Promise.reject(error);
    }
);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        'index': Index,
    },
});