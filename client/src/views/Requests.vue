<template>
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
    <InputText type="text" v-model="releaseTitle" placeholder="Wave" required />

    <div v-if="requestType == 'Rotation'">
      <h3>Review</h3>
      <Textarea
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
</template>

<script>
import { createRequest, getAllRequests } from "../services/requests.service";

export default {
  name: "Requests",
  components: {},
  data() {
    return {
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
    async requestSubmit() {
      const payload = {
        artist_name: this.artistName,
        release_title: this.releaseTitle,
        request_type: this.requestType,
      };

      await createRequest(payload).then((response) => {
        console.log(response);
      });

      await getAllRequests().then((response) => {
        console.log(response);
        this.requests = response;
      });
      this.clearForm();
    },
    clearForm() {
      this.artistName = "";
      this.releaseTitle = "";
      this.review = "";
    },
  },
};
</script>

<style scoped>
</style>
