/**
 * @file profiles.service.js is the service file for the Directus API calls relevant to Views/Profile and Components/profiles.
 * @author robotpsychology (Ali Alrabeah)
 */
import { directus } from "./directus.init";
import { directusLogin } from "./directus.auth";



/**
 * 
 * @returns 
 */


export async function getAllProfiles() {
    await directusLogin()
    const response = await directus.users.readByQuery({ limit: -1, fields: ['first_name', 'last_name', 'email', 'avatar', 'title', 'description'] })
    return response
}

export async function getAllAvatars() {
    await directusLogin()
    const response = await directus.files.readByQuery({
        "filename": { "_eq": filename }
    })
    return response
}

export async function createUser(table_name, payload) {
    await directusLogin()

    const response = await directus.items(table_name).createOne(payload)

    // This patches the sort column with the id that's being added. It's initially null in Directus.
    const update = await directus.items(table_name).updateOne(response.id, { sort: response.id })

    return response, update
}

export async function deleteItem(table_name, itemID) {
    await directusLogin()

    const response = await directus.items(table_name).deleteOne(itemID)
    return response
}

export async function editItem(table_name, itemID, payload) {
    await directusLogin()

    const response = await directus.items(table_name).updateOne(itemID, payload)
    return response

}

export async function swapItemSortID(table_name, payload) {
    await directusLogin()

    const response = await directus.utils.sort(table_name, payload.currentID, payload.newID)
    return response

}