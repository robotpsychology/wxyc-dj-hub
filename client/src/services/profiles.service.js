/**
 * @file profiles.service.js is the service file for the Directus API calls relevant to Views/Profile and Components/profiles.
 * @author robotpsychology (Ali Alrabeah)
 */
import { directus } from "./directus.init";


/**
 * 
 * @returns 
 */


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
export async function createUser(table_name, payload) {

    const response = await directus.items(table_name).createOne(payload)

    // This patches the sort column with the id that's being added. It's initially null in Directus.
    const update = await directus.items(table_name).updateOne(response.id, { sort: response.id })

    return response, update
}

export async function deleteItem(table_name, itemID) {

    const response = await directus.items(table_name).deleteOne(itemID)
    return response
}

export async function editItem(table_name, itemID, payload) {

    const response = await directus.items(table_name).updateOne(itemID, payload)
    return response

}

export async function swapItemSortID(table_name, payload) {

    const response = await directus.utils.sort(table_name, payload.currentID, payload.newID)
    return response

}