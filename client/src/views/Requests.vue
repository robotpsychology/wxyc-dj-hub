<template>
  <div>Requests</div>
  <SelectButton
    id="entryType"
    v-model="requestType"
    :options="requestOptions"
  />

  <div v-if="playcutType == 'WXYC Library'" class="playcutForm">
    <InputText type="text" v-model="artist" placeholder="Artist" />
    <InputText type="text" v-model="artist" placeholder="Artist" />
    <InputText type="text" v-model="artist" placeholder="Artist" />
  </div>
  <div v-if="playcutType == 'Rotation'" class="playcutForm">you</div>
</template>

<script>
export default {
  name: "Requests",
  components: {},
  data() {
    return {
      artist: "",
      release: "",
      label: "",
      link: "",
      requestType: "WXYC Library",
      requestOptions: ["WXYC Library", "Rotation"],
    };
  },
  methods: {},
};
</script>

<style>
</style>
