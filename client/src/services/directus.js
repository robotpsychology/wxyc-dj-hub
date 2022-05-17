import { Auth, Directus } from "@directus/sdk";
import { DIRECTUS_URI } from '../config/dev.env'

export const directus = new Directus(DIRECTUS_URI);

async function start() {
    // But, we need to authenticate if data is private
    let authenticated = false;

    // Try to authenticate with token if exists
    await directus.auth
        .refresh()
        .then(() => {
            authenticated = true;
        })
        .catch(() => { });

    // Let's login in case we don't have token or it is invalid / expired
    while (!authenticated) {
        const email = window.prompt('Email:');
        const password = window.prompt('Password:');

        await directus.auth
            .login({ email, password })
            .then(() => {
                authenticated = true;
            })
            .catch(() => {
                window.alert('Invalid credentials');
            });
    }
}

start()


