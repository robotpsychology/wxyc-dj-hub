/**
 * @file user.service.js is the service file for the Directus API calls relevant to Views/Profile and Components/profiles.
 * @author robotpsychology (Ali Alrabeah)
 */
import { directus } from "./directus.init";


/**
 * 
 * @returns 
 */

export async function createUser(payload) {
    // user-role id for a DJ
    payload.role = "8ce137a8-1b02-46f9-8837-2d31f62fd6fb"
    const response = await directus.users.createOne(payload)
    return response
}


export async function getAllProfiles() {
    const response = await directus.users.readByQuery({ limit: -1, fields: ['first_name', 'last_name', 'email', 'avatar', 'title', 'description'] })
    return response
}

export async function getCurrentUser() {
    const response = await directus.users.me.read({ fields: ['first_name', 'last_name', 'email', 'avatar', 'title', 'description', 'id'] })
    return response
}

export async function getUserPlaycuts() {
    const table_name = 'flowsheet_entries'
    const response = await directus.items(table_name).readByQuery({ limit: -1, sort: "-sort", filter: { 'user_created': { "_eq": "$CURRENT_USER" } } })
    return response
}







// templates


export async function editItem(table_name, itemID, payload) {

    const response = await directus.items(table_name).updateOne(itemID, payload)
    return response

}
