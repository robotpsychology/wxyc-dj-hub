<template>
  <div>
    <form
      id="requestsForm"
      action=""
      @submit.prevent="requestSubmit"
      method="post"
    >
      <div>Requests</div>
      <SelectButton
        id="entryType"
        v-model="requestType"
        :options="requestOptions"
      />

      <h3>Artist</h3>
      <InputText
        type="text"
        v-model="artistName"
        placeholder="Antônio Carlos Jobim"
        required
      />

      <h3>Release</h3>
      <InputText
        type="text"
        v-model="releaseTitle"
        placeholder="Wave"
        required
      />

      <div v-if="requestType == 'Rotation'">
        <h3>Review</h3>
        <Textarea
          type="text"
          v-model="review"
          :autoResize="true"
          rows="5"
          cols="30"
          placeholder="A small paragraph that can fit on one of our CD sleeves"
          required
        />
      </div>

      <br />
      <Button type="submit" value="submit" label="Submit"></Button>
    </form>

    <RequestsTable
      v-if="requests.length > 0"
      :requests="requests"
      @getAllRequests="getAllRequests"
    ></RequestsTable>
  </div>
</template>

<script>
import * as directusService from "../services/directus.service";
import RequestsTable from "../components/requests/RequestsTable.vue";

export default {
  name: "Requests",
  components: { RequestsTable },
  data() {
    return {
      table_name: "requests",
      requests: [],
      artistName: "",
      releaseTitle: "",
      review: "",
      link: "",
      requestType: "Rotation",
      requestOptions: ["Rotation", "WXYC Library"],
    };
  },

  methods: {
    getAllRequests() {
      directusService.getAllItems(this.table_name).then((response) => {
        this.requests = response.data;
      });
    },
    async requestSubmit() {
      const payload = {
        artist_name: this.artistName,
        release_title: this.releaseTitle,
        request_type: this.requestType,
      };

      await directusService
        .createItem(this.table_name, payload)
        .then((response) => {
          console.log(response);
        });

      this.getAllRequests();
      this.clearForm();
    },

    clearForm() {
      this.artistName = "";
      this.releaseTitle = "";
      this.review = "";
    },
  },
  mounted() {
    this.getAllRequests();
  },
};
</script>

<style scoped>
</style>
