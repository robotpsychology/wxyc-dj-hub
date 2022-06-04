/**
 * @file resources.service.js is the service file for the Directus API calls relevant View/Resources.vue.
 * @author robotpsychology (Ali Alrabeah)
 */

import { directus } from "./directus";

const table_name = "flowsheet_entries"

export async function getAllResources() {
    // This works because the vue.config.js file path was specified in the package.json file
    // const response = await fetch('/api/playcuts');
    // const response = await fetch('http://localhost:8055/items/flowsheet');
    const response = await directus.files.readByQuery({ limit: -1 })
    console.log(response.data)
    return response.data;
}

