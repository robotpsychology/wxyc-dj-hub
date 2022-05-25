<template>
  <div>Profiles</div>
  <div id="wrapper" v-for="user in userSample">
    <ProfileCard :user="user"></ProfileCard>
  </div>
</template>

<script>
import ProfileCard from "../components/ProfileCard.vue";

export default {
  name: "Profiles",
  components: { ProfileCard },
  data() {
    return {
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
  methods: {},
};
</script>

<style scoped>
#wrapper {
  display: inline-block;
  margin: 2em;
}

.userAvatar {
  width: 10em;
}

p {
  line-height: 1.5;
  margin: 0;
}
</style>
