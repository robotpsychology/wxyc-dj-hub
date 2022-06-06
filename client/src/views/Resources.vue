<template>
  <div>
    <div>Resources</div>
    <div id="server_content">
      <div v-for="file in files">
        <div>file id: {{ file.id }}</div>
        <img
          :src="
            DIRECTUS_URI +
            file.filename_disk +
            '?fit=outside&width=100&height=100&quality=80'
          "
          alt=""
          async="on"
        />
      </div>
    </div>

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
import { DIRECTUS_URI } from "../config/dev.env";
import { getAllResources } from "../services/resources.service";
export default {
  name: "Resources",
  components: {},
  data() {
    return {
      files: null,
    };
  },
  methods: {},
  async mounted() {
    this.files = await getAllResources();
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
