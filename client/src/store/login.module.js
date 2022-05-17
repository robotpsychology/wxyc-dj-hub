// import { loginService } from '../services/login.service';
import { router } from '../router/index';

const state = {
    isLogin: false,
    token: null,
    user: null,
};

const actions = {
    login({ commit }, { username, password }) {
        commit('loginRequest', { username });

        // let result = loginService.login(username, password);
        if (result) {
            commit('loginSuccess');
            console.log("login success");
            router.push('/home');
        }
    },
    logout({ commit }) {
        commit('resetState');
        router.push('/');
    },
    clearState({ commit }) {
        commit('resetState');
    },
};

const mutations = {
    resetState(state) {
        state.isLogin = false;
        state.token = null;
        state.user = null;
    },
    loginRequest(state, user) {
        state.isLogin = true;
        state.token = null;
        state.user = user;
    },
    loginSuccess(state) {
        state.isLogin = true;
        state.token = null;
        state.user = null;
    },
    loginFailure(state) {
        state.isLogin = false;
    },
};

export const login = {
    namespaced: true,
    state,
    actions,
    mutations
};
