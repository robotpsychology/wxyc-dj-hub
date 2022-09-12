<template>
  <form id="" action="" @submit.prevent="showCreate" method="post">
    <label for="startTime">Starting Time: </label>
    <Calendar
      v-model="startTime"
      :showTime="true"
      hourFormat="12"
      :timeOnly="true"
      :stepMinute="30"
      placeholder="Click here to select time"
      :showIcon="true"
      required
    />

    <label for="showName">Show Name: </label>
    <InputText
      name="showName"
      type="text"
      v-model="showName"
      placeholder="Optional"
    />

    <br />
    <Button type="submit" value="submit" label="Submit"></Button>
  </form>
</template>

<script>
import * as directusService from "../../services/directus.service";
import * as profileService from "../../services/profiles.service";

export default {
  name: "FlowsheetShowForm",
  components: {},
  data() {
    return {
      // tableName: "flowsheet_session",
      showName: null,

      startTime: null,
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    async showCreate() {
      let currentUser = await profileService.getCurrentUser();

      const payload = {
        start_time: this.startTime,
        show_name: this.showName,
        real_name: `${currentUser.first_name} ${currentUser.last_name}`,
        dj_handle: currentUser.title,
        status: "active",
      };

      this.$emit("createShow", payload);

      // this.$emit("getAllRequests");
      // this.getAllRequests();
      // this.clearForm();
    },
  },
};
</script>

<style>
</style>
