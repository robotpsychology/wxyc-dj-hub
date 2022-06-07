/**
 * @file requests.service.js is the service file for the Directus API calls relevant to views/Requests.vue.
 * @author robotpsychology (Ali Alrabeah)
 */
import { directus } from "./directus";

const table_name = "requests"

/**
 * 
 * @returns 
 */

export async function getAllRequests() {
    const response = await directus.items(table_name).readByQuery({ limit: -1, sort: "-sort" })
    return response.data;
}

export async function createRequest(data) {
    const response = await directus.items(table_name).createOne(data)
    // This patches the sort column with the id that's being added. It's initially null in Directus.
    const update = await directus.items(table_name).updateOne(response.id, { sort: response.id })
    return response, update
}

export async function deleteRequest(requestID) {
    const response = await directus.items(table_name).deleteOne(playcutID)
    return response
}

export async function editRequest(data) {
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