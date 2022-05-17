import * as Vue from 'vue';
import Vuex from 'vuex';
//general
import { login } from './login.module';

// Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        login
    }
});
