import { directus } from "./directus";

export async function getAllPlaycuts() {
    // This works because the vue.config.js file path was specified in the package.json file
    // const response = await fetch('/api/playcuts');
    // const response = await fetch('http://localhost:8055/items/flowsheet');
    const response = await directus.items("flowsheet_entries").readByQuery({ limit: -1, sort: "-id" })
    return response.data;
}

export async function getLastChronOrderID() {
    const response = await fetch('/api/playcuts/lastChronOrderID');
    return await response.json();
}


export async function createPlaycut(data) {
    const response = await fetch(`/api/playcut`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playcut: data })
    })
    return await response.json();
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
    const response = await directus.utils.sort('flowsheet', data.currentID, data.newID)
    // const response = await directus.items('flowsheet').updateOne(data.currentID, { id: data.newID })
    // const response_two = await directus.items('flowsheet').updateOne(data.newID, { id: data.currentID })

    console.log(response)
    // console.log(response_two)
    // return response

    // console.log(data, 'gigih')


}