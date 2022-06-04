<template>
  <div>
    <div>Resources</div>
    <div v-for="file in files">
      <div>file id: {{ file.id }}</div>
      <img :src="'localhost:8055/assets/' + file.id" alt="hi" />
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
  width: 100%;
  height: 100%;
}
</style>
