import { defineStore } from 'pinia'
import { directusLogin } from "../services/directus.auth";
import { getCurrentUser } from '../services/profiles.service';
import { router } from "@/router"


export const useFlowsheetStore = defineStore({
    // id is required so that Pinia can connect the store to the devtools
    id: 'flowsheet',
    state: () => ({
        flowsheet_session_id: null, previousShowInfo: null, currentShowInfo: null,
    }),
    getters: {

    },
    actions: {
        createShow(payload) {
            // update pinia state
            this.$state.flowsheet_session_id = payload.flowsheet_session_id

        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/login');
        }
    }
})