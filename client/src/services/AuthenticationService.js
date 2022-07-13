import { directus } from "./directus.init";
import { useAuthStore } from "../store/auth.store";



export async function login(loginInfo) {
    const response = await directus.auth.login(loginInfo);
    // this.user.loginUser(loginInfo);
    console.log(response);



}


export async function register(credentials) {
    const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    return await response.json();
}