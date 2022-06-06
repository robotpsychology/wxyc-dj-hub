<template>
  <div>
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

    <div v-if="requestType == 'Rotation'" class="playcutForm">
      <h3>Artist</h3>
      <InputText
        type="text"
        v-model="artist"
        placeholder="Antônio Carlos Jobim"
      />

      <h3>Release</h3>
      <InputText type="text" v-model="artist" placeholder="Wave" />

      <h3>Review</h3>
      <Textarea
        v-model="review"
        :autoResize="true"
        rows="5"
        cols="30"
        placeholder="A small paragraph that can fit on one of our CD sleeves"
      />
    </div>

    <div v-if="requestType == 'WXYC Library'" class="playcutForm">
      <h3>Artist</h3>
      <InputText
        type="text"
        v-model="artist"
        placeholder="Antônio Carlos Jobim"
      />

      <h3>Release</h3>
      <InputText type="text" v-model="artist" placeholder="Wave" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Requests",
  components: {},
  data() {
    return {
      artist: "",
      release: "",
      review: "",
      link: "",
      requestType: "Rotation",
      requestOptions: ["Rotation", "WXYC Library"],
    };
  },
  methods: {},
};
</script>

<style>
</style>
