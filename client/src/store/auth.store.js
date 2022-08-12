import { defineStore } from 'pinia'
import { directusLogin } from "../services/directus.auth";
import { getCurrentUser } from '../services/profiles.service';
import { router } from "@/router"


export const useAuthStore = defineStore({
    // id is required so that Pinia can connect the store to the devtools
    id: 'loggedInUser',
    state: () => ({
        first_name: '', last_name: '', email: '',
        access_token: null, access_token_expires: null
        // username: null,
    }),
    getters: {
        firstNameCount: function () {
            return this.first_name.length
        },
    },
    actions: {
        async login(email, password) {
            const userLogin = await directusLogin(email, password);
            const currentUser = await getCurrentUser();
            console.log(currentUser)

            // user to set local storage
            this.userAccess = userLogin

            // update pinia state
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
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
})