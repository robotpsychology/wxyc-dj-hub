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

    <h3>Record Label</h3>
    <InputText type="text" v-model="recordLabel" placeholder="Wave" required />

    <h3>Buzzwords</h3>
    <InputText type="text" v-model="buzzwords" placeholder="Wave" required />

    <div v-if="requestType == 'Rotation'">
      <h3>Artist Description</h3>
      <p>
        Describe the artist: where they're from, what acts and or bands they've
        been in before, facts about them, whatever pertains to this individual.
      </p>
      <Textarea
        type="text"
        v-model="artistDescription"
        :autoResize="true"
        rows="5"
        cols="30"
        placeholder="Please write a short 1-2 sentences about the artist."
        required
      />
    </div>

    <div v-if="requestType == 'Rotation'">
      <h3>Review</h3>
      <p>
        Please write your review here. If you want to write an average length
        review, please write around 3-4 sentences. Please include how music
        sounds, what aspects you enjoy, and anything you would like to know when
        reading a review.
      </p>
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

    <div v-if="requestType == 'Rotation'">
      <h3>Favorite Tracks</h3>
      <p>
        Please identify at least 2 to all tracks that the DJ should play. Please
        use exclamations to express your opinions, with 1 exclamation being
        decent (!), to 5 exclamations being amazing (!!!!!). If all are great,
        type Play All
      </p>
      <Textarea
        type="text"
        v-model="favoriteTracks"
        :autoResize="true"
        rows="5"
        cols="30"
        placeholder="Exclamations encouraged!"
        required
      />
    </div>

    <div v-if="requestType == 'Rotation'">
      <h3>FCC Violations</h3>
      <p>List any FCC violations you hear:</p>
      <Textarea
        type="text"
        v-model="favoriteTracks"
        :autoResize="true"
        rows="5"
        cols="30"
        placeholder="Just the track number"
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