import { Auth, Directus } from "@directus/sdk";



export const directus = new Directus(process.env.VUE_APP_DIRECTUS_URI);

async function start() {
    // But, we need to authenticate if data is private
    let authenticated = false;

    // Try to authenticate with token if exists
    // await directus.auth
    //     .refresh()
    //     .then(() => {
    //         authenticated = true;
    //     })
    //     .catch(() => { });


    if (!authenticated) {
        await directus.auth
            .login({ email: process.env.VUE_APP_DIRECTUS_AUTH_EMAIL, password: process.env.VUE_APP_DIRECTUS_AUTH_PASSWORD })
            .then(() => {
                authenticated = true;
            })
            .catch(() => {
                window.alert('Invalid credentials');
            });
    }

    // Let's login in case we don't have token or it is invalid / expired
    // ORIGINAL CODE
    // while (!authenticated) {
    //     const email = window.prompt('Email:');
    //     const password = window.prompt('Password:');

    //     await directus.auth
    //         .login({ email, password })
    //         .then(() => {
    //             authenticated = true;
    //         })
    //         .catch(() => {
    //             window.alert('Invalid credentials');
    //         });
    // }
}

start()


