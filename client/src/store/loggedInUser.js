import { defineStore } from 'pinia'

export const useLoggedInUserStore = defineStore({
    // id is required so that Pinia can connect the store to the devtools
    id: 'loggedInUser',
    state: () => ({ name: 'John Doae', email: 'fake@email.com', username: 'jd123' }),
    getters: {
        nameCount: function () {
            return this.name.length
        },
    },
    actions: {
        loginUser: function (info) {
            this.email = info.email
        }
    }
})