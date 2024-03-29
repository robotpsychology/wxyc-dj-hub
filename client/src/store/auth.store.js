import { defineStore } from 'pinia'
import { directusLogin } from "../services/directus.auth";
import { getCurrentUser } from '../services/user.service';
import { router } from "@/router"


export const useAuthStore = defineStore({
    // id is required so that Pinia can connect the store to the devtools
    id: 'loggedInUser',
    state: () => ({
        userActive: null | Boolean,
        first_name: null, last_name: null, email: null,
        access_token: null, access_token_expires: null,
        username: null,
    }),
    getters: {
    },
    actions: {
        async login(email, password) {
            const userLogin = await directusLogin(email, password);
            const currentUser = await getCurrentUser();

            // user to set local storage
            this.userAccess = userLogin

            // update pinia state
            this.$state.userActive = true

            this.$state.email = email
            this.$state.access_token = userLogin.access_token
            this.$state.access_token_expires = userLogin.expires
            this.$state.first_name = currentUser.first_name
            this.$state.last_name = currentUser.last_name



            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(this.userAccess));

            // redirect to previous url or default to home page
            router.push(this.returnUrl || '/');
        },
        logout() {
            // directus logout
            this.$state.userActive = false

            this.$state.email = null
            this.$state.access_token = null
            this.$state.access_token_expires = null
            this.$state.first_name = null
            this.$state.last_name = null

            localStorage.removeItem('user');

            router.push('/login');
        }
    }
})