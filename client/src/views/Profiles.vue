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

import * as profilesService from "../services/profiles.service";

export default {
  name: "Profiles",
  components: { ProfileCard },
  data() {
    return {
      profiles: null,
      userSample: [
        {
          name: "John Doe",
          dj_name: "ShimSham",
          show_completed: 5,
          position: "DJ",
          avatar: "logo.png",
        },
        {
          name: "Jane Doe",
          dj_name: "tincan",
          show_completed: 10,
          position: "Station Manager",
          avatar: "cropped-icon-192x192.png",
        },
        {
          name: "Tommy Dang",
          dj_name: "appa",
          show_completed: 2,
          position: "sweeper",
          avatar: "logo.png",
        },
      ],
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
