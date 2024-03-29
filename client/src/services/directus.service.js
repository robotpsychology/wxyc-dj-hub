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

    const response = await directus.items(table_name).readByQuery({ limit: -1, sort: "-sort" })
    return response
}


export async function getActiveShow() {
    const table_name = 'flowsheet_session'

    const response = await directus.items(table_name).readByQuery({
        sort: "-date_created", filter: {
            "status": {
                "_eq": 'active'
            }
        }
    })
    return response.data
}

export async function getCurrentShow(table_name) {

    const response = await directus.items(table_name).readByQuery({ limit: 1, sort: "-date_created" })
    return response.data[0]
}

export async function getPreviousShow(table_name) {

    const response = await directus.items(table_name).readByQuery({ limit: 2, sort: "-date_created" })
    return response.data[1]
}

export async function getPlaycutsByID(table_name, session_ID) {

    const response = await directus.items(table_name).readByQuery({
        limit: -1, sort: "-sort", filter: {
            "flowsheet_session_fr": {
                "_eq": session_ID
            }
        }
    })
    return response
}

export async function createItem(table_name, payload) {

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