<template>
  <div>Reports</div>
  <SelectButton id="entryType" v-model="reportType" :options="reportOptions" />
  <div v-if="reportType != 'Equipment'">
    <Dropdown
      v-model="selectedGenre"
      :options="genres"
      placeholder="Select a Genre"
    />
    <InputText type="text" v-model="libraryCode" placeholder="BO 9/5" />
    <InputText type="text" v-model="artistName" placeholder="David Bowie" />
    <InputText type="text" v-model="releaseTitle" placeholder="Hunky Dory" />
  </div>
  <div v-else>
    <InputText type="text" v-model="equipmentName" placeholder="CD Player" />
    <InputText type="text" v-model="room" placeholder="Prod Room" />
    <InputText type="text" v-model="modelNumber" placeholder="DX-5090" />
    <h5>Description</h5>
    <Textarea v-model="description" :autoResize="true" rows="5" cols="30" />
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
