<template>
  <div>
    <div>Resources</div>
    <div id="server_content">
      <div v-for="file in files">
        <div>file title: {{ file.title }}</div>
        <img
          :src="
            '//localhost:8055/assets/' +
            file.filename_disk +
            '?access_token=' +
            storage['access_token'] +
            '?fit=outside&width=100&height=100&quality=80'
          "
          alt=""
          async="on"
        />
      </div>
      {{ storage["access_token"] }}
    </div>

    <h3>Look, PSAs</h3>
    <iframe
      src="https://docs.google.com/presentation/d/e/2PACX-1vSKBCAdW2n3DKri-b9bVZVsfGcnQzaWiBz3vNX4pCaa0cPxL-bchoA1GEz4xqvbCeDFfjV5nGt6H6PD/embed?start=false&loop=false&delayms=60000"
      frameborder="0"
      width="960"
      height="569"
      allowfullscreen="true"
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
    ></iframe>
  </div>
</template>

<script>
import * as directusService from "../services/directus.service";
import * as directusFiles from "../services/files.service";

export default {
  name: "Resources",
  components: {},
  data() {
    return {
      table_name: "resources",
      files: null,
      storage: JSON.parse(localStorage.user),
      token: this.storage,
    };
  },
  methods: {},
  async mounted() {
    // this.files = await directusService.getAllItems(this.table_name);
    this.files = await directusFiles.getAllFiles();
  },
};
</script>

<style scoped>
#server_content {
  display: flex;
  justify-content: space-around;
}
img {
}
</style>
