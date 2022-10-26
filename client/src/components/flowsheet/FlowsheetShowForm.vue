<template>
  <form id="showForm" action="" @submit.prevent="showCreate" method="post">
    <div id="formTop">
      <div>
        <label for="startTime">Starting Time: </label>
        <Calendar
          name="startTime"
          v-model="startTime"
          :showTime="true"
          hourFormat="12"
          :timeOnly="true"
          :stepMinute="30"
          placeholder="Select time slot"
          :showIcon="true"
          required
        />
      </div>

      <div>
        <label for="showName">Show Name: </label>
        <InputText
          name="showName"
          type="text"
          v-model="showName"
          placeholder="Optional"
        />
      </div>
    </div>

    <div>
      <Button type="submit" value="submit" label="Submit"></Button>
    </div>
  </form>
</template>

<script>
import * as directusService from "../../services/directus.service";
import * as profileService from "../../services/user.service";

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
#showForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#formTop {
  display: flex;
  justify-content: space-around;
  width: ;
  margin-bottom: 3em;
}

button {
  width: 50%;
}
</style>
