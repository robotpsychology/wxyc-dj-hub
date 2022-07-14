<template>
  <div id="wrapper">
    <div id="profileWrapper">
      <ProfileCard
        id="profileCard"
        :user="currentUser"
        :key="currentUser.first_name + currentUser.last_name"
      ></ProfileCard>
    </div>
  </div>
</template>

<script>
import { ProfileCard } from "@/components";
import * as profilesService from "../services/profiles.service";

export default {
  name: "Account",
  components: { ProfileCard },
  data() {
    return {
      currentUser: null,
    };
  },
  created() {
    profilesService.getCurrentUser().then((res) => (this.currentUser = res));
  },
  methods: {},
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