<template>
  <form
    id="requestsForm"
    action=""
    @submit.prevent="requestSubmit"
    method="post"
  >
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
</template>

<script>
import * as directusService from "../../services/directus.service";

export default {
  name: "RequestsForm",
  components: {},
  props: {
    tableName: {
      type: String,
    },
    requestType: {
      type: String,
    },
  },
  data() {
    return {
      artistName: "",
      releaseTitle: "",
      review: "",
      link: "",
    };
  },
  methods: {
    async requestSubmit() {
      const payload = {
        artist_name: this.artistName,
        release_title: this.releaseTitle,
        request_type: this.requestType,
        review: this.review,
      };

      await directusService
        .createItem(this.$props.tableName, payload)
        .then((response) => {
          console.log(response);
        });

      this.$emit("getAllRequests");
      // this.getAllRequests();
      this.clearForm();
    },
    clearForm() {
      this.artistName = "";
      this.releaseTitle = "";
      this.review = "";
    },
  },
  watch: {
    requestType: function () {
      this.clearForm();
    },
  },
};
</script>

<style scoped>
</style>