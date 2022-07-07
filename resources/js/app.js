require('./bootstrap');

import VueRouter from "vue-router";
import Vuex from 'vuex';
import Index from './Index';
import router from './routes';
import storeDefinition from './store';
import VueObserveVisibility from 'vue-observe-visibility';
import StarRating from 'vue-star-rating';
import Notifications from 'vue-notification';

window.Vue = require('vue').default;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueObserveVisibility);
Vue.use(Notifications);
Vue.component('star-rating', StarRating);

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