<template>
  <div id="profilesContainer">
    <ProfileCard
      :user="user"
      v-for="user in profiles"
      :key="user.first_name + user.last_name"
      class="profileCard"
    ></ProfileCard>
  </div>
</template>

<script>
import ProfileCard from "../components/profiles/ProfileCard.vue";

import * as profilesService from "@/services/user.service";

export default {
  name: "Profiles",
  components: { ProfileCard },
  data() {
    return {
      profiles: null,
    };
  },
  mounted() {
    this.getAllProfiles();
  },
  methods: {
    getAllProfiles() {
      profilesService.getAllProfiles().then((response) => {
        this.profiles = response.data;
      });
    },
  },
};
</script>

<style>
#profilesContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
}

.profileCard {
  margin: 2em 2em 1em 2em;
}
</style>
