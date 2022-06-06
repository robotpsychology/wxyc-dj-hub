/**
 * @file flowsheet.service.js is the service file for the Directus API calls relevant View/Flowsheet.vue and Component/FlowsheetEntries.vue.
 * @author robotpsychology (Ali Alrabeah)
 */
import { directus } from "./directus";

const table_name = "flowsheet_entries"

/**
 * 
 * @returns 
 */
export async function getAllPlaycuts() {
    // This works because the vue.config.js file path was specified in the package.json file
    // const response = await fetch('/api/playcuts');
    // const response = await fetch('http://localhost:8055/items/flowsheet');
    const response = await directus.items(table_name).readByQuery({ limit: -1, sort: "-sort" })
    return response.data;
}

export async function createPlaycut(data) {
    const response = await directus.items(table_name).createOne(data)
    // This patches the sort column with the id that's being added. It's initially null in Directus.
    const update = await directus.items(table_name).updateOne(response.id, { sort: response.id })
    return response, update
}

export async function deletePlaycut(playcutID) {
    const response = await directus.items(table_name).deleteOne(playcutID)
    return response
}

export async function editPlaycut(data) {
    // const response = await fetch(`/api/playcut`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ playcut: data })
    // })
    // return await response.json();
}

export async function swapSortID(data) {
    const response = await directus.utils.sort(table_name, data.currentID, data.newID)
    return response

}