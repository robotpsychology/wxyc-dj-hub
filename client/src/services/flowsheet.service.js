import { directus } from "./directus";

const table_name = "flowsheet_entries"

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

export async function deletePlaycut(playcutId) {
    // const response = await fetch(`/api/playcut/${playcutId}`, { method: 'DELETE' })
    // return await response.json();
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