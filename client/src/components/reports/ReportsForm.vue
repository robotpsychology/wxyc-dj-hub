<template>
  <form id="reportsForm" action="" @submit.prevent="reportSubmit" method="post">
    <!-- <SelectButton
      id="reportType"
      v-model="reportType"
      :options="reportOptions"
    /> -->

    <div v-if="reportType == 'Media'">
      <h3>Genre</h3>
      <Dropdown
        v-model="selectedGenre"
        :options="genres"
        placeholder="Select a Genre"
        required
      />

      <h3>Format</h3>

      <SelectButton
        id="entryType"
        v-model="selectedFormat"
        :options="formats"
        required
      />

      <h3>Library Code</h3>
      <InputText
        type="text"
        v-model="libraryCode"
        placeholder="BO 9/5"
        required
      />

      <h3>Artist</h3>
      <InputText
        type="text"
        v-model="artistName"
        placeholder="David Bowie"
        required
      />

      <h3>Release</h3>
      <InputText
        type="text"
        v-model="releaseTitle"
        placeholder="Hunky Dory"
        required
      />
    </div>

    <div v-else>
      <h3>Location</h3>
      <InputText
        type="text"
        v-model="location"
        placeholder="Prod Room"
        required
      />

      <h3>Device</h3>
      <InputText
        type="text"
        v-model="deviceType"
        placeholder="CD Player"
        required
      />

      <h3>Brand Name</h3>
      <InputText
        type="text"
        v-model="brandName"
        placeholder="RadioShack"
        required
      />

      <h3>Model Number/SKU</h3>
      <InputText type="text" v-model="modelNumber" placeholder="DX-5090" />

      <h3>Description</h3>
      <Textarea
        v-model="description"
        :autoResize="true"
        rows="5"
        cols="30"
        required
      />
    </div>

    <br />
    <Button type="submit" value="submit" label="Submit"></Button>
  </form>
</template>

<script>
import * as directusService from "../../services/directus.service";

import Textarea from "primevue/textarea";

export default {
  name: "RequestsForm",
  components: { Textarea },
  props: {
    reportType: {
      type: String,
    },
    mediaTableName: {
      type: String,
    },
    equipmentTableName: {
      type: String,
    },
  },
  data() {
    return {
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
      formats: ["CD", "Vinyl"],

      // Media Data
      selectedFormat: "CD",
      selectedGenre: "Rock",
      libraryCode: "",
      artistName: "",
      releaseTitle: "",

      // Equipment Data
      deviceType: "",
      location: "",
      brandName: "",
      modelNumber: "",
      description: "",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async reportSubmit() {
      if (this.reportType == "Media") {
        const payload = {
          format: this.selectedFormat,
          genre: this.selectedGenre,
          library_code: this.libraryCode,
          artist_name: this.artistName,
          release_title: this.releaseTitle,
        };

        await directusService.createItem(this.$props.mediaTableName, payload);
      } else {
        const payload = {
          location: this.location,
          brand_name: this.brandName,
          device_type: this.deviceType,
          model_number: this.modelNumber,
          description: this.description,
        };

        await directusService.createItem(
          this.$props.equipmentTableName,
          payload
        );
      }

      this.$emit("getAllReports", this.reportType);
      this.clearForm();
    },

    clearForm() {
      this.libraryCode = "";
      this.artistName = "";
      this.releaseTitle = "";

      this.format = "";
      this.equipmentName = "";
      this.modelNumber = "";
      this.location = "";
      this.brandName = "";
      this.description = "";
    },
  },
};
</script>

<style scoped>
</style>