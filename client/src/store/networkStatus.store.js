import { defineStore } from 'pinia'

import { router } from "@/router"


export const useNetworkStatusStore = defineStore({
    // id is required so that Pinia can connect the store to the devtools
    id: 'networkStatus',
    state: () => ({
        onLine: navigator.onLine
    }),
    getters: {

    },
    actions: {

    }
})