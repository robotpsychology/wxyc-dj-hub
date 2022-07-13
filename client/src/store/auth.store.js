import { defineStore } from 'pinia'
import { directusLogin } from "../services/directus.auth";
import { router } from "@/router"


export const useAuthStore = defineStore({
    // id is required so that Pinia can connect the store to the devtools
    id: 'loggedInUser',
    state: () => ({ name: 'John Doae', email: 'fake@email.com', username: 'jd123' }),
    getters: {
        nameCount: function () {
            return this.name.length
        },
    },
    actions: {
        async login(email, password) {
            const user = await directusLogin(email, password);


            // update pinia state
            this.user = user;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

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