// import Api from '@/services/Api'

// export default {
//     register(credentials) {
//         return Api().post('register', credentials)
//     },
//     login(credentials) {
//         return Api().post('login', credentials)
//     }
// }


export async function register(credentials) {
    const response = await fetch(`/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    return await response.json();
}