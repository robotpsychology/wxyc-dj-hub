<template>
  <div>
    <div>Resources</div>
    <div v-for="file in files">
      <div>file id: {{ file.id }}</div>
      <img
        :src="
          '//localhost:8055/assets/' +
          file.filename_disk +
          '?fit=outside&width=100&height=100&quality=80'
        "
        alt=""
        async="on"
      />
      <!-- <div
        class="image-div"
        :style="{
          backgroundImage: `url(localhost:8055/assets/${file.filename_disk}/?fit=cover&width=200&height=200&quality=80)`,
        }"
      ></div> -->
    </div>
  </div>
</template>

<script>
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

<style>
img {
}

.image-div {
  background-image: url();
}
</style>
