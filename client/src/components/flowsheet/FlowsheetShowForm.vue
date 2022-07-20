<template>
  <form id="" action="" @submit.prevent="showCreate" method="post">
    <label for="realName">Real Name</label>
    <InputText
      name="realName"
      type="text"
      v-model="realName"
      placeholder=""
      required
    />

    <label for="startTime">Starting Time: </label>
    <Calendar
      v-model="startTime"
      :showTime="true"
      hourFormat="12"
      :timeOnly="true"
      required
    />

    <label for="showName">Show Name</label>
    <InputText
      name="showName"
      type="text"
      v-model="showName"
      placeholder=""
      required
    />

    <label for="djHandle">DJ Handle</label>
    <InputText
      name="djHandle"
      type="text"
      v-model="djHandle"
      placeholder=""
      required
    />

    <br />
    <Button type="submit" value="submit" label="Submit"></Button>
  </form>
</template>

<script>
import * as directusService from "../../services/directus.service";

export default {
  name: "FlowsheetShowForm",
  components: {},
  data() {
    return {
      tableName: "flowsheet_session",
      realName: null,
      startTime: null,
      showName: null,
      djHandle: null,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    async showCreate() {
      const payload = {
        start_time: this.startTime,
        real_name: this.realName,
        show_name: this.showName,
        dj_handle: this.djHandle,
      };
      console.log(this.startTime);

      await directusService
        .createItem(this.tableName, payload)
        .then((response) => {
          console.log(response);
        });

      // this.$emit("createShow", payload);

      // this.$emit("getAllRequests");
      // this.getAllRequests();
      // this.clearForm();
    },
  },
};
</script>

<style>
</style>
