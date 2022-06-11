/**
 * @file directus.service.js is the service file for the Directus API calls relevant the Vue Components and Views that call on the Directus API.
 * @author robotpsychology (Ali Alrabeah)
 */
import { directus } from "./directus.init";
import { directusLogin } from "./directus.auth";


// const table_name = "flowsheet_entries"

/**
 * 
 * @returns 
 */


export async function getAllItems(table_name) {
    // The /api/ path works because the vue.config.js file path was specified in the package.json file
    // const response = await fetch('/api/items');

    await directusLogin()
    const response = await directus.items(table_name).readByQuery({ limit: -1, sort: "-sort" })
    return response
}

export async function createItem(table_name, payload) {
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