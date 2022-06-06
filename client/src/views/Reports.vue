<template>
  <div>
    <div>Reports</div>
    <SelectButton
      id="entryType"
      v-model="reportType"
      :options="reportOptions"
    />
    <div v-if="reportType != 'Equipment'">
      <h3>Genre</h3>

      <Dropdown
        v-model="selectedGenre"
        :options="genres"
        placeholder="Select a Genre"
      />

      <h3>Library Code</h3>
      <InputText type="text" v-model="libraryCode" placeholder="BO 9/5" />

      <h3>Artist</h3>
      <InputText type="text" v-model="artistName" placeholder="David Bowie" />

      <h3>Release</h3>
      <InputText type="text" v-model="releaseTitle" placeholder="Hunky Dory" />
    </div>
    <div v-else>
      <h3>Location</h3>
      <InputText type="text" v-model="room" placeholder="Prod Room" />

      <h3>Device</h3>
      <InputText type="text" v-model="equipmentName" placeholder="CD Player" />

      <h3>Model Number/SKU</h3>
      <InputText type="text" v-model="modelNumber" placeholder="DX-5090" />

      <h3>Description</h3>
      <Textarea v-model="description" :autoResize="true" rows="5" cols="30" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Reports",
  components: {},
  data() {
    return {
      reportType: "CD",
      reportOptions: ["CD", "Vinyl", "Equipment"],
      selectedGenre: "Rock",
      genres: [
        "Rock",
        "Hiphop",
        "Blues",
        "Electronic",
        "Classical",
        "Asia",
        "Africa",
        "Latin",
        "Jazz",
        "OCS",
        "Reggae",
        "Soundtracks",
      ],
      libraryCode: "",
      artistName: "",
      releaseTitle: "",
      equipmentName: "",
      room: "",
      brandName: "",
      modelNumber: "",
      description: "",
    };
  },
  methods: {},
};
</script>

<style>
</style>
