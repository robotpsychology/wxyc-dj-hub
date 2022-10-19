import { directus } from "./directus.init";


export async function directusLogin(email, password) {
    // const response = await directus.auth.login({ email: process.env.VUE_APP_DIRECTUS_AUTH_EMAIL, password: process.env.VUE_APP_DIRECTUS_AUTH_PASSWORD })
    const response = await directus.auth.login({ email: email, password: password })
    return response
}
export async function directusLogout() {
    const response = await directus.auth.logout();
    return response
}


