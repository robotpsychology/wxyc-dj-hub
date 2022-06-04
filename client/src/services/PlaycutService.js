import { directus } from "./directus";

const table_name = "flowsheet_entries"

export async function getAllPlaycuts() {
    // This works because the vue.config.js file path was specified in the package.json file
    // const response = await fetch('/api/playcuts');
    // const response = await fetch('http://localhost:8055/items/flowsheet');
    const response = await directus.items(table_name).readByQuery({ limit: -1, sort: "-sort" })
    return response.data;
}

export async function getLastChronOrderID() {
    // const response = await fetch('/api/playcuts/lastChronOrderID');
    const response = await directus.items(table_name).readByQuery({
        limit: 1, filter: {
            sort: {
                "_eq": "max"
            }
        }
    })
    console.log(response)
    // return await response.json();
}


export async function createPlaycut(data) {
    // const response = await fetch(`/items/flowsheet_entries`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ playcut: data })
    // })
    const response = await directus.items(table_name).createOne(data)
    const update = await directus.items(table_name).updateOne(response.id, { sort: response.id })
    console.log(response)
    // return await response.json();

}

export async function deletePlaycut(playcutId) {
    const response = await fetch(`/api/playcut/${playcutId}`, { method: 'DELETE' })
    return await response.json();
}

export async function editPlaycut(data) {
    const response = await fetch(`/api/playcut`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playcut: data })
    })
    return await response.json();
}

export async function swapChronOrderID(data) {
    // const response = await fetch(`/api/playcut/swapChronOrderID`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ payload: data })
    // })
    // return await response.json();

    const response = await directus.utils.sort(table_name, data.currentID, data.newID)

    // const response = await directus.items(table_name).updateOne(data.currentID, { chron_order_id: data.newID })
    // const response2 = await directus.items(table_name).updateOne(data.newID, { chron_order_id: data.currentID })

}