import { directus } from "./directus.init";


export async function directusLogin(email, password) {
    const response = await directus.auth.login({ email: process.env.VUE_APP_DIRECTUS_AUTH_EMAIL, password: process.env.VUE_APP_DIRECTUS_AUTH_PASSWORD })
    return response
}


