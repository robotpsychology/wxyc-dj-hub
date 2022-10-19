<template>
  <div id="wrapper">
    <div id="profileWrapper">
      <a
        :href="directus_uri + '/admin/users/' + currentUser.id"
        target="_blank"
      >
        <Button>Edit Profile</Button>
      </a>

      <ProfileCard
        id="profileCard"
        :user="currentUser"
        :key="currentUser.first_name + currentUser.last_name"
      ></ProfileCard>

      <!-- this is where shows will go, read only -->
      <!-- <FlowsheetTable
        v-if="playcuts.length > 0"
        :playcuts="playcuts"
        :tableName="flowsheet_entries"
        @getAllPlaycuts="getUserPlaycuts"
      ></FlowsheetTable> -->
    </div>
  </div>
</template>

<script>
import ProfileCard from "../components/profiles/ProfileCard.vue";
import * as profilesService from "../services/user.service";
import FlowsheetTable from "../components/flowsheet/FlowsheetTable.vue";

export default {
  name: "Account",
  components: { ProfileCard, FlowsheetTable },
  data() {
    return {
      currentUser: {},
      playcuts: null,
      directus_uri: process.env.VUE_APP_DIRECTUS_URI,
    };
  },
  beforeMount() {
    profilesService.getCurrentUser().then((res) => (this.currentUser = res));
    profilesService.getUserPlaycuts().then((res) => (this.playcuts = res.data));
  },
  methods: {
    getUserPlaycuts() {
      profilesService.getUserPlaycuts();
    },

    editProfile() {},
  },
};
</script>

<style>
#wrapper {
  display: flex;
}

#profileWrapper {
  align-self: flex-end;
}
</style>